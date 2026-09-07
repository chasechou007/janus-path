'use strict'

const fs = require('node:fs/promises')
const path = require('node:path')
const { createHash } = require('node:crypto')
const sharp = require('sharp')
const cheerio = require('cheerio')

const OUTPUT_URL = '/assets/optimized/'
const QUALITY = 82

async function htmlFiles (dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await htmlFiles(file))
    else if (entry.name.endsWith('.html')) files.push(file)
  }
  return files.sort()
}

function imageRole ($, img) {
  if (img.hasClass('site-icon')) return { widths: [48, 96], sizes: '36px', eager: true, layoutWidth: 36 }
  if (img.closest('.avatar-img').length) {
    return { widths: [110, 220], sizes: '110px', eager: !img.closest('#sidebar-menus').length }
  }
  if (img.closest('.aside-list, .article-sort-item-img').length) {
    return { widths: [80, 160], sizes: '80px' }
  }
  if (img.closest('#recent-posts .post_cover').length) {
    const first = $('#recent-posts .post_cover img').first()[0] === img[0]
    return {
      widths: [480, 960, 1440],
      sizes: '(min-width: 2000px) 22vw, (min-width: 1200px) 360px, (min-width: 901px) 30vw, (min-width: 769px) 41vw, 100vw',
      eager: first,
      high: first
    }
  }
  return { widths: [480, 960, 1440, 1920], sizes: '(min-width: 2000px) 52vw, (min-width: 1200px) 860px, 100vw' }
}

async function optimizeImages ({ baseDir = process.cwd() } = {}) {
  const publicDir = path.join(baseDir, 'public')
  const sourceDir = path.join(baseDir, 'source/assets/img')
  const cacheDir = path.join(baseDir, '.cache/image-optimization')
  const outputDir = path.join(publicDir, 'assets/optimized')
  await fs.mkdir(cacheDir, { recursive: true })
  await fs.mkdir(outputDir, { recursive: true })
  const sources = new Map()
  const variants = new Map()
  const report = { pages: 0, images: 0, variants: 0, outputBytes: 0 }

  async function sourceImage (src, pageFile) {
    // Only rewrite owned local assets. Do not download remote images or touch
    // author-supplied responsive/animated/vector resources.
    if (!src || /^(?:[a-z]+:|\/\/)/i.test(src)) return null
    let pathname
    try {
      const pagePath = path.relative(publicDir, pageFile).split(path.sep).join('/')
      pathname = decodeURIComponent(new URL(src, `https://local.invalid/${pagePath}`).pathname)
    } catch { return null }
    const match = pathname.match(/^\/(?:en\/)?assets\/img\/(.+\.(?:png|jpe?g|webp))$/i)
    if (!match) return null
    const file = path.resolve(sourceDir, match[1])
    if (!file.startsWith(sourceDir + path.sep)) return null
    if (!sources.has(file)) {
      const bytes = await fs.readFile(file).catch(error => {
        if (error.code === 'ENOENT') return null
        throw error
      })
      if (!bytes) { sources.set(file, null); return null }
      const metadata = await sharp(bytes).metadata()
      if ((metadata.pages || 1) > 1) { sources.set(file, null); return null }
      const rotated = [5, 6, 7, 8].includes(metadata.orientation)
      sources.set(file, {
        bytes,
        width: rotated ? metadata.height : metadata.width,
        height: rotated ? metadata.width : metadata.height,
        hash: createHash('sha256').update(bytes).update(JSON.stringify({ quality: QUALITY, sharp: sharp.versions, version: 1 })).digest('hex').slice(0, 16)
      })
    }
    return sources.get(file)
  }

  async function variant (source, requestedWidth, format = 'webp') {
    const width = Math.min(requestedWidth, source.width)
    const filename = `${source.hash}-${width}.${format}`
    if (!variants.has(filename)) {
      const cached = path.join(cacheDir, filename)
      try { await fs.access(cached) } catch {
        const pipeline = sharp(source.bytes).rotate().resize({ width, withoutEnlargement: true })
        await (format === 'png' ? pipeline.png() : pipeline.webp({ quality: QUALITY, effort: 5 })).toFile(cached)
      }
      await fs.copyFile(cached, path.join(outputDir, filename))
      const { size } = await fs.stat(cached)
      report.outputBytes += size
      variants.set(filename, { url: OUTPUT_URL + filename, width, size })
    }
    return variants.get(filename)
  }

  for (const file of await htmlFiles(publicDir)) {
    const original = await fs.readFile(file, 'utf8')
    const $ = cheerio.load(original)
    let changed = false
    for (const element of $('img').toArray()) {
      const img = $(element)
      if (img.attr('srcset') || img.closest('picture').length || img.attr('data-lazy-src')) continue
      const source = await sourceImage(img.attr('src'), file)
      if (!source) continue
      const role = imageRole($, img)
      const options = []
      for (const width of [...new Set(role.widths.map(w => Math.min(w, source.width)))]) {
        options.push(await variant(source, width))
      }
      const fallback = options.find(v => v.width >= 960) || options[options.length - 1]
      img.attr({
        src: fallback.url,
        srcset: options.map(v => `${v.url} ${v.width}w`).join(', '),
        sizes: role.sizes,
        loading: role.eager ? 'eager' : 'lazy',
        decoding: 'async'
      })
      if (role.high) img.attr('fetchpriority', 'high')
      if (!img.attr('width') && !img.attr('height')) {
        const width = role.layoutWidth || source.width
        img.attr({ width, height: Math.round(width * source.height / source.width) })
      }
      // The theme's error fallback must also clear srcset, or it would keep
      // selecting the failed optimized resource after changing src.
      if (img.attr('onerror')) img.attr('onerror', `this.removeAttribute('srcset');this.removeAttribute('sizes');${img.attr('onerror')}`)
      report.images++
      changed = true
    }

    const header = $('#page-header')
    const style = header.attr('style') || ''
    const background = style.match(/url\((['"]?)(.*?)\1\)/i)
    if (background) {
      const source = await sourceImage(background[2], file)
      if (source) {
        const image = await variant(source, 1920)
        header.attr('style', style.replace(background[0], `url('${image.url}')`))
        $('head').append($('<link>').attr({ rel: 'preload', as: 'image', href: image.url, fetchpriority: 'high' }))
        changed = true
      }
    }

    for (const element of $('link[rel="icon"], link[rel="shortcut icon"]').toArray()) {
      const icon = $(element)
      const source = await sourceImage(icon.attr('href'), file)
      if (!source) continue
      const image = await variant(source, 48, 'png')
      icon.attr({ href: image.url, type: 'image/png' })
      icon.removeAttr('sizes')
      changed = true
    }
    if (changed) { await fs.writeFile(file, $.html()); report.pages++ }
  }
  report.variants = variants.size
  return report
}

module.exports = { optimizeImages }
if (require.main === module) {
  optimizeImages().then(report => console.log('Image optimization:', report)).catch(error => {
    console.error(error)
    process.exitCode = 1
  })
}
