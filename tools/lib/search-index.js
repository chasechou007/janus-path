'use strict'

const plainText = require('./plain-text')

module.exports = function searchIndex (posts, locale, root) {
  return {
    locale,
    posts: posts
      .filter(post => (post.lang || 'zh-CN') === locale && !post.encrypt && !post.password &&
        post.published !== false && !(typeof post.notPublished === 'function' && post.notPublished()))
      .map(post => ({
        title: plainText(post.title),
        url: new URL(`${root}${post.path}`, 'https://search.invalid').pathname,
        description: plainText(post.description),
        content: plainText(post.content)
      }))
  }
}
