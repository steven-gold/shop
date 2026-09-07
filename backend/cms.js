function ensure(obj, key, val) {
  if (obj[key] === undefined || obj[key] === null) obj[key] = val
}

function defaultContacts(site) {
  return [
    { id: 1, type: 'phone', label: '電話', value: site.phone || '', href: '', sort: 1 },
    { id: 2, type: 'fax', label: '傳真', value: site.fax || '', href: '', sort: 2 },
    { id: 3, type: 'email', label: 'Email', value: site.email || '', href: '', sort: 3 },
    { id: 4, type: 'address', label: '地址', value: site.address || '', href: '', sort: 4 },
    { id: 5, type: 'hours', label: '營業時間', value: site.hours || '', href: '', sort: 5 }
  ]
}

function defaultSeo(site) {
  return {
    title: `${site.name || '里海寵物'} | ${site.english || 'RIKAI'}`,
    description: site.aboutLead || '里海寵物 RIKAI，給毛孩真正需要的日常營養。',
    keywords: '寵物食品,貓飼料,狗飼料,營養保健,寵物用品,里海寵物,RIKAI',
    ogImage: '',
    ogTitle: ''
  }
}

function defaultHome() {
  return {
    heading: '本週精選',
    subheading: 'Fresh picks for cats & dogs',
    aboutHeading: '用對的營養，陪毛孩走更長的路',
    aboutScript: 'RIKAI Pets',
    aboutButton: '關於里海',
    storesButton: '門市據點',
    blogHeading: '最新訊息',
    blogSubheading: '飼養筆記、到貨公告與營養小知識'
  }
}

function defaultShipping() {
  return {
    freeOver: 2000,
    methods: [
      { id: 'cvs', name: '超商取貨', fee: 60, enabled: true, hint: '7-ELEVEN / 全家 / 萊爾富，填寫門市名稱即可' },
      { id: 'home', name: '寄送到府', fee: 120, enabled: true, hint: '台灣本島宅配，離島運費另計' },
      { id: 'pickup', name: '門市自取', fee: 0, enabled: true, hint: '可至台北、台中、高雄門市取貨' }
    ]
  }
}

function defaultPayment() {
  return {
    methods: [
      { id: 'online', name: '線上付款', enabled: true, hint: '示範站模擬金流，下單即標記為待付款確認' },
      { id: 'card', name: '信用卡', enabled: true, hint: '示範站模擬刷卡，不會真的請款' },
      { id: 'cod', name: '貨到付款', enabled: true, hint: '取貨或宅配時付款' }
    ]
  }
}

