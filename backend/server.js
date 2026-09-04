const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { load, save, nextId, hashPassword, verifyPassword } = require('./db')
const { categoryFromBody } = require('./cms')

const app = express()
const PORT = process.env.PORT || 3001
const SECRET = process.env.JWT_SECRET || 'aurora-princess-demo-secret'
const UPLOAD_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

app.use(cors())
app.use(express.json({ limit: '8mb' }))
app.use('/uploads', express.static(UPLOAD_DIR))

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase()
    const safe = /^\.(jpe?g|png|gif|webp|svg|ico)$/.test(ext) ? ext : '.jpg'
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 8) + safe)
  }
})
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } })

function publicProduct(p) {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    categoryId: p.categoryId,
    tags: p.tags || [],
    price: p.price,
    salePrice: p.salePrice,
    sizes: p.sizes || [],
    color: p.color,
    image: p.image,
    gallery: p.gallery || [p.image],
    stock: p.stock,
    featured: !!p.featured,
    homeCategory: p.homeCategory || '',
    desc: p.desc || ''
  }
}

function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ message: '請先登入' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    return res.status(401).json({ message: '登入已過期' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: '需要管理員權限' })
  next()
}

function tokenFor(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, SECRET, { expiresIn: '7d' })
}

function safeUser(u) {
  return { id: u.id, email: u.email, name: u.name, phone: u.phone || '', role: u.role, createdAt: u.createdAt }
}

function matchCategory(data, product, categoryId) {
  const cid = Number(categoryId)
  if (!cid) return true
  if (product.categoryId === cid) return true
  if (cid === 62 && (product.tags || []).includes('sale')) return true
  const children = data.categories.filter((c) => c.parentId === cid).map((c) => c.id)
  if (children.includes(product.categoryId)) return true
  return false
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/site', (_req, res) => {
  const data = load()
  res.json(data.site)
})

app.get('/api/cms', (_req, res) => {
  const data = load()
  res.json({
    site: data.site,
    pages: data.pages || [],
    menus: (data.menus || []).filter((m) => m.visible !== false),
    categories: (data.categories || []).filter((c) => c.visible !== false),
    newsCategories: (data.newsCategories || []).filter((c) => c.visible !== false)
  })
})

app.get('/api/banners', (_req, res) => {
  const data = load()
  res.json([...data.banners].sort((a, b) => a.sort - b.sort))
})

app.get('/api/categories', (_req, res) => {
  const data = load()
  const counts = {}
  for (const p of data.products) {
    counts[p.categoryId] = (counts[p.categoryId] || 0) + 1
    if ((p.tags || []).includes('sale')) counts[62] = (counts[62] || 0) + 1
  }
  const list = data.categories.map((c) => {
    const childIds = data.categories.filter((x) => x.parentId === c.id).map((x) => x.id)
    const count = (counts[c.id] || 0) + childIds.reduce((s, id) => s + (counts[id] || 0), 0)
    return { ...c, count }
  })
  res.json(list)
})

app.get('/api/home', (_req, res) => {
  const data = load()
  const featured = data.products.filter((p) => p.featured).map(publicProduct)
  const fallback = (data.products[0] && data.products[0].image) || ''
  let tiles = data.categories
    .filter((c) => c.showOnHome && c.visible !== false)
    .sort((a, b) => (a.homeSort || 0) - (b.homeSort || 0))
    .map((c) => ({
      title: c.homeTitle || c.pageTitle || c.name,
      categoryId: c.id,
      image: c.image || fallback,
      count: data.products.filter((p) => matchCategory(data, p, c.id)).length
    }))
  if (!tiles.length) {
    tiles = data.categories.filter((c) => !c.parentId).slice(0, 6).map((c) => ({
      title: c.homeTitle || c.name,
      categoryId: c.id,
      image: c.image || fallback,
      count: data.products.filter((p) => matchCategory(data, p, c.id)).length
    }))
  }
  res.json({
    site: data.site,
    banners: [...data.banners].sort((a, b) => a.sort - b.sort),
    tiles,
    featured,
    news: data.news.slice(0, 3),
    page: (data.pages || []).find((x) => x.slug === 'home') || null
  })
})

