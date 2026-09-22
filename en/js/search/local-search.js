/* Local search: shared pure functions also run in the Node behavior tests. */
;(function () {
  'use strict'

  const termsFor = query => [...new Set(query.trim().toLowerCase().split(/\s+/u).filter(Boolean))]

  function search (posts, query) {
    const terms = termsFor(query)
    if (!terms.length) return []
    return posts.map((post, order) => {
      const title = post.title.toLowerCase()
      const description = post.description.toLowerCase()
      const text = `${title} ${description} ${post.content.toLowerCase()}`
      return {
        post, order,
        matches: terms.every(term => text.includes(term)),
        titleScore: terms.filter(term => title.includes(term)).length,
        phraseScore: Number(title.includes(terms.join(' '))),
        descriptionScore: terms.filter(term => description.includes(term)).length
      }
    }).filter(item => item.matches)
      .sort((a, b) => b.titleScore - a.titleScore || b.phraseScore - a.phraseScore ||
        b.descriptionScore - a.descriptionScore || a.order - b.order)
      .map(item => item.post)
  }

  function snippet (post, terms, limit = 160) {
    const description = post.description
    const source = description && (terms.some(term => description.toLowerCase().includes(term)) ||
      terms.every(term => post.title.toLowerCase().includes(term))) ? description : post.content
    const offsets = terms.map(term => source.toLowerCase().indexOf(term)).filter(index => index >= 0)
    let start = source.length <= limit ? 0 : Math.max(0, (offsets.length ? Math.min(...offsets) : 0) - 36)
    // Avoid starting or ending halfway through an English word or surrogate pair.
    if (start && /[a-z]/i.test(source[start])) {
      while (start > 0 && /[a-z]/i.test(source[start - 1])) start--
    }
    if (start && /[\uDC00-\uDFFF]/u.test(source[start])) start--
    let end = Math.min(source.length, start + limit)
    if (end < source.length && /[\uDC00-\uDFFF]/u.test(source[end])) end--
    return `${start ? '…' : ''}${source.slice(start, end)}${end < source.length ? '…' : ''}`
  }

  function highlightedParts (text, terms) {
    const lower = text.toLowerCase()
    const ranges = []
    for (const term of terms.filter(Boolean)) {
      let index = lower.indexOf(term)
      while (index !== -1) {
        ranges.push([index, index + term.length])
        index = lower.indexOf(term, index + term.length)
      }
    }
    ranges.sort((a, b) => a[0] - b[0])
    const merged = []
    for (const range of ranges) {
      const last = merged[merged.length - 1]
      if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1])
      else merged.push(range.slice())
    }
    const parts = []
    let cursor = 0
    for (const [start, end] of merged) {
      if (start > cursor) parts.push({ text: text.slice(cursor, start), match: false })
      parts.push({ text: text.slice(start, end), match: true })
      cursor = end
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false })
    return parts
  }

  function createIndexLoader (path, locale, fetcher, origin) {
    let pending
    return () => {
      if (pending) return pending
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      pending = Promise.resolve().then(() => fetcher(path, { signal: controller.signal }))
        .then(response => {
          if (!response.ok) throw new Error('Search index request failed')
          return response.json()
        }).then(data => {
          if (data.locale !== locale || !Array.isArray(data.posts)) throw new Error('Invalid search index')
          return data.posts.map(post => {
            if (!post || !['title', 'url', 'description', 'content'].every(key => typeof post[key] === 'string')) {
              throw new Error('Invalid search article')
            }
            const url = new URL(post.url, origin)
            if (url.origin !== origin || !post.url.startsWith('/') || post.url.startsWith('//') ||
              (locale === 'en' ? !url.pathname.startsWith('/en/') : url.pathname.startsWith('/en/'))) {
              throw new Error('Invalid search URL')
            }
            return { ...post, url: url.pathname + url.search + url.hash }
          })
        }).catch(error => {
          pending = undefined
          throw error
        }).finally(() => clearTimeout(timer))
      return pending
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { termsFor, search, snippet, highlightedParts, createIndexLoader }
    return
  }

  const dialog = document.getElementById('jp-search-dialog')
  if (!dialog) return
  const input = document.getElementById('jp-search-input')
  const status = document.getElementById('jp-search-status')
  const results = document.getElementById('local-search-results')
  const retry = document.getElementById('jp-search-retry')
  const config = GLOBAL_CONFIG.localSearch
  const copy = config.languages
  const loadIndex = createIndexLoader(config.path, config.locale, window.fetch.bind(window), location.origin)
  let posts
  let loading = false
  let returnFocus
  let previousOverflow

  function appendHighlighted (element, text, terms) {
    for (const part of highlightedParts(text, terms)) {
      const node = part.match ? document.createElement('mark') : document.createTextNode(part.text)
      if (part.match) node.textContent = part.text
      element.append(node)
    }
  }

  function render () {
    if (!posts) return
    const terms = termsFor(input.value)
    const matches = search(posts, input.value)
    const fragment = document.createDocumentFragment()
    for (const post of matches) {
      const item = document.createElement('li')
      const link = document.createElement('a')
      const title = document.createElement('span')
      const excerpt = document.createElement('p')
      link.href = post.url
      title.className = 'search-result-title'
      excerpt.className = 'search-result'
      appendHighlighted(title, post.title, terms)
      appendHighlighted(excerpt, snippet(post, terms, config.locale === 'en' ? 230 : 140), terms)
      link.append(title, excerpt)
      item.append(link)
      fragment.append(item)
    }
    results.replaceChildren(fragment)
    results.scrollTop = 0
    status.textContent = !terms.length ? copy.initial : matches.length
      ? copy.count.replace('{count}', matches.length) : copy.empty
  }

  async function ensureIndex () {
    if (posts) return render()
    if (loading) return
    loading = true
    retry.hidden = true
    status.textContent = copy.loading
    results.setAttribute('aria-busy', 'true')
    try {
      posts = await loadIndex()
      render()
    } catch (error) {
      status.textContent = copy.error
      retry.hidden = false
    } finally {
      loading = false
      results.removeAttribute('aria-busy')
    }
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-open-search]')
    if (!trigger || dialog.open) return
    const fromSidebar = trigger.closest('#sidebar-menus')
    if (fromSidebar) document.getElementById('menu-mask').click()
    returnFocus = fromSidebar ? document.querySelector('#search-button button') : trigger
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    input.focus()
    ensureIndex()
  })
  dialog.querySelector('.search-close-button').addEventListener('click', () => dialog.close())
  dialog.addEventListener('keydown', event => {
    // Search inputs otherwise consume the first Escape to clear their value.
    if (event.key === 'Escape' && !event.isComposing) {
      event.preventDefault()
      dialog.close()
    }
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button:not([hidden]), input, a[href]')]
        .filter(element => element.getClientRects().length)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect()
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close()
  })
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true })
  })
  input.addEventListener('input', render)
  retry.addEventListener('click', () => {
    input.focus()
    ensureIndex()
  })
})()