function defaultPages() {
  return [
    {
      id: 1, slug: 'home', menuName: '首頁', title: '里海寵物', subtitle: 'RIKAI',
      banner: '', image: '', content: '',
      seoTitle: '里海寵物 | RIKAI',
      seoDescription: '里海寵物 RIKAI，貓狗主食、營養保健與日常用品。',
      seoKeywords: '寵物食品,里海寵物', seoImage: '', extras: {}
    },
    {
      id: 2, slug: 'about', menuName: '關於我們', title: '關於我們', subtitle: 'ABOUT',
      banner: '', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80', content: '',
      seoTitle: '關於我們 | 里海寵物',
      seoDescription: '里海寵物專注貓狗日常營養與用品。',
      seoKeywords: '關於里海,寵物品牌', seoImage: '',
      extras: {
        storyHeading: '我們為什麼開始',
        nameHeading: '品牌命名',
        nameText: '「里海」取靠近海岸、潮汐穩定之意。我們希望毛孩的日常飲食像潮汐一樣可預期：成分清楚、份量好抓、回購不踩雷。',
        futureHeading: '接下來',
        milestones: [
          { year: '2018', text: '高雄左營成立工作室，先做貓主食諮詢' },
          { year: '2021', text: '開出第一間門市，補上狗食與保健線' },
          { year: '2025', text: '官網重啟，門市與宅配同一套庫存' }
        ]
      }
    },
    {
      id: 3, slug: 'products', menuName: '商品列表', title: '商品列表', subtitle: 'SHOP',
      banner: '', image: '', content: '',
      seoTitle: '商品列表 | 里海寵物',
      seoDescription: '瀏覽貓狗主食、飼料、保健與生活用品。',
      seoKeywords: '貓飼料,狗飼料,寵物保健', seoImage: '', extras: {}
    },
    {
      id: 4, slug: 'blog', menuName: '最新訊息', title: '最新訊息', subtitle: 'NEWS',
      banner: '', image: '', content: '',
      seoTitle: '最新訊息 | 里海寵物',
      seoDescription: '到貨公告、飼養筆記與營養小知識。',
      seoKeywords: '寵物知識,到貨公告', seoImage: '', extras: {}
    },
    {
      id: 5, slug: 'stores', menuName: '門市據點', title: '門市據點', subtitle: 'STORES',
      banner: '', image: '', content: '',
      seoTitle: '門市據點 | 里海寵物',
      seoDescription: '台北內湖、台中西屯、高雄左營門市。',
      seoKeywords: '寵物門市', seoImage: '', extras: {}
    },
    {
      id: 6, slug: 'contact', menuName: '聯絡我們', title: '聯絡我們', subtitle: 'CONTACT',
      banner: '', image: '', content: '',
      seoTitle: '聯絡我們 | 里海寵物',
      seoDescription: '商品諮詢、訂單與門市問題歡迎留言。',
      seoKeywords: '聯絡里海', seoImage: '', extras: {}
    },
    {
      id: 7, slug: 'faq', menuName: '購物須知', title: '購物須知', subtitle: 'GUIDE',
      banner: '', image: '', content: '',
      seoTitle: '購物須知 | 里海寵物',
      seoDescription: '出貨、取貨、付款與退換貨說明。',
      seoKeywords: '購物須知,運費,退換貨', seoImage: '', extras: {}
    },
    {
      id: 8, slug: 'privacy', menuName: '隱私權政策', title: '隱私權政策', subtitle: 'PRIVACY',
      banner: '', image: '',
      content: '里海寵物僅為完成訂單、會員服務與到貨通知而蒐集您的姓名、聯絡方式與收件地址。資料不會出售給第三人。您可來信要求查閱或刪除個人資料。',
      seoTitle: '隱私權政策 | 里海寵物',
      seoDescription: '里海寵物隱私權政策。',
      seoKeywords: '隱私權', seoImage: '', extras: {}
    },
    {
      id: 9, slug: 'terms', menuName: '會員條款', title: '會員條款', subtitle: 'TERMS',
      banner: '', image: '',
      content: '註冊即表示您同意本站交易、退換貨與會員規範。帳號請自行保管。生鮮與開封食品之退換依購物須知。本條款以中華民國法律為準據法。',
      seoTitle: '會員條款 | 里海寵物',
      seoDescription: '里海寵物會員條款。',
      seoKeywords: '會員條款', seoImage: '', extras: {}
    },
    {
      id: 10, slug: 'subscribe', menuName: '飼養諮詢', title: '飼養諮詢', subtitle: 'CARE DESK',
      banner: '', image: '',
      content: '1. 留下毛孩年齡、體重與目前飲食\n2. 門市顧問會回覆建議份量與轉換方式\n3. 需要時可改約門市當面看糧\n4. 會員可收到到貨與換季保健通知',
      seoTitle: '飼養諮詢 | 里海寵物',
      seoDescription: '貓狗飲食轉換與份量諮詢。',
      seoKeywords: '飼養諮詢,寵物營養', seoImage: '', extras: {}
    }
  ]
}