app.get('/api/products', (req, res) => {
  const data = load()
  const { category, q, page = 1, pageSize = 12, sort } = req.query
  let list = data.products.filter((p) => matchCategory(data, p, category))
  if (q) {
    const key = String(q).toLowerCase()
    list = list.filter((p) => `${p.name} ${p.sku} ${p.color}`.toLowerCase().includes(key))
  }
  if (sort === 'price-asc') list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
  else if (sort === 'price-desc') list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
  else list.sort((a, b) => b.id - a.id)
  const p = Math.max(1, Number(page) || 1)
  const size = Math.min(48, Math.max(1, Number(pageSize) || 12))
  const total = list.length
  const items = list.slice((p - 1) * size, p * size).map(publicProduct)
  res.json({ items, total, page: p, pageSize: size, pages: Math.ceil(total / size) || 1 })
})

app.get('/api/products/:id', (req, res) => {
  const data = load()
  const product = data.products.find((p) => p.id === Number(req.params.id))
  if (!product) return res.status(404).json({ message: '找不到商品' })
  const related = data.products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4)
    .map(publicProduct)
  res.json({ ...publicProduct(product), related })
})

app.get('/api/news', (req, res) => {
  const data = load()
  const cid = Number(req.query.category || 0)
  let list = [...data.news]
  if (cid) list = list.filter((n) => n.categoryId === cid)
  list.sort((a, b) => String(b.date).localeCompare(String(a.date)))
  res.json({ categories: data.newsCategories, items: list })
})

app.get('/api/news/:id', (req, res) => {
  const data = load()
  const item = data.news.find((n) => n.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到文章' })
  const category = data.newsCategories.find((c) => c.id === item.categoryId)
  res.json({ ...item, categoryName: category ? category.name : '' })
})

app.get('/api/stores', (_req, res) => {
  res.json(load().stores)
})

app.get('/api/faqs', (_req, res) => {
  res.json(load().faqs)
})

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, content } = req.body || {}
  if (!name || !email || !content) return res.status(400).json({ message: '請填寫姓名、Email 與內容' })
  const data = load()
  data.messages.push({
    id: nextId(data),
    name,
    email,
    phone: phone || '',
    subject: subject || '官網來信',
    content,
    read: false,
    createdAt: new Date().toISOString()
  })
  save(data)
  res.json({ ok: true })
})

app.post('/api/subscribe', (req, res) => {
  const { name, email, phone, childAge } = req.body || {}
  if (!name || !email) return res.status(400).json({ message: '請填寫姓名與 Email' })
  const data = load()
  data.subscribers.push({
    id: nextId(data),
    name,
    email,
    phone: phone || '',
    childAge: childAge || '',
    createdAt: new Date().toISOString()
  })
  save(data)
  res.json({ ok: true })
})

app.post('/api/auth/register', (req, res) => {
  const { email, password, name, phone } = req.body || {}
  if (!email || !password || !name) return res.status(400).json({ message: '請填寫帳號、密碼與姓名' })
  const data = load()
  if (data.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ message: '此帳號已被註冊' })
  }
  const user = {
    id: nextId(data),
    email,
    name,
    phone: phone || '',
    password: hashPassword(password),
    role: 'member',
    createdAt: new Date().toISOString()
  }
  data.users.push(user)
  save(data)
  res.json({ token: tokenFor(user), user: safeUser(user) })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  const data = load()
  const user = data.users.find((u) => u.email.toLowerCase() === String(email || '').toLowerCase())
  if (!user || !verifyPassword(password, user.password)) {
    return res.status(400).json({ message: '帳號或密碼不正確' })
  }
  res.json({ token: tokenFor(user), user: safeUser(user) })
})

app.get('/api/auth/me', auth, (req, res) => {
  const data = load()
  const user = data.users.find((u) => u.id === req.user.id)
  if (!user) return res.status(401).json({ message: '帳號不存在' })
  res.json(safeUser(user))
})

app.put('/api/auth/profile', auth, (req, res) => {
  const data = load()
  const user = data.users.find((u) => u.id === req.user.id)
  if (!user) return res.status(404).json({ message: '帳號不存在' })
  user.name = req.body.name || user.name
  user.phone = req.body.phone || user.phone
  if (req.body.password) user.password = hashPassword(req.body.password)
  save(data)
  res.json(safeUser(user))
})

app.get('/api/cart', auth, (req, res) => {
  const data = load()
  const cart = data.carts[req.user.id] || []
  const items = cart.map((line) => {
    const product = data.products.find((p) => p.id === line.productId)
    return {
      ...line,
      name: product ? product.name : '已下架商品',
      image: product ? product.image : '',
      price: product ? product.salePrice || product.price : 0,
      stock: product ? product.stock : 0
    }
  })
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  res.json({ items, total })
})

