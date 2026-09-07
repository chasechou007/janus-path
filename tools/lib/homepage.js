'use strict'

const plainText = require('./plain-text')

function homepageSummary (article, locale) {
  if (article.encrypt) return ''
  const description = plainText(article.description)
  if (description) return description
  const prose = plainText(article.content)
  const limit = locale === 'en' ? 260 : 160
  const characters = Array.from(prose)
  if (characters.length <= limit) return prose
  let excerpt = characters.slice(0, limit).join('')
  if (locale === 'en' && /\s/.test(excerpt)) excerpt = excerpt.replace(/\s+\S*$/, '')
  return `${excerpt.trimEnd()}…`
}

function homepageDiscovery (data, locale, posts, categories) {
  const copy = data[locale]
  if (!copy) throw new Error(`Missing homepage copy for ${locale}`)
  return {
    ...copy,
    starting_points: data.starting_points.map(item => {
      const article = posts.find(post => post.translation_key === item.key && (post.lang || post.language || 'zh-CN') === locale)
      if (!article) throw new Error(`Missing ${locale} homepage article: ${item.key}`)
      return { label: item.label[locale], title: article.title, path: article.path }
    }),
    topics: copy.topics.map(item => {
      const category = categories.find(category => category.name === item.category)
      if (!category) throw new Error(`Missing ${locale} homepage category: ${item.category}`)
      return { ...item, path: category.path }
    })
  }
}

module.exports = { homepageSummary, homepageDiscovery }
