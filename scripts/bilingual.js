'use strict'

const DEFAULT_LOCALE = 'zh-CN'

function normalizeLocale (value, fallback = DEFAULT_LOCALE) {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return fallback

  const locale = String(raw).toLowerCase().replace('_', '-')
  if (locale === 'en' || locale.startsWith('en-')) return 'en'
  if (locale === 'zh-cn' || locale === 'zh-hans' || locale === 'zh') return 'zh-CN'
  return String(raw)
}

function bilingualConfig (ctx) {
  const config = ctx.config.bilingual || {}
  const defaultLocale = normalizeLocale(config.default_locale, DEFAULT_LOCALE)
  const locale = normalizeLocale(config.locale || ctx.config.language, defaultLocale)
  const locales = config.locales || {}

  return { config, defaultLocale, locale, locales }
}

function localeMeta (ctx, locale) {
  const { locales } = bilingualConfig(ctx)
  const fallback = locale === 'en'
    ? { root: '/en/', hreflang: 'en' }
    : { root: '/', hreflang: 'zh-Hans' }
  return Object.assign({}, fallback, locales[locale] || {})
}

function siteOrigin (ctx) {
  return new URL(ctx.config.url).origin
}

function rootRelativeUrl (root, path = '') {
  const normalizedRoot = `/${String(root || '/').replace(/^\/+|\/+$/g, '')}`
  const rootWithSlash = normalizedRoot === '/' ? '/' : `${normalizedRoot}/`
  const normalizedPath = String(path).replace(/^\/+/, '')
  return `${rootWithSlash}${normalizedPath}`
}

function absoluteUrl (ctx, root, path = '') {
  return new URL(rootRelativeUrl(root, path), `${siteOrigin(ctx)}/`).href
}

function postLocale (post, fallback) {
  return normalizeLocale(post.lang || post.language, fallback)
}

function translationKey (post) {
  return String(post.translation_key || post.slug || '').trim()
}

function isPublished (post) {
  return typeof post.notPublished === 'function' ? !post.notPublished() : post.published !== false
}

function buildRegistry (ctx, posts, defaultLocale) {
  const registry = new Map()

  for (const post of posts) {
    if (!isPublished(post)) continue

    const locale = postLocale(post, defaultLocale)
    const key = translationKey(post)
    if (!key) throw new Error(`Bilingual post is missing a slug or translation_key: ${post.source}`)

    const group = registry.get(key) || new Map()
    if (group.has(locale)) {
      const existing = group.get(locale)
      throw new Error(`Duplicate ${locale} variant for translation_key "${key}": ${existing.source}, ${post.source}`)
    }

    const meta = localeMeta(ctx, locale)
    group.set(locale, {
      locale,
      hreflang: meta.hreflang,
      href: absoluteUrl(ctx, meta.root, post.path),
      path: rootRelativeUrl(meta.root, post.path),
      source: post.source,
      title: post.title
    })
    registry.set(key, group)
  }

  return registry
}

function alternatesFor (registry, key) {
  const group = registry.get(key)
  if (!group || group.size < 2) return []

  const alternates = [...group.values()]
    .sort((a, b) => a.locale === 'zh-CN' ? -1 : b.locale === 'zh-CN' ? 1 : a.locale.localeCompare(b.locale))
    .map(item => ({
      locale: item.locale,
      hreflang: item.hreflang,
      href: item.href,
      path: item.path
    }))

  const defaultVariant = group.get('zh-CN') || group.values().next().value
  alternates.push({
    locale: 'x-default',
    hreflang: 'x-default',
    href: defaultVariant.href,
    path: defaultVariant.path
  })

  return alternates
}

async function removeDocuments (model, documents) {
  if (!documents.length) return
  await Promise.all(documents.map(document => model.removeById(document._id)))
}