function defaultMenus() {
  return [
    { id: 1001, location: 'header', name: '商品列表', url: '/products', parentId: 0, sort: 1, visible: true },
    { id: 1002, location: 'header', name: '最新訊息', url: '/blog', parentId: 0, sort: 2, visible: true },
    { id: 1003, location: 'header', name: '關於我們', url: '/about', parentId: 0, sort: 3, visible: true },
    { id: 1004, location: 'header', name: '購物須知', url: '/faq', parentId: 0, sort: 4, visible: true },
    { id: 1005, location: 'header', name: '聯絡我們', url: '/contact', parentId: 0, sort: 5, visible: true },
    { id: 1031, location: 'header', name: '全部商品', url: '/products', parentId: 1001, sort: 1, visible: true },
    { id: 1032, location: 'header', name: '貓貓專區', url: '/products/1', parentId: 1001, sort: 2, visible: true },
    { id: 1033, location: 'header', name: '狗狗專區', url: '/products/2', parentId: 1001, sort: 3, visible: true },
    { id: 1034, location: 'header', name: '營養保健', url: '/products/3', parentId: 1001, sort: 4, visible: true },
    { id: 1035, location: 'header', name: '組合優惠', url: '/products/4', parentId: 1001, sort: 5, visible: true },
    { id: 1036, location: 'header', name: '生活用品', url: '/products/5', parentId: 1001, sort: 6, visible: true },
    { id: 1037, location: 'header', name: '特價專區', url: '/products/6', parentId: 1001, sort: 7, visible: true },
    { id: 1021, location: 'header', name: '全部消息', url: '/blog', parentId: 1002, sort: 1, visible: true },
    { id: 1022, location: 'header', name: '到貨公告', url: '/blog/1', parentId: 1002, sort: 2, visible: true },
    { id: 1023, location: 'header', name: '飼養筆記', url: '/blog/2', parentId: 1002, sort: 3, visible: true },
    { id: 1024, location: 'header', name: '營養知識', url: '/blog/3', parentId: 1002, sort: 4, visible: true },
    { id: 1101, location: 'footer', name: '關於我們', url: '/about', parentId: 0, sort: 1, visible: true },
    { id: 1102, location: 'footer', name: '商品列表', url: '/products', parentId: 0, sort: 2, visible: true },
    { id: 1103, location: 'footer', name: '最新訊息', url: '/blog', parentId: 0, sort: 3, visible: true },
    { id: 1104, location: 'footer', name: '門市據點', url: '/stores', parentId: 0, sort: 4, visible: true },
    { id: 1105, location: 'footer', name: '聯絡我們', url: '/contact', parentId: 0, sort: 5, visible: true },
    { id: 1201, location: 'footer-member', name: '購物車', url: '/cart', parentId: 0, sort: 1, visible: true },
    { id: 1202, location: 'footer-member', name: '會員中心', url: '/member', parentId: 0, sort: 2, visible: true },
    { id: 1203, location: 'footer-member', name: '訂單查詢', url: '/order-lookup', parentId: 0, sort: 3, visible: true },
    { id: 1204, location: 'footer-member', name: '購物須知', url: '/faq', parentId: 0, sort: 4, visible: true },
    { id: 1205, location: 'footer-member', name: '隱私權政策', url: '/privacy', parentId: 0, sort: 5, visible: true }
  ]
}

