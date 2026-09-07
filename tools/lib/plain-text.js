'use strict'

const { load } = require('cheerio')

module.exports = function plainText (value) {
  const $ = load(String(value || ''))
  $('script, style, pre, code, figure.highlight, table, iframe, noscript').remove()
  $('p, div, li, h1, h2, h3, h4, h5, h6, br, blockquote').append(' ')
  return $.root().text().replace(/\s+/g, ' ').trim()
}