hexo.extend.filter.register('before_generate', async function () {
  const ctx = this
  const { defaultLocale, locale } = bilingualConfig(ctx)
  const Post = ctx.model('Post')
  const Page = ctx.model('Page')
  const PostCategory = ctx.model('PostCategory')
  const PostTag = ctx.model('PostTag')
  const Category = ctx.model('Category')
  const Tag = ctx.model('Tag')
  const posts = Post.find({}).toArray()
  const registry = buildRegistry(ctx, posts, defaultLocale)

  ctx._bilingualRegistry = registry

  await Promise.all(posts.map(post => post.update({
    lang: postLocale(post, defaultLocale),
    translation_key: translationKey(post),
    bilingual_alternates: alternatesFor(registry, translationKey(post))
  })))

  const removedPosts = posts.filter(post => postLocale(post, defaultLocale) !== locale)
  const removedPostIds = removedPosts.map(post => post._id)

  if (removedPostIds.length) {
    await Promise.all([
      PostCategory.remove({ post_id: { $in: removedPostIds } }),
      PostTag.remove({ post_id: { $in: removedPostIds } })
    ])
    await removeDocuments(Post, removedPosts)
  }

  const removedPages = Page.find({}).toArray().filter(page => postLocale(page, defaultLocale) !== locale)
  await removeDocuments(Page, removedPages)

  const usedCategoryIds = new Set(PostCategory.find({}).map(item => item.category_id))
  const usedTagIds = new Set(PostTag.find({}).map(item => item.tag_id))
  await removeDocuments(Category, Category.find({}).toArray().filter(category => !usedCategoryIds.has(category._id)))
  await removeDocuments(Tag, Tag.find({}).toArray().filter(tag => !usedTagIds.has(tag._id)))

  ctx.log.info(`Bilingual build locale: ${locale} (${Post.find({}).length} posts, ${Page.find({}).length} pages)`)
})

hexo.extend.helper.register('bilingual_alternates', function (page = this.page) {
  if (page && Array.isArray(page.bilingual_alternates) && page.bilingual_alternates.length) {
    return page.bilingual_alternates
  }

  const path = String((page && page.path) || '').replace(/^\/+/, '')
  if (path && path !== 'index.html') return []

  const zh = localeMeta(hexo, 'zh-CN')
  const en = localeMeta(hexo, 'en')
  return [
    { locale: 'zh-CN', hreflang: zh.hreflang, href: absoluteUrl(hexo, zh.root), path: rootRelativeUrl(zh.root) },
    { locale: 'en', hreflang: en.hreflang, href: absoluteUrl(hexo, en.root), path: rootRelativeUrl(en.root) },
    { locale: 'x-default', hreflang: 'x-default', href: absoluteUrl(hexo, zh.root), path: rootRelativeUrl(zh.root) }
  ]
})

hexo.extend.helper.register('bilingual_switch', function (page = this.page) {
  const { defaultLocale, locale: configuredLocale } = bilingualConfig(hexo)
  const currentLocale = postLocale(page || {}, configuredLocale || defaultLocale)
  const targetLocale = currentLocale === 'en' ? 'zh-CN' : 'en'
  const alternates = this.bilingual_alternates(page)
  const exact = alternates.find(item => item.locale === targetLocale)
  const target = localeMeta(hexo, targetLocale)
  const available = Boolean(exact)

  return {
    locale: targetLocale,
    hreflang: target.hreflang,
    href: exact ? exact.path : rootRelativeUrl(target.root),
    label: targetLocale === 'en' ? 'EN' : '简中',
    available,
    title: targetLocale === 'en'
      ? (available ? 'Read this article in English' : 'English translation is not available; open the English homepage')
      : (available ? '阅读这篇文章的简体中文版' : '返回简体中文首页')
  }
})

function escapeHtml (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

hexo.extend.generator.register('bilingual-legacy-redirects', function () {
  const { config, locale } = bilingualConfig(this)
  if (locale !== config.default_locale && locale !== DEFAULT_LOCALE) return []

  return (config.redirects || []).map(redirect => {
    const group = this._bilingualRegistry && this._bilingualRegistry.get(redirect.translation_key)
    const target = group && group.get(normalizeLocale(redirect.locale))
    if (!target) throw new Error(`Bilingual redirect target not found: ${redirect.translation_key}/${redirect.locale}`)

    const href = escapeHtml(target.href)
    const scriptTarget = JSON.stringify(target.href).replace(/</g, '\\u003c')
    return {
      path: redirect.from,
      data: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${href}"><meta http-equiv="refresh" content="0; url=${href}"><title>Moved</title></head><body><p>This page has moved to <a href="${href}">${href}</a>.</p><script>location.replace(${scriptTarget})</script></body></html>`
    }
  })
})
