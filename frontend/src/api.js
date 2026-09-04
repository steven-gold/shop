import { reactive } from 'vue'

export const state = reactive({
  token: localStorage.getItem('aurora_token') || '',
  user: JSON.parse(localStorage.getItem('aurora_user') || 'null'),
  cartCount: 0,
  site: null,
  categories: [],
  pages: [],
  menus: [],
  newsCategories: [],
  authOpen: false,
  authMode: 'login',
  searchOpen: false
})

export function setSession(token, user) {
  state.token = token
  state.user = user
  localStorage.setItem('aurora_token', token)
  localStorage.setItem('aurora_user', JSON.stringify(user))
}

export function logout() {
  state.token = ''
  state.user = null
  state.cartCount = 0
  localStorage.removeItem('aurora_token')
  localStorage.removeItem('aurora_user')
}

export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (state.token) headers.Authorization = `Bearer ${state.token}`
  const res = await fetch(path, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || '請求失敗')
  return data
}

export async function refreshCart() {
  if (!state.token) {
    state.cartCount = 0
    return
  }
  try {
    const cart = await api('/api/cart')
    state.cartCount = cart.items.reduce((s, i) => s + i.qty, 0)
  } catch {
    state.cartCount = 0
  }
}

export async function bootstrap() {
  try {
    const cms = await api('/api/cms')
    state.site = cms.site
    state.categories = cms.categories || []
    state.pages = cms.pages || []
    state.menus = cms.menus || []
    state.newsCategories = cms.newsCategories || []
    applyFavicon()
  } catch {
    try {
      const [site, categories] = await Promise.all([api('/api/site'), api('/api/categories')])
      state.site = site
      state.categories = categories
    } catch { /* keep empty */ }
  }
  if (state.token) {
    try {
      state.user = await api('/api/auth/me')
      localStorage.setItem('aurora_user', JSON.stringify(state.user))
      await refreshCart()
    } catch {
      logout()
    }
  }
}

export function money(n) {
  return `NT$${Number(n || 0).toLocaleString('zh-Hant-TW')}`
}

export function treeCategories(list) {
  const source = list || state.categories
  const parents = source.filter((c) => !c.parentId)
  return parents.map((p) => ({
    ...p,
    children: source.filter((c) => c.parentId === p.id)
  }))
}

export function pageBySlug(slug) {
  return (state.pages || []).find((p) => p.slug === slug) || {}
}

export function menusAt(location) {
  const all = (state.menus || []).filter((m) => m.location === location && m.visible !== false)
  const tops = all.filter((m) => !m.parentId).sort((a, b) => a.sort - b.sort)
  return tops.map((t) => ({
    ...t,
    children: all.filter((m) => m.parentId === t.id).sort((a, b) => a.sort - b.sort)
  }))
}

function setMeta(name, content) {
  if (content == null) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOg(prop, content) {
  if (!content) return
  let el = document.querySelector(`meta[property="${prop}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applyFavicon() {
  const href = state.site?.favicon || state.site?.logo
  if (!href) return
  let link = document.querySelector('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
}

export function applySeo(page) {
  const site = state.site || {}
  const seo = site.seo || {}
  const title = (page && (page.seoTitle || page.title)) || seo.title || site.name || '歐若拉公主童裝'
  document.title = title
  setMeta('description', (page && page.seoDescription) || seo.description || '')
  setMeta('keywords', (page && page.seoKeywords) || seo.keywords || '')
  setOg('og:title', (page && (page.seoTitle || page.title)) || seo.ogTitle || title)
  setOg('og:description', (page && page.seoDescription) || seo.description || '')
  setOg('og:image', (page && (page.seoImage || page.banner || page.image)) || seo.ogImage || site.logo || '')
}
