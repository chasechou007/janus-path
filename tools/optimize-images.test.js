'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const path = require('node:path')
const os = require('node:os')
const sharp = require('sharp')
const cheerio = require('cheerio')
const { optimizeImages } = require('./optimize-images')

test('build optimizes owned assets, preserves content, and prioritizes initial images in both locales', async t => {
  const baseDir = await fs.mkdtemp(path.join(os.tmpdir(), 'janus-images-'))
  t.after(() => fs.rm(baseDir, { recursive: true, force: true }))
  await fs.mkdir(path.join(baseDir, 'source/assets/img'), { recursive: true })
  await fs.mkdir(path.join(baseDir, 'public/en'), { recursive: true })
  const sourceFile = path.join(baseDir, 'source/assets/img/封面.png')
  await sharp({ create: { width: 1200, height: 600, channels: 3, background: '#234f4a' } }).png().toFile(sourceFile)
  const before = await fs.readFile(sourceFile)
  const asset = '/assets/img/%E5%B0%81%E9%9D%A2.png'
  const html = `<!DOCTYPE html><html><head><link rel="canonical" href="https://blog.janus-path.com/"><link rel="alternate" hreflang="en" href="https://blog.janus-path.com/en/"><link rel="icon" href="${asset}"><script>const sample = "<img src='ignored.png'>";</script></head><body>
  <header id="page-header" style="background-image: url('${asset}')"><img class="site-icon" src="${asset}" alt="Logo"></header>
  <div id="recent-posts"><div class="post_cover"><img src="${asset}" alt="第一篇" onerror="this.src='/img/error.png'"></div><div class="post_cover"><img src="${asset}" alt="第二篇"></div></div>
  <div id="article-container"><h2>正文 &amp; 保留</h2><a href="${asset}"><img src="${asset}" width="300" height="150"></a><p>English and 中文.</p></div>
  <img src="https://external.invalid/a.png"><img src="/assets/img/vector.svg"><img src="${asset}" srcset="original.png 2x"><picture><source srcset="art.avif"><img src="${asset}"></picture>
  <img src="/assets/img/missing.png"></body></html>`
  for (const file of ['index.html', 'en/index.html']) await fs.writeFile(path.join(baseDir, 'public', file), html)
  const report = await optimizeImages({ baseDir })
  assert.equal(report.pages, 2)
  assert.deepEqual(await fs.readFile(sourceFile), before)
  let firstSrc
  for (const file of ['index.html', 'en/index.html']) {
    const $ = cheerio.load(await fs.readFile(path.join(baseDir, 'public', file), 'utf8'))
    assert.equal($('#article-container').text(), cheerio.load(html)('#article-container').text())
    assert.equal($('link[rel=canonical]').attr('href'), 'https://blog.janus-path.com/')
    assert.equal($('link[hreflang=en]').attr('href'), 'https://blog.janus-path.com/en/')
    assert.equal($('script').html(), cheerio.load(html)('script').html())
    const covers = $('#recent-posts img')
    assert.equal(covers.first().attr('loading'), 'eager')
    assert.equal(covers.first().attr('fetchpriority'), 'high')
    assert.equal(covers.last().attr('loading'), 'lazy')
    assert.match(covers.first().attr('onerror'), /removeAttribute\('srcset'\)/)
    assert.equal($('.site-icon').attr('width'), '36')
    assert.equal($('#article-container img').attr('width'), '300')
    assert.equal($('#article-container a').attr('href'), asset)
    assert.equal($('picture img').attr('src'), asset)
    assert.equal($('img[src="https://external.invalid/a.png"]').length, 1)
    assert.equal($('img[src="/assets/img/vector.svg"]').length, 1)
    assert.equal($('img[srcset="original.png 2x"]').length, 1)
    assert.equal($('img[src="/assets/img/missing.png"]').length, 1)
    assert.equal($('link[rel=preload][as=image]').length, 1)
    for (const el of $('img[src^="/assets/optimized/"]').toArray()) {
      const img = $(el)
      const metadata = await sharp(path.join(baseDir, 'public', img.attr('src'))).metadata()
      assert.equal(metadata.format, 'webp')
      for (const candidate of img.attr('srcset').split(', ')) {
        const [url, width] = candidate.split(' ')
        const meta = await sharp(path.join(baseDir, 'public', url)).metadata()
        assert.equal(meta.width, parseInt(width))
        assert.ok(meta.width <= 1200)
      }
    }
    const icon = await sharp(path.join(baseDir, 'public', $('link[rel=icon]').attr('href'))).metadata()
    assert.equal(icon.format, 'png')
    assert.equal(icon.width, 48)
    firstSrc ||= covers.first().attr('src')
    assert.equal(covers.first().attr('src'), firstSrc)
  }
  const built = await fs.readFile(path.join(baseDir, 'public/index.html'), 'utf8')
  await optimizeImages({ baseDir })
  assert.equal(await fs.readFile(path.join(baseDir, 'public/index.html'), 'utf8'), built)

  // A clean rebuild reuses valid cached bytes; changing the source invalidates URLs.
  await fs.writeFile(path.join(baseDir, 'public/index.html'), html)
  await optimizeImages({ baseDir })
  let $ = cheerio.load(await fs.readFile(path.join(baseDir, 'public/index.html'), 'utf8'))
  assert.equal($('#recent-posts img').first().attr('src'), firstSrc)
  await sharp({ create: { width: 1200, height: 600, channels: 3, background: '#8a682f' } }).png().toFile(sourceFile)
  await fs.writeFile(path.join(baseDir, 'public/index.html'), html)
  await optimizeImages({ baseDir })
  $ = cheerio.load(await fs.readFile(path.join(baseDir, 'public/index.html'), 'utf8'))
  assert.notEqual($('#recent-posts img').first().attr('src'), firstSrc)
})