const HOME_CATS = {
  1: { showOnHome: true, homeSort: 1, homeTitle: '貓貓專區', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80' },
  2: { showOnHome: true, homeSort: 2, homeTitle: '狗狗專區', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80' },
  3: { showOnHome: true, homeSort: 3, homeTitle: '營養保健', image: 'https://images.unsplash.com/photo-1583337130417-13406c109799?auto=format&fit=crop&w=900&q=80' },
  4: { showOnHome: true, homeSort: 4, homeTitle: '組合優惠', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80' },
  5: { showOnHome: true, homeSort: 5, homeTitle: '生活用品', image: 'https://images.unsplash.com/photo-1589924691995-400dc9dec37b?auto=format&fit=crop&w=900&q=80' },
  6: { showOnHome: true, homeSort: 6, homeTitle: '特價專區', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80' }
}

function enrichCategory(c) {
  const extra = HOME_CATS[c.id] || {}
  return {
    ...c,
    menuName: c.menuName || c.name,
    pageTitle: c.pageTitle || c.name,
    pageSubtitle: c.pageSubtitle || '',
    image: c.image || extra.image || '',
    banner: c.banner || '',
    seoTitle: c.seoTitle || c.name,
    seoDescription: c.seoDescription || '',
    seoKeywords: c.seoKeywords || '',
    visible: c.visible !== false,
    sort: c.sort != null ? c.sort : c.id,
    showOnHome: c.showOnHome != null ? !!c.showOnHome : !!extra.showOnHome,
    homeSort: c.homeSort != null ? c.homeSort : extra.homeSort || 0,
    homeTitle: c.homeTitle || extra.homeTitle || c.name
  }
}

function categoryFromBody(b, id) {
  return {
    id,
    slug: b.slug || `cat-${id}`,
    name: b.name || '未命名分類',
    parentId: Number(b.parentId) || 0,
    menuName: b.menuName || b.name || '未命名分類',
    pageTitle: b.pageTitle || b.name || '',
    pageSubtitle: b.pageSubtitle || '',
    image: b.image || '',
    banner: b.banner || '',
    seoTitle: b.seoTitle || b.name || '',
    seoDescription: b.seoDescription || '',
    seoKeywords: b.seoKeywords || '',
    visible: b.visible !== false,
    sort: Number(b.sort) || 0,
    showOnHome: !!b.showOnHome,
    homeSort: Number(b.homeSort) || 0,
    homeTitle: b.homeTitle || b.name || ''
  }
}

function migrate(data) {
  data.site = data.site || {}
  ensure(data.site, 'logo', '/logo.svg')
  ensure(data.site, 'favicon', '/logo.svg')
  ensure(data.site, 'english', 'RIKAI')
  if (!data.site.seo) data.site.seo = defaultSeo(data.site)
  else {
    const d = defaultSeo(data.site)
    Object.keys(d).forEach((k) => ensure(data.site.seo, k, d[k]))
  }
  if (!data.site.home) data.site.home = defaultHome()
  else {
    const d = defaultHome()
    Object.keys(d).forEach((k) => ensure(data.site.home, k, d[k]))
  }
  if (!Array.isArray(data.site.contacts) || !data.site.contacts.length) {
    data.site.contacts = defaultContacts(data.site)
  }
  if (!data.site.shipping || !Array.isArray(data.site.shipping.methods) || !data.site.shipping.methods.length) {
    data.site.shipping = defaultShipping()
  } else {
    ensure(data.site.shipping, 'freeOver', 2000)
  }
  if (!data.site.payment || !Array.isArray(data.site.payment.methods) || !data.site.payment.methods.length) {
    data.site.payment = defaultPayment()
  }
  data.categories = (data.categories || []).map(enrichCategory)
  data.newsCategories = (data.newsCategories || []).map((c) => ({
    ...c,
    menuName: c.menuName || c.name,
    image: c.image || '',
    seoTitle: c.seoTitle || c.name,
    seoDescription: c.seoDescription || '',
    seoKeywords: c.seoKeywords || '',
    visible: c.visible !== false,
    sort: c.sort != null ? c.sort : c.id
  }))
  if (!Array.isArray(data.pages) || !data.pages.length) {
    data.pages = defaultPages()
  } else {
    const have = new Set(data.pages.map((p) => p.slug))
    for (const page of defaultPages()) {
      if (!have.has(page.slug)) data.pages.push(page)
    }
    data.pages = data.pages.map((p) => ({
      banner: '', image: '', content: '', seoTitle: '', seoDescription: '', seoKeywords: '', seoImage: '', extras: {},
      menuName: p.title || p.slug, subtitle: '', ...p
    }))
  }
  if (!Array.isArray(data.menus) || !data.menus.length) data.menus = defaultMenus()
  if (!data.nextId || data.nextId < 3000) data.nextId = 3000
  data.cmsVersion = 3
  return data
}

module.exports = {
  migrate,
  categoryFromBody,
  defaultPages,
  defaultMenus,
  defaultShipping,
  defaultPayment
}
