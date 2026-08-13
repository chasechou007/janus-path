'use strict'

const fs = require('fs')
const path = require('path')
const frontMatter = require('hexo-front-matter')

const publicDir = path.resolve(process.cwd(), 'public')
const postsDir = path.resolve(process.cwd(), 'source/_posts')
const zhPostPath = path.join(publicDir, '2026/05/20/Codex团队使用SOP/index.html')
const enPostPath = path.join(publicDir, 'en/2026/05/23/codex-team-usage-sop/index.html')
const legacyPath = path.join(publicDir, '2026/05/23/codex-team-usage-sop-en/index.html')
const keptNearZhPostPath = path.join(publicDir, '2026/08/01/Agent 时代，我们需要重新思考密码管理/index.html')
const keptNearEnPostPath = path.join(publicDir, 'en/2026/08/01/rethinking-password-management-in-the-agent-era/index.html')
const strongerAgentZhPostPath = path.join(publicDir, '2026/08/05/Agent 越强，我们越需要软件工程/index.html')
const strongerAgentEnPostPath = path.join(publicDir, 'en/2026/08/05/stronger-agents-need-better-software-engineering/index.html')
const taxonomyRedirects = [
  ['tags/Janus-Path/index.html', 'https://blog.janus-path.com/tags/JanusPath/'],
  ['categories/JanusPath-Prototype/index.html', 'https://blog.janus-path.com/categories/Janus-path-prototype/'],
  ['categories/JanusPath-Applied/index.html', 'https://blog.janus-path.com/categories/janus-path-applied/'],
  ['categories/meta-engineering/index.html', 'https://blog.janus-path.com/categories/MetaEngineering/']
]

const zhPostUrl = new URL('/2026/05/20/Codex团队使用SOP/', 'https://blog.janus-path.com').href
const enPostUrl = 'https://blog.janus-path.com/en/2026/05/23/codex-team-usage-sop/'
const keptNearZhPostUrl = new URL('/2026/08/01/Agent 时代，我们需要重新思考密码管理/', 'https://blog.janus-path.com').href
const keptNearEnPostUrl = 'https://blog.janus-path.com/en/2026/08/01/rethinking-password-management-in-the-agent-era/'
const strongerAgentZhPostUrl = new URL('/2026/08/05/Agent 越强，我们越需要软件工程/', 'https://blog.janus-path.com').href
const strongerAgentEnPostUrl = 'https://blog.janus-path.com/en/2026/08/05/stronger-agents-need-better-software-engineering/'
const zhPostRoute = decodeURI(new URL(zhPostUrl).pathname)
const enPostRoute = new URL(enPostUrl).pathname
const requiredTranslationKeys = new Set([
  'agents-need-context-boundaries-not-org-charts',
  'ai-agent-semantic-drift',
  'codex-team-usage-sop',
  'from-code-to-agent-governance',
  'if-no-one-codes-ai-worsens',
  'janus-path-overview-escape-cognitive-traps',
  'januspath-from-structural-reflection-to-origin-observation',
  'rethinking-password-management-in-the-agent-era',
  'software-engineering-hidden-thinking-models',
  'software-development-organizations-in-the-ai-era',
  'stronger-agents-need-better-software-engineering',
  'structural-noise',
  'structuralism-view-of-ioc',
  'team-atmosphere-noise-management',
  'two-rarest-skills-in-ai-era-not-tech-or-business',
  'welcome-to-janus-path-structure-and-consciousness',
  'when-ai-thinks-along-your-thoughts',
  'why-i-started-simplifying-ai-agents',
  'why-philosophy-always-belongs-to-elites',
  'why-quality-criticism-should-charge'
])

function read (file) {
  if (!fs.existsSync(file)) throw new Error(`Missing generated file: ${path.relative(process.cwd(), file)}`)
  return fs.readFileSync(file, 'utf8')
}

function expectIncludes (text, expected, message) {
  if (!text.includes(expected)) throw new Error(`${message}\nExpected: ${expected}`)
}

function expectExcludes (text, unexpected, message) {
  if (text.includes(unexpected)) throw new Error(`${message}\nUnexpected: ${unexpected}`)
}

function expectCountAtLeast (text, needle, count, message) {
  const actual = text.split(needle).length - 1
  if (actual < count) throw new Error(`${message}\nExpected at least ${count}, found ${actual}: ${needle}`)
}

