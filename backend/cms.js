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
    title: `${site.name || '歐若拉公主童裝'} | ${site.english || 'AURORA'}`,
    description: site.aboutLead || 'AURORA 歐若拉公主童裝，台灣專櫃精品童裝。',
    keywords: '童裝,公主禮服,女童,男童,BABY,歐若拉,AURORA',
    ogImage: '',
    ogTitle: ''
  }
}

function defaultHome() {
  return {
    heading: '春夏新品上市',
    subheading: 'Find your style. Spring / Summer 2026 Fashion',
    aboutHeading: '永遠給寶貝最好的',
    aboutScript: "Aurora's Clothing",
    aboutButton: '+ About Us',
    storesButton: '全台櫃位資訊',
    blogHeading: '風格導覽 BLOG',
    blogSubheading: '季節輪換總有新的故事值得期盼'
  }
}

function defaultPages() {
  return [
    {
      id: 1, slug: 'home', menuName: '首頁', title: '歐若拉公主童裝', subtitle: 'AURORA',
      banner: '', image: '', content: '',
      seoTitle: '歐若拉公主童裝 | AURORA',
      seoDescription: 'AURORA 歐若拉公主童裝，台灣專櫃精品童裝。公主禮服、洋裝、男童與 BABY 系列。',
      seoKeywords: '童裝,公主禮服,歐若拉', seoImage: '', extras: {}
    },
    {
      id: 2, slug: 'about', menuName: '關於我們', title: '關於我們', subtitle: 'INTRODUCTION',
      banner: '', image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1400&q=80', content: '',
      seoTitle: '關於我們 | 歐若拉公主童裝',
      seoDescription: '歐若拉創立於 1992 年，台灣專櫃精品童裝。',
      seoKeywords: '關於歐若拉,童裝品牌', seoImage: '',
      extras: {
        storyHeading: '創業過程',
        nameHeading: '品牌命名',
        nameText: '「歐若拉」取極光之意，期許每一位穿上品牌服裝的孩子，都能在自己的舞台上發亮。女童走公主路線，男童走經典紳士，BABY 則把柔軟放在第一位。',
        futureHeading: '品牌未來',
        milestones: [
          { year: '1992', text: '成立女童品牌歐若拉' },
          { year: '1996', text: '成立男童紳士系列' },
          { year: '2004', text: '全台百貨專櫃拓展' }
        ]
      }
    },
    {
      id: 3, slug: 'products', menuName: '產品介紹', title: '產品介紹', subtitle: 'PRODUCT',
      banner: '', image: '', content: '',
      seoTitle: '產品介紹 | 歐若拉公主童裝',
      seoDescription: '瀏覽歐若拉公主禮服、洋裝、上衣、下著與 BABY 系列。',
      seoKeywords: '童裝,公主禮服,洋裝', seoImage: '', extras: {}
    },
    {
      id: 4, slug: 'blog', menuName: '風格導覽 BLOG', title: '風格導覽 BLOG', subtitle: 'STYLE BLOG',
      banner: '', image: '', content: '',
      seoTitle: '風格導覽 | 歐若拉公主童裝',
      seoDescription: '季節輪換總有新的故事值得期盼。',
      seoKeywords: '童裝穿搭,風格導覽', seoImage: '', extras: {}
    },
    {
      id: 5, slug: 'stores', menuName: '服務據點', title: '服務據點', subtitle: 'STORE LOCATIONS',
      banner: '', image: '', content: '',
      seoTitle: '服務據點 | 歐若拉公主童裝',
      seoDescription: '全台百貨專櫃與門市據點。',
      seoKeywords: '童裝專櫃,門市', seoImage: '', extras: {}
    },
    {
      id: 6, slug: 'contact', menuName: '聯絡我們', title: '聯絡我們', subtitle: 'CONTACT',
      banner: '', image: '', content: '',
      seoTitle: '聯絡我們 | 歐若拉公主童裝',
      seoDescription: '歡迎來電或留言，專人為您服務。',
      seoKeywords: '聯絡歐若拉', seoImage: '', extras: {}
    },
    {
      id: 7, slug: 'faq', menuName: '購物須知', title: '購物須知', subtitle: 'FAQ',
      banner: '', image: '', content: '',
      seoTitle: '購物須知 | 歐若拉公主童裝',
      seoDescription: '尺寸、退換貨與洗滌注意事項。',
      seoKeywords: '購物須知,退換貨', seoImage: '', extras: {}
    },
    {
      id: 8, slug: 'privacy', menuName: '隱私權政策', title: '隱私權政策', subtitle: 'PRIVACY',
      banner: '', image: '',
      content: '歐若拉公主童裝僅為完成訂單、會員服務與活動通知而蒐集您的姓名、聯絡方式與收件地址。資料不會出售給第三人。您可隨時來信要求查閱或刪除個人資料。',
      seoTitle: '隱私權政策 | 歐若拉公主童裝',
      seoDescription: '歐若拉公主童裝隱私權政策。',
      seoKeywords: '隱私權', seoImage: '', extras: {}
    },
    {
      id: 9, slug: 'terms', menuName: '會員條款', title: '會員條款', subtitle: 'TERMS',
      banner: '', image: '',
      content: '註冊即表示您同意遵守本站交易、退換貨與會員規範。帳號請妥善保管。特價與高訂商品之退換依專櫃公告為準。本條款以中華民國法律為準據法。',
      seoTitle: '會員條款 | 歐若拉公主童裝',
      seoDescription: '歐若拉公主童裝會員條款。',
      seoKeywords: '會員條款', seoImage: '', extras: {}
    },
    {
      id: 10, slug: 'subscribe', menuName: '童裝訂閱', title: '童裝訂閱', subtitle: 'WARDROBE CLUB',
      banner: '', image: '',
      content: '1. 留下寶貝年齡與聯絡方式\n2. 造型顧問每季寄送 3-5 套穿搭提案\n3. 可到專櫃試穿後再決定留下哪些\n4. 會員可享當季新品優先預覽',
      seoTitle: '童裝訂閱 | 歐若拉公主童裝',
      seoDescription: '每季穿搭提案與新品優先預覽。',
      seoKeywords: '童裝訂閱', seoImage: '', extras: {}
    }
  ]
}

