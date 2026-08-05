'use strict'

const { stripHTML } = require('hexo-util')

function escapeXml (value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function normalizeText (value = '') {
  return stripHTML(String(value))
    .replace(/\s+/g, ' ')
    .trim()
}

function absoluteUrl (baseUrl, path = '') {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return new URL(path, normalizedBase).href
}

hexo.extend.generator.register('atom-feed', function (locals) {
  const config = this.config
  const feedConfig = config.feed || {}
  const feedPath = feedConfig.path || 'atom.xml'
  const limit = Number.isInteger(feedConfig.limit) ? feedConfig.limit : 20
  const siteUrl = absoluteUrl(config.url, config.root || '/')
  const feedUrl = absoluteUrl(siteUrl, feedPath)
  const authorUrl = absoluteUrl(siteUrl, config.author_url || '/')
  const postsQuery = locals.posts.sort('-date')
  const posts = (limit > 0 ? postsQuery.limit(limit) : postsQuery).toArray()
  const latestUpdated = posts.length
    ? (posts[0].updated || posts[0].date).toISOString()
    : new Date().toISOString()

  const entries = posts.map(post => {
    const postUrl = absoluteUrl(siteUrl, post.path)
    const summarySource = post.description || post.excerpt || post.content || ''
    const summary = normalizeText(summarySource).slice(0, 500)

    return [
      '  <entry>',
      `    <title>${escapeXml(post.title)}</title>`,
      `    <link href="${escapeXml(postUrl)}"/>`,
      `    <id>${escapeXml(postUrl)}</id>`,
      `    <published>${post.date.toISOString()}</published>`,
      `    <updated>${(post.updated || post.date).toISOString()}</updated>`,
      `    <summary type="text">${escapeXml(summary)}</summary>`,
      '  </entry>'
    ].join('\n')
  }).join('\n')

  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(config.title)}</title>`,
    `  <subtitle>${escapeXml(normalizeText(config.description || config.subtitle || ''))}</subtitle>`,
    `  <id>${escapeXml(siteUrl)}</id>`,
    `  <link href="${escapeXml(siteUrl)}"/>`,
    `  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml"/>`,
    `  <updated>${latestUpdated}</updated>`,
    '  <author>',
    `    <name>${escapeXml(config.author)}</name>`,
    `    <uri>${escapeXml(authorUrl)}</uri>`,
    '  </author>',
    entries,
    '</feed>',
    ''
  ].join('\n')

  return {
    path: feedPath,
    data: xml
  }
})
