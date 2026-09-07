'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { homepageSummary, homepageDiscovery } = require('./lib/homepage')

test('authored descriptions take precedence and preserve readable text', () => {
  assert.equal(homepageSummary({ description: '结构 &amp; <b>观察</b>', content: 'Unrelated body' }, 'zh-CN'), '结构 & 观察')
  assert.equal(homepageSummary({ description: 'Private', encrypt: true }, 'en'), '')
})

test('fallback excludes code, tables and scripts while separating paragraphs', () => {
  const content = '<script>alert(1)</script><style>body{}</style><figure class="highlight"><pre>npm run secret</pre></figure><table><tr><td>Cell</td></tr></table><p>First thought.</p><p>Second thought.</p>'
  assert.equal(homepageSummary({ content }, 'en'), 'First thought. Second thought.')
  assert.equal(homepageSummary({ description: '  ', content: '<p>正文</p>' }, 'zh-CN'), '正文')
})

test('long fallbacks are bounded without splitting Unicode characters', () => {
  assert.equal(Array.from(homepageSummary({ content: '🌿'.repeat(200) }, 'zh-CN')).length, 161)
  const summary = homepageSummary({ content: 'A complete word '.repeat(30) }, 'en')
  assert.ok(summary.length <= 261)
  assert.ok(summary.endsWith('word…') || summary.endsWith('complete…') || summary.endsWith('A…'))
})

test('discovery resolves matching locale and model paths, rejecting broken references', () => {
  const data = { starting_points: [{ key: 'example', label: { en: 'Begin' } }], en: { topics: [{ category: 'Ideas', title: 'Ideas' }] } }
  const posts = [{ translation_key: 'example', lang: 'zh-CN', path: 'wrong/' }, { translation_key: 'example', lang: 'en', path: '2026/example/', title: 'Example' }]
  const categories = [{ name: 'Ideas', path: 'categories/ideas/' }]
  const result = homepageDiscovery(data, 'en', posts, categories)
  assert.equal(result.starting_points[0].path, '2026/example/')
  assert.equal(result.topics[0].path, 'categories/ideas/')
  assert.throws(() => homepageDiscovery(data, 'en', [], categories), /Missing en homepage article/)
  assert.throws(() => homepageDiscovery(data, 'en', posts, []), /Missing en homepage category/)
})