function defaultMenus() {
  return [
    { id: 1001, location: 'header', name: '關於我們', url: '/about', parentId: 0, sort: 1, visible: true },
    { id: 1002, location: 'header', name: '風格導覽 BLOG', url: '/blog', parentId: 0, sort: 2, visible: true },
    { id: 1003, location: 'header', name: '產品介紹', url: '/products', parentId: 0, sort: 3, visible: true },
    { id: 1004, location: 'header', name: '服務據點', url: '/stores', parentId: 0, sort: 4, visible: true },
    { id: 1005, location: 'header', name: '聯絡我們', url: '/contact', parentId: 0, sort: 5, visible: true },
    { id: 1021, location: 'header', name: '所有消息', url: '/blog', parentId: 1002, sort: 1, visible: true },
    { id: 1022, location: 'header', name: '年度設計理念', url: '/blog/10', parentId: 1002, sort: 2, visible: true },
    { id: 1023, location: 'header', name: '浪漫唯美系列', url: '/blog/6', parentId: 1002, sort: 3, visible: true },
    { id: 1024, location: 'header', name: '俏麗公主系列', url: '/blog/4', parentId: 1002, sort: 4, visible: true },
    { id: 1025, location: 'header', name: '經典英倫系列', url: '/blog/5', parentId: 1002, sort: 5, visible: true },
    { id: 1026, location: 'header', name: '韓風流行系列', url: '/blog/7', parentId: 1002, sort: 6, visible: true },
    { id: 1027, location: 'header', name: '居家休閒系列', url: '/blog/8', parentId: 1002, sort: 7, visible: true },
    { id: 1028, location: 'header', name: '率性可愛系列', url: '/blog/9', parentId: 1002, sort: 8, visible: true },
    { id: 1031, location: 'header', name: '所有產品', url: '/products', parentId: 1003, sort: 1, visible: true },
    { id: 1032, location: 'header', name: 'SALE', url: '/products/62', parentId: 1003, sort: 2, visible: true },
    { id: 1033, location: 'header', name: '上衣', url: '/products/1', parentId: 1003, sort: 3, visible: true },
    { id: 1034, location: 'header', name: '下著', url: '/products/2', parentId: 1003, sort: 4, visible: true },
    { id: 1035, location: 'header', name: '洋裝', url: '/products/3', parentId: 1003, sort: 5, visible: true },
    { id: 1036, location: 'header', name: '外套', url: '/products/4', parentId: 1003, sort: 6, visible: true },
    { id: 1037, location: 'header', name: '男童', url: '/products/54', parentId: 1003, sort: 7, visible: true },
    { id: 1038, location: 'header', name: '小童', url: '/products/46', parentId: 1003, sort: 8, visible: true },
    { id: 1039, location: 'header', name: '配件', url: '/products/51', parentId: 1003, sort: 9, visible: true },
    { id: 1101, location: 'footer', name: '關於我們', url: '/about', parentId: 0, sort: 1, visible: true },
    { id: 1102, location: 'footer', name: '風格導覽 BLOG', url: '/blog', parentId: 0, sort: 2, visible: true },
    { id: 1103, location: 'footer', name: '產品介紹', url: '/products', parentId: 0, sort: 3, visible: true },
    { id: 1104, location: 'footer', name: '服務據點', url: '/stores', parentId: 0, sort: 4, visible: true },
    { id: 1105, location: 'footer', name: '聯絡我們', url: '/contact', parentId: 0, sort: 5, visible: true },
    { id: 1201, location: 'footer-member', name: '購物車', url: '/cart', parentId: 0, sort: 1, visible: true },
    { id: 1202, location: 'footer-member', name: '會員中心', url: '/member', parentId: 0, sort: 2, visible: true },
    { id: 1203, location: 'footer-member', name: '購物須知', url: '/faq', parentId: 0, sort: 3, visible: true },
    { id: 1204, location: 'footer-member', name: '隱私權政策', url: '/privacy', parentId: 0, sort: 4, visible: true },
    { id: 1205, location: 'footer-member', name: '童裝訂閱', url: '/subscribe', parentId: 0, sort: 5, visible: true }
  ]
}

const HOME_CATS = {
  61: { showOnHome: true, homeSort: 1, homeTitle: 'BABY / 小童', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80' },
  20: { showOnHome: true, homeSort: 2, homeTitle: '公主禮服', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80' },
  8: { showOnHome: true, homeSort: 3, homeTitle: '長褲', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80' },
  6: { showOnHome: true, homeSort: 4, homeTitle: '短袖上衣', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80' },
  54: { showOnHome: true, homeSort: 5, homeTitle: '男童系列', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80' },
  19: { showOnHome: true, homeSort: 6, homeTitle: '長裙 / 短裙', image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80' }
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
  ensure(data.site, 'logo', '/logo.png')
  ensure(data.site, 'favicon', '/logo.png')
  ensure(data.site, 'english', 'AURORA')
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
  data.cmsVersion = 2
  return data
}

module.exports = { migrate, categoryFromBody, defaultPages, defaultMenus }
