'use strict'

const searchIndex = require('../tools/lib/search-index')

hexo.extend.generator.register('local-search', function (locals) {
  const locale = this.config.bilingual.locale
  return {
    path: this.config.search.path,
    data: JSON.stringify(searchIndex(locals.posts.sort('date', -1).toArray(), locale, this.config.root))
  }
})