app.post('/api/cart', auth, (req, res) => {
  const { productId, size, qty = 1 } = req.body || {}
  const data = load()
  const product = data.products.find((p) => p.id === Number(productId))
  if (!product) return res.status(404).json({ message: '找不到商品' })
  const cart = data.carts[req.user.id] || []
  const exist = cart.find((l) => l.productId === product.id && l.size === size)
  if (exist) exist.qty += Number(qty) || 1
  else cart.push({ id: nextId(data), productId: product.id, size: size || (product.sizes[0] || ''), qty: Number(qty) || 1 })
  data.carts[req.user.id] = cart
  save(data)
  res.json({ ok: true, count: cart.reduce((s, i) => s + i.qty, 0) })
})

app.put('/api/cart/:id', auth, (req, res) => {
  const data = load()
  const cart = data.carts[req.user.id] || []
  const line = cart.find((l) => l.id === Number(req.params.id))
  if (!line) return res.status(404).json({ message: '購物車沒有此商品' })
  line.qty = Math.max(1, Number(req.body.qty) || 1)
  save(data)
  res.json({ ok: true })
})

app.delete('/api/cart/:id', auth, (req, res) => {
  const data = load()
  data.carts[req.user.id] = (data.carts[req.user.id] || []).filter((l) => l.id !== Number(req.params.id))
  save(data)
  res.json({ ok: true })
})

app.post('/api/orders', auth, (req, res) => {
  const { receiver, phone, address, note } = req.body || {}
  if (!receiver || !phone || !address) return res.status(400).json({ message: '請填寫收件資訊' })
  const data = load()
  const cart = data.carts[req.user.id] || []
  if (!cart.length) return res.status(400).json({ message: '購物車是空的' })
  const items = cart.map((line) => {
    const product = data.products.find((p) => p.id === line.productId)
    const price = product ? product.salePrice || product.price : 0
    if (product) product.stock = Math.max(0, product.stock - line.qty)
    return { productId: line.productId, name: product ? product.name : '', size: line.size, qty: line.qty, price }
  })
  const order = {
    id: nextId(data),
    userId: req.user.id,
    items,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    status: '待出貨',
    receiver,
    phone,
    address,
    note: note || '',
    createdAt: new Date().toISOString()
  }
  data.orders.unshift(order)
  data.carts[req.user.id] = []
  save(data)
  res.json(order)
})

app.get('/api/orders', auth, (req, res) => {
  const data = load()
  const list = data.orders.filter((o) => o.userId === req.user.id)
  res.json(list)
})

app.get('/api/admin/stats', auth, adminOnly, (_req, res) => {
  const data = load()
  res.json({
    products: data.products.length,
    orders: data.orders.length,
    members: data.users.filter((u) => u.role === 'member').length,
    messages: data.messages.length,
    unread: data.messages.filter((m) => !m.read).length,
    revenue: data.orders.reduce((s, o) => s + o.total, 0)
  })
})

app.get('/api/admin/products', auth, adminOnly, (_req, res) => {
  res.json(load().products.map(publicProduct))
})

app.post('/api/admin/products', auth, adminOnly, (req, res) => {
  const data = load()
  const p = req.body || {}
  const product = {
    id: nextId(data),
    sku: p.sku || `A${Date.now().toString().slice(-5)}`,
    name: p.name,
    categoryId: Number(p.categoryId) || 3,
    tags: p.tags || [],
    price: Number(p.price) || 0,
    salePrice: Number(p.salePrice) || Number(p.price) || 0,
    sizes: typeof p.sizes === 'string' ? p.sizes.split(',').map((s) => s.trim()).filter(Boolean) : p.sizes || [],
    color: p.color || '',
    image: p.image,
    gallery: p.gallery || [p.image],
    stock: Number(p.stock) || 0,
    featured: !!p.featured,
    desc: p.desc || ''
  }
  data.products.unshift(product)
  save(data)
  res.json(publicProduct(product))
})

app.put('/api/admin/products/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const product = data.products.find((p) => p.id === Number(req.params.id))
  if (!product) return res.status(404).json({ message: '找不到商品' })
  const p = req.body || {}
  Object.assign(product, {
    sku: p.sku ?? product.sku,
    name: p.name ?? product.name,
    categoryId: p.categoryId != null ? Number(p.categoryId) : product.categoryId,
    tags: p.tags ?? product.tags,
    price: p.price != null ? Number(p.price) : product.price,
    salePrice: p.salePrice != null ? Number(p.salePrice) : product.salePrice,
    sizes: typeof p.sizes === 'string' ? p.sizes.split(',').map((s) => s.trim()).filter(Boolean) : p.sizes || product.sizes,
    color: p.color ?? product.color,
    image: p.image ?? product.image,
    gallery: p.gallery || product.gallery,
    stock: p.stock != null ? Number(p.stock) : product.stock,
    featured: p.featured != null ? !!p.featured : product.featured,
    desc: p.desc ?? product.desc
  })
  save(data)
  res.json(publicProduct(product))
})

