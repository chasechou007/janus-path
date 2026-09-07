'use strict'

const { homepageSummary, homepageDiscovery } = require('../tools/lib/homepage')

hexo.extend.helper.register('homepage_summary', function (article) {
  return homepageSummary(article, this.config.bilingual.locale)
})

hexo.extend.helper.register('homepage_discovery', function () {
  return homepageDiscovery(this.site.data.homepage, this.config.bilingual.locale,
    this.site.posts.data, this.site.categories.data)
})