function sitemapEntry (sitemap, url) {
  const entries = sitemap.match(/<url>\s*[\s\S]*?<\/url>/g) || []
  return entries.find(entry => entry.includes(`<loc>${url}</loc>`)) || ''
}

function sourcePosts () {
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const source = path.join(postsDir, file)
      const raw = fs.readFileSync(source, 'utf8')
      const data = frontMatter.parse(raw)
      const locale = String(data.lang || 'zh-CN').toLowerCase() === 'en' ? 'en' : 'zh-CN'
      const slug = path.basename(file, '.md')
      const translationKey = String(data.translation_key || data.slug || slug).trim()
      const date = raw.match(/^date:\s*(\d{4})-(\d{2})-(\d{2})/m)

      if (!translationKey) throw new Error(`Missing translation_key: ${path.relative(process.cwd(), source)}`)
      if (!date) throw new Error(`Missing YYYY-MM-DD date: ${path.relative(process.cwd(), source)}`)

      const routeParts = [date[1], date[2], date[3], slug]
      if (locale === 'en') routeParts.unshift('en')
      const route = `/${routeParts.join('/')}/`

      return {
        locale,
        translationKey,
        route,
        url: new URL(route, 'https://blog.janus-path.com').href,
        generatedPath: path.join(publicDir, ...routeParts, 'index.html'),
        source
      }
    })
}

function translatedPairs () {
  const groups = new Map()

  for (const post of sourcePosts()) {
    const group = groups.get(post.translationKey) || new Map()
    if (group.has(post.locale)) {
      throw new Error(`Duplicate ${post.locale} source for translation_key "${post.translationKey}"`)
    }
    group.set(post.locale, post)
    groups.set(post.translationKey, group)
  }

  for (const translationKey of requiredTranslationKeys) {
    const group = groups.get(translationKey)
    if (!group || !group.has('zh-CN') || !group.has('en') || group.size !== 2) {
      throw new Error(`Required translation pair is incomplete: ${translationKey}`)
    }
  }

  for (const [translationKey, group] of groups) {
    if (group.has('en') && !group.has('zh-CN')) {
      throw new Error(`English source has no Chinese original: ${translationKey}`)
    }
  }

  return [...groups.entries()].filter(([, group]) => group.has('zh-CN') && group.has('en')).map(([translationKey, group]) => {
    const zh = group.get('zh-CN')
    const en = group.get('en')
    return { translationKey, zh, en }
  })
}