app.delete('/api/admin/products/:id', auth, adminOnly, (req, res) => {
  const data = load()
  data.products = data.products.filter((p) => p.id !== Number(req.params.id))
  save(data)
  res.json({ ok: true })
})

app.get('/api/admin/orders', auth, adminOnly, (_req, res) => {
  res.json(load().orders)
})

app.put('/api/admin/orders/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const order = data.orders.find((o) => o.id === Number(req.params.id))
  if (!order) return res.status(404).json({ message: '找不到訂單' })
  order.status = req.body.status || order.status
  save(data)
  res.json(order)
})

app.get('/api/admin/members', auth, adminOnly, (_req, res) => {
  res.json(load().users.filter((u) => u.role === 'member').map(safeUser))
})

app.get('/api/admin/messages', auth, adminOnly, (_req, res) => {
  res.json(load().messages)
})

app.put('/api/admin/messages/:id/read', auth, adminOnly, (req, res) => {
  const data = load()
  const msg = data.messages.find((m) => m.id === Number(req.params.id))
  if (!msg) return res.status(404).json({ message: '找不到留言' })
  msg.read = true
  save(data)
  res.json(msg)
})

app.get('/api/admin/banners', auth, adminOnly, (_req, res) => res.json(load().banners))
app.put('/api/admin/banners/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = data.banners.find((b) => b.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到輪播' })
  Object.assign(item, req.body)
  save(data)
  res.json(item)
})

app.get('/api/admin/news', auth, adminOnly, (_req, res) => res.json(load().news))
app.post('/api/admin/news', auth, adminOnly, (req, res) => {
  const data = load()
  const item = {
    id: nextId(data),
    categoryId: Number(req.body.categoryId) || 10,
    title: req.body.title,
    date: req.body.date || new Date().toISOString().slice(0, 10),
    image: req.body.image,
    excerpt: req.body.excerpt || '',
    content: req.body.content || ''
  }
  data.news.unshift(item)
  save(data)
  res.json(item)
})
app.put('/api/admin/news/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = data.news.find((n) => n.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到文章' })
  Object.assign(item, req.body)
  save(data)
  res.json(item)
})
app.delete('/api/admin/news/:id', auth, adminOnly, (req, res) => {
  const data = load()
  data.news = data.news.filter((n) => n.id !== Number(req.params.id))
  save(data)
  res.json({ ok: true })
})

app.get('/api/admin/stores', auth, adminOnly, (_req, res) => res.json(load().stores))
app.post('/api/admin/stores', auth, adminOnly, (req, res) => {
  const data = load()
  const item = { id: nextId(data), ...req.body }
  data.stores.push(item)
  save(data)
  res.json(item)
})
app.put('/api/admin/stores/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = data.stores.find((s) => s.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到據點' })
  Object.assign(item, req.body)
  save(data)
  res.json(item)
})
app.delete('/api/admin/stores/:id', auth, adminOnly, (req, res) => {
  const data = load()
  data.stores = data.stores.filter((s) => s.id !== Number(req.params.id))
  save(data)
  res.json({ ok: true })
})

app.post('/api/admin/upload', auth, adminOnly, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: '請選擇檔案' })
  res.json({ url: '/uploads/' + req.file.filename, name: req.file.originalname })
})

app.get('/api/admin/categories', auth, adminOnly, (_req, res) => res.json(load().categories))
app.post('/api/admin/categories', auth, adminOnly, (req, res) => {
  const data = load()
  const item = categoryFromBody(req.body || {}, nextId(data))
  data.categories.push(item)
  save(data)
  res.json(item)
})
app.put('/api/admin/categories/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const idx = data.categories.findIndex((c) => c.id === Number(req.params.id))
  if (idx < 0) return res.status(404).json({ message: '找不到分類' })
  data.categories[idx] = categoryFromBody({ ...data.categories[idx], ...(req.body || {}) }, data.categories[idx].id)
  save(data)
  res.json(data.categories[idx])
})
app.delete('/api/admin/categories/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const id = Number(req.params.id)
  if (data.categories.some((c) => c.parentId === id)) {
    return res.status(400).json({ message: '請先刪除子分類' })
  }
  data.categories = data.categories.filter((c) => c.id !== id)
  save(data)
  res.json({ ok: true })
})

