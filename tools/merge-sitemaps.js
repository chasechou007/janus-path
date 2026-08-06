'use strict'

const fs = require('fs')
const path = require('path')

function walkHtml (directory, files = []) {
  if (!fs.existsSync(directory)) return files

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) walkHtml(fullPath, files)
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath)
  }

  return files
}

function htmlAttribute (tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))
  return match ? match[1] : ''
}

function htmlSeo (publicDir) {
  const result = new Map()

  for (const file of walkHtml(publicDir)) {
    const html = fs.readFileSync(file, 'utf8')
    const canonicalTag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)
    if (!canonicalTag) continue

    const canonical = htmlAttribute(canonicalTag[0], 'href')
    if (!canonical) continue

    const robotsTag = html.match(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i)
    const robots = robotsTag ? htmlAttribute(robotsTag[0], 'content') : ''
    const indexable = !/(?:^|,)\s*noindex\s*(?:,|$)/i.test(robots)

    const alternates = []
    const tags = html.match(/<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["'])[^>]*>/gi) || []
    for (const tag of tags) {
      const hreflang = htmlAttribute(tag, 'hreflang')
      const href = htmlAttribute(tag, 'href')
      if (hreflang && href) alternates.push({ hreflang, href })
    }

    const existing = result.get(canonical) || { alternates: [], indexable: false }
    if (alternates.length) existing.alternates = alternates
    existing.indexable = existing.indexable || indexable
    result.set(canonical, existing)
  }

  return result
}

function decodeXml (value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function escapeXml (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sitemapEntries (sitemapPath) {
  if (!fs.existsSync(sitemapPath)) return []
  const xml = fs.readFileSync(sitemapPath, 'utf8')
  return xml.match(/<url>\s*[\s\S]*?<\/url>/g) || []
}

function entryLocation (entry) {
  const match = entry.match(/<loc>([\s\S]*?)<\/loc>/)
  return match ? decodeXml(match[1].trim()) : ''
}

function withAlternates (entry, alternates) {
  const withoutExisting = entry.replace(/\s*<xhtml:link\b[^>]*\/>/g, '')
  if (!alternates || !alternates.length) return withoutExisting

  const links = alternates
    .map(item => `    <xhtml:link rel="alternate" hreflang="${escapeXml(item.hreflang)}" href="${escapeXml(item.href)}"/>`)
    .join('\n')

  return withoutExisting.replace(/(<loc>[\s\S]*?<\/loc>)/, `$1\n${links}`)
}

function mergeSitemaps () {
  const publicDir = path.resolve(process.cwd(), 'public')
  const sitemapPaths = [
    path.join(publicDir, 'sitemap.xml'),
    path.join(publicDir, 'en', 'sitemap.xml')
  ]
  const seo = htmlSeo(publicDir)
  const entries = new Map()

  for (const sitemapPath of sitemapPaths) {
    for (const entry of sitemapEntries(sitemapPath)) {
      const location = entryLocation(entry)
      const rendered = seo.get(location)
      if (location && (!rendered || rendered.indexable) && !entries.has(location)) entries.set(location, entry)
    }
  }

  const renderedEntries = [...entries.entries()]
    .map(([location, entry]) => withAlternates(entry, (seo.get(location) || {}).alternates))
    .join('\n\n  ')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    renderedEntries ? `  ${renderedEntries}` : '',
    '</urlset>',
    ''
  ].join('\n')

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
  process.stdout.write(`Merged ${entries.size} localized URLs into public/sitemap.xml.\n`)
}

module.exports = mergeSitemaps

if (require.main === module) mergeSitemaps()
