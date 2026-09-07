'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { termsFor, search, snippet, highlightedParts, createIndexLoader } = require('../themes/butterfly/source/js/search/local-search')
const searchIndex = require('./lib/search-index')
const article = (title, content = '', description = '') => ({ title, content, description, url: '/2026/article/' })
const response = posts => ({ ok: true, json: async () => ({ locale: 'zh-CN', posts }) })

test('title hits outrank frequent body hits; all query terms are required', () => {
  const body = article('Other', 'echo labs '.repeat(200))
  const title = article('EchoPath Labs', 'Practice')
  assert.deepEqual(search([body, title, article('Echo only')], 'ECHO labs'), [title, body])
  assert.deepEqual(termsFor(' Echo\tECHO  labs '), ['echo', 'labs'])
})

test('Chinese, mixed-language, punctuation and whitespace queries are literal', () => {
  const post = article('从文字为思维建模：EchoPath Labs', 'C++ [model]')
  assert.deepEqual(search([post], '思维 EchoPath'), [post])
  assert.deepEqual(search([post], 'C++ [model]'), [post])
  assert.deepEqual(search([post], '.*'), [])
  assert.deepEqual(search([post], ' \n '), [])
})

test('description is preferred, body passages reveal body-only matches', () => {
  const post = article('EchoPath', 'Introduction. '.repeat(30) + 'continuity matters.', 'An EchoPath introduction.')
  assert.equal(snippet(post, ['echopath']), post.description)
  assert.match(snippet(post, ['continuity']), /continuity/)
  assert.ok(snippet(post, ['continuity']).startsWith('…'))
})

test('overlapping highlights merge and preserve raw text as data', () => {
  const raw = '<img src=x onerror=alert(1)> EchoPath'
  const parts = highlightedParts(raw, ['echo', 'echopath', 'img'])
  assert.equal(parts.map(part => part.text).join(''), raw)
  assert.deepEqual(parts.filter(part => part.match).map(part => part.text), ['img', 'EchoPath'])
  assert.deepEqual(highlightedParts('No hit', []), [{ text: 'No hit', match: false }])
})

test('index generation isolates locale and removes private posts and non-prose', () => {
  const base = { ...article('文字 &amp; 思维', '<p>First</p><p>Second</p><script>secret()</script><pre>code</pre>'), lang: 'zh-CN', path: '2026/文字/' }
  const data = searchIndex([base, { ...base, lang: 'en' }, { ...base, encrypt: true }, { ...base, password: 'x' },
    { ...base, published: false }, { ...base, notPublished: () => true }], 'zh-CN', '/')
  assert.equal(data.posts.length, 1)
  assert.equal(data.posts[0].content, 'First Second')
  assert.equal(data.posts[0].title, '文字 & 思维')
  assert.equal(data.posts[0].url, '/2026/%E6%96%87%E5%AD%97/')
  assert.equal(searchIndex([{ ...base, lang: 'en' }], 'en', '/en/').posts[0].url, '/en/2026/%E6%96%87%E5%AD%97/')
})

test('loader stays idle until called, shares pending work and caches successful data', async () => {
  let calls = 0
  let finish
  const fetcher = () => { calls++; return new Promise(resolve => { finish = resolve }) }
  const load = createIndexLoader('/search.json', 'zh-CN', fetcher, 'http://localhost')
  assert.equal(calls, 0)
  const first = load()
  const second = load()
  assert.equal(first, second)
  await Promise.resolve()
  assert.equal(calls, 1)
  finish(response([article('测试')]))
  assert.equal((await first)[0].title, '测试')
  await load()
  assert.equal(calls, 1)
})

for (const failure of [
  () => Promise.reject(new Error('offline')),
  () => ({ ok: false, json: async () => ({}) }),
  () => ({ ok: true, json: async () => { throw new Error('bad JSON') } }),
  () => ({ ok: true, json: async () => ({ locale: 'en', posts: [] }) })
]) {
  test('failed index fetch/HTTP/JSON/locale validation remains retryable', async () => {
    let calls = 0
    const load = createIndexLoader('/search.json', 'zh-CN', () => ++calls === 1 ? failure() : response([]), 'http://localhost')
    await assert.rejects(load())
    assert.deepEqual(await load(), [])
    assert.equal(calls, 2)
  })
}

test('loader rejects malformed entries, executable URLs, foreign hosts and other locale URLs', async () => {
  for (const entry of [null, {}, { ...article('x'), url: 'javascript:alert(1)' },
    { ...article('x'), url: '//example.com/' }, { ...article('x'), url: '/en/2026/article/' }]) {
    const load = createIndexLoader('/search.json', 'zh-CN', () => response([entry]), 'http://localhost')
    await assert.rejects(load())
  }
})