app.get('/api/admin/news-categories', auth, adminOnly, (_req, res) => res.json(load().newsCategories))
app.post('/api/admin/news-categories', auth, adminOnly, (req, res) => {
  const data = load()
  const b = req.body || {}
  const item = {
    id: nextId(data),
    name: b.name || '未命名',
    menuName: b.menuName || b.name || '未命名',
    image: b.image || '',
    seoTitle: b.seoTitle || b.name || '',
    seoDescription: b.seoDescription || '',
    seoKeywords: b.seoKeywords || '',
    visible: b.visible !== false,
    sort: Number(b.sort) || 0
  }
  data.newsCategories.push(item)
  save(data)
  res.json(item)
})
app.put('/api/admin/news-categories/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = data.newsCategories.find((c) => c.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到文章分類' })
  Object.assign(item, req.body || {})
  save(data)
  res.json(item)
})
app.delete('/api/admin/news-categories/:id', auth, adminOnly, (req, res) => {
  const data = load()
  data.newsCategories = data.newsCategories.filter((c) => c.id !== Number(req.params.id))
  save(data)
  res.json({ ok: true })
})

app.get('/api/admin/menus', auth, adminOnly, (_req, res) => res.json(load().menus || []))
app.post('/api/admin/menus', auth, adminOnly, (req, res) => {
  const data = load()
  const b = req.body || {}
  const item = {
    id: nextId(data),
    location: b.location || 'header',
    name: b.name || '未命名',
    url: b.url || '/',
    parentId: Number(b.parentId) || 0,
    sort: Number(b.sort) || 0,
    visible: b.visible !== false
  }
  data.menus = data.menus || []
  data.menus.push(item)
  save(data)
  res.json(item)
})
app.put('/api/admin/menus/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = (data.menus || []).find((m) => m.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: '找不到選單' })
  const b = req.body || {}
  Object.assign(item, {
    location: b.location ?? item.location,
    name: b.name ?? item.name,
    url: b.url ?? item.url,
    parentId: b.parentId != null ? Number(b.parentId) : item.parentId,
    sort: b.sort != null ? Number(b.sort) : item.sort,
    visible: b.visible != null ? !!b.visible : item.visible
  })
  save(data)
  res.json(item)
})
app.delete('/api/admin/menus/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const id = Number(req.params.id)
  data.menus = (data.menus || []).filter((m) => m.id !== id && m.parentId !== id)
  save(data)
  res.json({ ok: true })
})

app.get('/api/admin/pages', auth, adminOnly, (_req, res) => res.json(load().pages || []))
app.put('/api/admin/pages/:id', auth, adminOnly, (req, res) => {
  const data = load()
  const item = (data.pages || []).find((p) => p.id === Number(req.params.id) || p.slug === req.params.id)
  if (!item) return res.status(404).json({ message: '找不到頁面' })
  const b = req.body || {}
  Object.assign(item, {
    menuName: b.menuName ?? item.menuName,
    title: b.title ?? item.title,
    subtitle: b.subtitle ?? item.subtitle,
    banner: b.banner ?? item.banner,
    image: b.image ?? item.image,
    content: b.content ?? item.content,
    seoTitle: b.seoTitle ?? item.seoTitle,
    seoDescription: b.seoDescription ?? item.seoDescription,
    seoKeywords: b.seoKeywords ?? item.seoKeywords,
    seoImage: b.seoImage ?? item.seoImage,
    extras: b.extras != null ? b.extras : item.extras
  })
  save(data)
  res.json(item)
})

app.put('/api/admin/site', auth, adminOnly, (req, res) => {
  const data = load()
  const b = req.body || {}
  Object.assign(data.site, b)
  if (Array.isArray(b.contacts)) data.site.contacts = b.contacts
  if (b.seo) data.site.seo = { ...data.site.seo, ...b.seo }
  if (b.home) data.site.home = { ...data.site.home, ...b.home }
  save(data)
  res.json(data.site)
})

app.get('/api/admin/subscribers', auth, adminOnly, (_req, res) => res.json(load().subscribers))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: '伺服器發生錯誤' })
})

app.listen(PORT, '0.0.0.0', () => {
  load()
  console.log(`AURORA API running on http://127.0.0.1:${PORT}`)
})