function verifyBilingualBuild () {
  const pairs = translatedPairs()
  const contextBoundariesPair = pairs.find(pair => pair.translationKey === 'agents-need-context-boundaries-not-org-charts')
  if (!contextBoundariesPair) throw new Error('Agent context boundaries article pair is missing')

  const contextBoundariesZhPost = read(contextBoundariesPair.zh.generatedPath)
  const contextBoundariesEnPost = read(contextBoundariesPair.en.generatedPath)
  const onePersonOrganizationPair = pairs.find(pair => pair.translationKey === 'software-development-organizations-in-the-ai-era')
  if (!onePersonOrganizationPair) throw new Error('One-person organization article pair is missing')

  const onePersonOrganizationZhPost = read(onePersonOrganizationPair.zh.generatedPath)
  const onePersonOrganizationEnPost = read(onePersonOrganizationPair.en.generatedPath)
  const zhPost = read(zhPostPath)
  const enPost = read(enPostPath)
  const keptNearZhPost = read(keptNearZhPostPath)
  const keptNearEnPost = read(keptNearEnPostPath)
  const strongerAgentZhPost = read(strongerAgentZhPostPath)
  const strongerAgentEnPost = read(strongerAgentEnPostPath)
  const legacy = read(legacyPath)
  const zhHome = read(path.join(publicDir, 'index.html'))
  const enHome = read(path.join(publicDir, 'en/index.html'))
  const zhFeed = read(path.join(publicDir, 'atom.xml'))
  const enFeed = read(path.join(publicDir, 'en/atom.xml'))
  const sitemap = read(path.join(publicDir, 'sitemap.xml'))

  for (const pair of pairs) {
    const zhHtml = read(pair.zh.generatedPath)
    const enHtml = read(pair.en.generatedPath)

    expectIncludes(zhHtml, '<html lang="zh-CN"', `Chinese variant must declare zh-CN: ${pair.translationKey}`)
    expectIncludes(enHtml, '<html lang="en"', `English variant must declare en: ${pair.translationKey}`)
    expectIncludes(zhHtml, `rel="canonical" href="${pair.zh.url}"`, `Chinese canonical must be self-referential: ${pair.translationKey}`)
    expectIncludes(enHtml, `rel="canonical" href="${pair.en.url}"`, `English canonical must be self-referential: ${pair.translationKey}`)

    for (const html of [zhHtml, enHtml]) {
      expectIncludes(html, `hreflang="zh-Hans" href="${pair.zh.url}"`, `Pair must reference its Chinese variant: ${pair.translationKey}`)
      expectIncludes(html, `hreflang="en" href="${pair.en.url}"`, `Pair must reference its English variant: ${pair.translationKey}`)
      expectIncludes(html, `hreflang="x-default" href="${pair.zh.url}"`, `Pair must use Chinese as x-default: ${pair.translationKey}`)
      expectCountAtLeast(html, 'data-translation-available="true"', 2, `Desktop and mobile switches must resolve the pair: ${pair.translationKey}`)
      expectExcludes(html, 'data-translation-available="false"', `A complete pair must not use a homepage fallback: ${pair.translationKey}`)
    }

    expectIncludes(zhHtml, `class="site-page bilingual-switch" href="${pair.en.route}" hreflang="en"`, `Chinese switch must use the English root-relative route: ${pair.translationKey}`)
    expectIncludes(enHtml, `class="site-page bilingual-switch" href="${pair.zh.route}" hreflang="zh-Hans"`, `English switch must use the Chinese root-relative route: ${pair.translationKey}`)
  }

  expectIncludes(contextBoundariesZhPost, '/assets/img/agent-context-boundaries.png', 'Chinese context boundaries article must render its cover')
  expectIncludes(contextBoundariesEnPost, '/assets/img/agent-context-boundaries.png', 'English context boundaries article must render its cover')
  expectIncludes(contextBoundariesZhPost, 'MetaEngineering', 'Chinese context boundaries article must use the MetaEngineering category')
  expectIncludes(contextBoundariesEnPost, 'Meta Engineering', 'English context boundaries article must use the localized Meta Engineering category')
  for (const tag of ['AI Agent', '上下文治理', '多 Agent 协同', '软件工程']) {
    expectIncludes(contextBoundariesZhPost, tag, `Chinese context boundaries article must render the ${tag} tag`)
  }
  for (const tag of ['AI Agent', 'Context Governance', 'Multi-Agent Collaboration', 'Software Engineering']) {
    expectIncludes(contextBoundariesEnPost, tag, `English context boundaries article must render the ${tag} tag`)
  }

  expectIncludes(onePersonOrganizationZhPost, '/assets/img/one-person-ai-organization.png', 'Chinese one-person organization article must render its cover')
  expectIncludes(onePersonOrganizationEnPost, '/assets/img/one-person-ai-organization.png', 'English one-person organization article must render its cover')
  expectIncludes(onePersonOrganizationZhPost, 'MetaEngineering', 'Chinese one-person organization article must use the MetaEngineering category')
  expectIncludes(onePersonOrganizationEnPost, 'Meta Engineering', 'English one-person organization article must use the localized Meta Engineering category')
  for (const tag of ['AI Agent', '软件工程', '组织设计', '人机协作']) {
    expectIncludes(onePersonOrganizationZhPost, tag, `Chinese one-person organization article must render the ${tag} tag`)
  }
  for (const tag of ['AI Agent', 'Software Engineering', 'Organization Design', 'Human-AI Collaboration']) {
    expectIncludes(onePersonOrganizationEnPost, tag, `English one-person organization article must render the ${tag} tag`)
  }

  expectIncludes(zhPost, '<html lang="zh-CN"', 'Chinese article must declare zh-CN')
  expectIncludes(enPost, '<html lang="en"', 'English article must declare en')
  expectIncludes(zhPost, `rel="canonical" href="${zhPostUrl}"`, 'Chinese article canonical must be self-referential')
  expectIncludes(enPost, `rel="canonical" href="${enPostUrl}"`, 'English article canonical must be self-referential')

  for (const html of [zhPost, enPost]) {
    expectIncludes(html, `hreflang="zh-Hans" href="${zhPostUrl}"`, 'Paired article must reference the Chinese variant')
    expectIncludes(html, `hreflang="en" href="${enPostUrl}"`, 'Paired article must reference the English variant')
    expectIncludes(html, `hreflang="x-default" href="${zhPostUrl}"`, 'Paired article must use the Chinese variant as x-default')
    expectCountAtLeast(html, 'data-translation-available="true"', 2, 'Desktop and mobile language switches must resolve the paired article')
    expectExcludes(html, 'data-translation-available="false"', 'Paired article must not render a fallback-only language switch')
  }

  expectIncludes(zhPost, `class="site-page bilingual-switch" href="${enPostRoute}" hreflang="en"`, 'Chinese language switch must use the root-relative English article route')
  expectIncludes(enPost, `class="site-page bilingual-switch" href="${zhPostRoute}" hreflang="zh-Hans"`, 'English language switch must use the root-relative Chinese article route')
  expectExcludes(zhPost, `class="site-page bilingual-switch" href="${enPostUrl}"`, 'Chinese language switch must not hard-code the production origin')
  expectExcludes(enPost, `class="site-page bilingual-switch" href="${zhPostUrl}"`, 'English language switch must not hard-code the production origin')
  expectIncludes(enPost, '"inLanguage": "en"', 'English JSON-LD must declare English')
  expectIncludes(zhPost, '"inLanguage": "zh-CN"', 'Chinese JSON-LD must declare Simplified Chinese')
  expectIncludes(enPost, '<meta property="og:locale" content="en_US">', 'English Open Graph locale must be en_US')

  expectExcludes(zhHome, 'A Team SOP for Using Codex, OpenSpec, and Superpowers', 'Chinese homepage must not list the English variant')
  expectIncludes(enHome, 'A Team SOP for Using Codex, OpenSpec, and Superpowers', 'English homepage must list the English variant')
  expectExcludes(enHome, 'Codex 团队使用 SOP', 'English homepage must not list the Chinese variant')
  expectIncludes(zhHome, 'rel="canonical" href="https://blog.janus-path.com/"', 'Chinese homepage canonical must remain at the domain root')
  expectIncludes(enHome, 'rel="canonical" href="https://blog.janus-path.com/en/"', 'English homepage canonical must use /en/')
  for (const home of [zhHome, enHome]) {
    expectIncludes(home, 'hreflang="zh-Hans" href="https://blog.janus-path.com/"', 'Localized homepages must reference the Chinese root')
    expectIncludes(home, 'hreflang="en" href="https://blog.janus-path.com/en/"', 'Localized homepages must reference the English root')
  }
  expectIncludes(zhHome, 'class="site-page bilingual-switch" href="/en/" hreflang="en"', 'Chinese homepage switch must use the root-relative English root')
  expectIncludes(enHome, 'class="site-page bilingual-switch" href="/" hreflang="zh-Hans"', 'English homepage switch must use the root-relative Chinese root')
  expectExcludes(enHome, '<span> 首页</span>', 'English navigation must not retain the Chinese menu')
  expectExcludes(enHome, '研究与论文', 'English navigation must not retain untranslated research links')
  expectIncludes(enPost, 'Team Collaboration', 'English taxonomy labels must be localized')

  expectIncludes(keptNearZhPost, '<html lang="zh-CN"', 'Chinese KeptNear article must declare zh-CN')
  expectIncludes(keptNearEnPost, '<html lang="en"', 'English KeptNear article must declare en')
  expectIncludes(keptNearZhPost, `rel="canonical" href="${keptNearZhPostUrl}"`, 'Chinese KeptNear canonical must be self-referential')
  expectIncludes(keptNearEnPost, `rel="canonical" href="${keptNearEnPostUrl}"`, 'English KeptNear canonical must be self-referential')
  for (const html of [keptNearZhPost, keptNearEnPost]) {
    expectIncludes(html, `hreflang="zh-Hans" href="${keptNearZhPostUrl}"`, 'KeptNear pair must reference the Chinese variant')
    expectIncludes(html, `hreflang="en" href="${keptNearEnPostUrl}"`, 'KeptNear pair must reference the English variant')
    expectIncludes(html, `hreflang="x-default" href="${keptNearZhPostUrl}"`, 'KeptNear pair must use Chinese as x-default')
    expectCountAtLeast(html, 'data-translation-available="true"', 2, 'KeptNear pair must render desktop and mobile article switches')
    expectExcludes(html, 'data-translation-available="false"', 'KeptNear pair must not render homepage fallbacks')
  }
  expectIncludes(keptNearZhPost, 'class="site-page bilingual-switch" href="/en/2026/08/01/rethinking-password-management-in-the-agent-era/" hreflang="en"', 'Chinese KeptNear switch must resolve the English article')
  expectIncludes(keptNearEnPost, 'class="site-page bilingual-switch" href="/2026/08/01/Agent 时代，我们需要重新思考密码管理/" hreflang="zh-Hans"', 'English KeptNear switch must resolve the Chinese article')
  expectIncludes(keptNearZhPost, '"inLanguage": "zh-CN"', 'Chinese KeptNear JSON-LD must declare Simplified Chinese')
  expectIncludes(keptNearEnPost, '"inLanguage": "en"', 'English KeptNear JSON-LD must declare English')
  expectIncludes(keptNearEnPost, '<meta property="og:locale" content="en_US">', 'English KeptNear Open Graph locale must be en_US')
  expectIncludes(keptNearZhPost, 'MetaEngineering', 'Chinese KeptNear article must use the MetaEngineering category')
  expectIncludes(keptNearEnPost, 'Meta Engineering', 'English KeptNear article must use the localized Meta Engineering category')
  for (const tag of ['AI Agent', '软件工程', '架构设计']) {
    expectIncludes(keptNearZhPost, tag, `Chinese KeptNear article must render the ${tag} tag`)
  }
  for (const tag of ['AI Agent', 'Software Engineering', 'Architecture']) {
    expectIncludes(keptNearEnPost, tag, `English KeptNear article must render the ${tag} tag`)
  }

  expectIncludes(strongerAgentZhPost, '<html lang="zh-CN"', 'Chinese stronger-agent article must declare zh-CN')
  expectIncludes(strongerAgentEnPost, '<html lang="en"', 'English stronger-agent article must declare en')
  expectIncludes(strongerAgentZhPost, `rel="canonical" href="${strongerAgentZhPostUrl}"`, 'Chinese stronger-agent canonical must be self-referential')
  expectIncludes(strongerAgentEnPost, `rel="canonical" href="${strongerAgentEnPostUrl}"`, 'English stronger-agent canonical must be self-referential')
  for (const html of [strongerAgentZhPost, strongerAgentEnPost]) {
    expectIncludes(html, `hreflang="zh-Hans" href="${strongerAgentZhPostUrl}"`, 'Stronger-agent pair must reference the Chinese variant')
    expectIncludes(html, `hreflang="en" href="${strongerAgentEnPostUrl}"`, 'Stronger-agent pair must reference the English variant')
    expectIncludes(html, `hreflang="x-default" href="${strongerAgentZhPostUrl}"`, 'Stronger-agent pair must use Chinese as x-default')
    expectCountAtLeast(html, 'data-translation-available="true"', 2, 'Stronger-agent pair must render desktop and mobile article switches')
    expectExcludes(html, 'data-translation-available="false"', 'Stronger-agent pair must not render homepage fallbacks')
  }
  expectIncludes(strongerAgentZhPost, 'class="site-page bilingual-switch" href="/en/2026/08/05/stronger-agents-need-better-software-engineering/" hreflang="en"', 'Chinese stronger-agent switch must resolve the English article')
  expectIncludes(strongerAgentEnPost, 'class="site-page bilingual-switch" href="/2026/08/05/Agent 越强，我们越需要软件工程/" hreflang="zh-Hans"', 'English stronger-agent switch must resolve the Chinese article')
  expectIncludes(strongerAgentZhPost, '"inLanguage": "zh-CN"', 'Stronger-agent JSON-LD must declare Simplified Chinese')
  expectIncludes(strongerAgentEnPost, '"inLanguage": "en"', 'English stronger-agent JSON-LD must declare English')
  expectIncludes(strongerAgentEnPost, '<meta property="og:locale" content="en_US">', 'English stronger-agent Open Graph locale must be en_US')
  expectIncludes(strongerAgentZhPost, '/assets/img/stronger-agents-need-software-engineering.png', 'Stronger-agent article must render its cover')
  expectIncludes(strongerAgentEnPost, '/assets/img/stronger-agents-need-software-engineering.png', 'English stronger-agent article must render its cover')
  expectIncludes(strongerAgentZhPost, 'MetaEngineering', 'Stronger-agent article must use the MetaEngineering category')
  expectIncludes(strongerAgentEnPost, 'Meta Engineering', 'English stronger-agent article must use the localized Meta Engineering category')
  for (const tag of ['AI Agent', '软件工程', '架构设计', '系统思维']) {
    expectIncludes(strongerAgentZhPost, tag, `Stronger-agent article must render the ${tag} tag`)
  }
  for (const tag of ['AI Agent', 'Software Engineering', 'Architecture', 'Systems Thinking']) {
    expectIncludes(strongerAgentEnPost, tag, `English stronger-agent article must render the ${tag} tag`)
  }

  expectIncludes(legacy, '<meta name="robots" content="noindex,follow">', 'Legacy English URL must be noindex,follow')
  expectIncludes(legacy, `rel="canonical" href="${enPostUrl}"`, 'Legacy English URL must canonicalize to the new URL')
  expectIncludes(legacy, `location.replace("${enPostUrl}")`, 'Legacy English URL must redirect immediately')

  for (const [redirectPath, targetUrl] of taxonomyRedirects) {
    const redirect = read(path.join(publicDir, redirectPath))
    expectIncludes(redirect, '<meta name="robots" content="noindex,follow">', `Taxonomy redirect must be noindex,follow: ${redirectPath}`)
    expectIncludes(redirect, `rel="canonical" href="${targetUrl}"`, `Taxonomy redirect must canonicalize to its destination: ${redirectPath}`)
    expectIncludes(redirect, `location.replace("${targetUrl}")`, `Taxonomy redirect must resolve immediately: ${redirectPath}`)
  }

  for (const tagPath of ['tags/index.html', 'tags/AI/index.html', 'en/tags/index.html', 'en/tags/AI/index.html']) {
    expectIncludes(read(path.join(publicDir, tagPath)), '<meta name="robots" content="noindex,follow">', `Tag archives must be noindex,follow: ${tagPath}`)
  }

  const canonicalCategoryUrl = 'https://blog.janus-path.com/categories/MetaEngineering/'
  const canonicalCategory = read(path.join(publicDir, 'categories/MetaEngineering/index.html'))
  expectIncludes(canonicalCategory, '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">', 'Canonical category must remain indexable')
  expectIncludes(canonicalCategory, `rel="canonical" href="${canonicalCategoryUrl}"`, 'Canonical category must be self-referential')

  expectIncludes(zhFeed, '<title>Codex 团队使用 SOP</title>', 'Chinese Feed must include the Chinese article')
  expectExcludes(zhFeed, '<title>A Team SOP for Using Codex, OpenSpec, and Superpowers</title>', 'Chinese Feed must exclude the English article')
  expectIncludes(enFeed, '<title>A Team SOP for Using Codex, OpenSpec, and Superpowers</title>', 'English Feed must include the English article')
  expectExcludes(enFeed, '<title>Codex 团队使用 SOP</title>', 'English Feed must exclude the Chinese article')
  expectIncludes(zhFeed, '<title>Agent 时代，我们需要重新思考密码管理</title>', 'Chinese Feed must include the new KeptNear article')
  expectExcludes(zhFeed, '<title>Rethinking Password Management in the Agent Era</title>', 'Chinese Feed must exclude the English KeptNear article')
  expectIncludes(enFeed, '<title>Rethinking Password Management in the Agent Era</title>', 'English Feed must include the English KeptNear article')
  expectExcludes(enFeed, '<title>Agent 时代，我们需要重新思考密码管理</title>', 'English Feed must exclude the Chinese KeptNear article')
  expectIncludes(zhFeed, '<title>Agent 越强，我们越需要软件工程</title>', 'Chinese Feed must include the stronger-agent article')
  expectIncludes(enFeed, '<title>The Stronger the Agent, the More We Need Software Engineering</title>', 'English Feed must include the stronger-agent article')
  expectExcludes(zhFeed, '<title>The Stronger the Agent, the More We Need Software Engineering</title>', 'Chinese Feed must exclude the English stronger-agent article')
  expectExcludes(enFeed, '<title>Agent 越强，我们越需要软件工程</title>', 'English Feed must exclude the Chinese stronger-agent article')
  expectIncludes(zhFeed, '<title>AI 时代的软件研发组织变革探索：从多人组织到一人组织</title>', 'Chinese Feed must include the one-person organization article')
  expectExcludes(zhFeed, '<title>Software Organizations in the AI Era: From Multi-Person Teams to One-Person Organizations</title>', 'Chinese Feed must exclude the English one-person organization article')
  expectIncludes(enFeed, '<title>Software Organizations in the AI Era: From Multi-Person Teams to One-Person Organizations</title>', 'English Feed must include the one-person organization article')
  expectExcludes(enFeed, '<title>AI 时代的软件研发组织变革探索：从多人组织到一人组织</title>', 'English Feed must exclude the Chinese one-person organization article')
  expectIncludes(zhFeed, '<title>Agent 不需要组织架构，它需要上下文边界</title>', 'Chinese Feed must include the context boundaries article')
  expectExcludes(zhFeed, '<title>Agents Don&apos;t Need Org Charts; They Need Context Boundaries</title>', 'Chinese Feed must exclude the English context boundaries article')
  expectIncludes(enFeed, '<title>Agents Don&apos;t Need Org Charts; They Need Context Boundaries</title>', 'English Feed must include the context boundaries article')
  expectExcludes(enFeed, '<title>Agent 不需要组织架构，它需要上下文边界</title>', 'English Feed must exclude the Chinese context boundaries article')

  expectIncludes(sitemap, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"', 'Root Sitemap must declare the xhtml namespace')
  expectExcludes(sitemap, '<loc>https://blog.janus-path.com/tags/', 'Chinese tag archives must be excluded from the root Sitemap')
  expectExcludes(sitemap, '<loc>https://blog.janus-path.com/en/tags/', 'English tag archives must be excluded from the root Sitemap')
  if (!sitemapEntry(sitemap, canonicalCategoryUrl)) throw new Error('Root Sitemap is missing the canonical MetaEngineering category')
  expectExcludes(sitemap, '<loc>https://blog.janus-path.com/categories/meta-engineering/</loc>', 'Legacy duplicate category must be excluded from the root Sitemap')
  for (const url of [zhPostUrl, enPostUrl]) {
    const entry = sitemapEntry(sitemap, url)
    if (!entry) throw new Error(`Root Sitemap is missing ${url}`)
    expectIncludes(entry, `hreflang="zh-Hans" href="${zhPostUrl}"`, `Sitemap entry must reference Chinese variant: ${url}`)
    expectIncludes(entry, `hreflang="en" href="${enPostUrl}"`, `Sitemap entry must reference English variant: ${url}`)
    expectIncludes(entry, `hreflang="x-default" href="${zhPostUrl}"`, `Sitemap entry must define x-default: ${url}`)
  }
  for (const url of [keptNearZhPostUrl, keptNearEnPostUrl]) {
    const entry = sitemapEntry(sitemap, url)
    if (!entry) throw new Error(`Root Sitemap is missing ${url}`)
    expectIncludes(entry, `hreflang="zh-Hans" href="${keptNearZhPostUrl}"`, `KeptNear Sitemap entry must reference Chinese variant: ${url}`)
    expectIncludes(entry, `hreflang="en" href="${keptNearEnPostUrl}"`, `KeptNear Sitemap entry must reference English variant: ${url}`)
    expectIncludes(entry, `hreflang="x-default" href="${keptNearZhPostUrl}"`, `KeptNear Sitemap entry must define x-default: ${url}`)
  }
  for (const url of [strongerAgentZhPostUrl, strongerAgentEnPostUrl]) {
    const entry = sitemapEntry(sitemap, url)
    if (!entry) throw new Error(`Root Sitemap is missing ${url}`)
    expectIncludes(entry, `hreflang="zh-Hans" href="${strongerAgentZhPostUrl}"`, `Stronger-agent Sitemap entry must reference Chinese variant: ${url}`)
    expectIncludes(entry, `hreflang="en" href="${strongerAgentEnPostUrl}"`, `Stronger-agent Sitemap entry must reference English variant: ${url}`)
    expectIncludes(entry, `hreflang="x-default" href="${strongerAgentZhPostUrl}"`, `Stronger-agent Sitemap entry must define x-default: ${url}`)
  }

  process.stdout.write(`Bilingual build verification passed (${pairs.length} complete article pairs).\n`)
}

module.exports = verifyBilingualBuild

if (require.main === module) verifyBilingualBuild()
