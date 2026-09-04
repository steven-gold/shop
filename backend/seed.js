function img(id, w = 900) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

function createSeed(hashPassword) {
  const now = new Date().toISOString()
  return {
    nextId: 200,
    site: {
      name: '歐若拉公主童裝',
      english: 'AURORA',
      slogan: '讓每一位孩子，都擁有屬於自己的公主時刻',
      phone: '07-350-8800',
      fax: '07-350-8801',
      email: 'hello@aurora-kids.tw',
      address: '高雄市三民區明誠一路 128 號',
      hours: '週一至週日 11:00 - 21:30',
      aboutLead:
        '歐若拉創立於 1992 年，是台灣專櫃精品童裝。我們以蕾絲、網紗與精緻剪裁，為孩子留下可以珍藏的童年衣櫥。',
      story:
        '創辦人在零售業工作多年後，因為兩個女兒對童裝材質與版型極為挑剔，開始自己選布、打版、試穿。市場上當時不是廉價量產，就是進口天價，於是她決定做「合理價位的高品質」。第一間門市開在高雄，女兒們是最初的模特兒。',
      future:
        '我們仍堅持讓孩子一圓公主夢：合理價位、細緻做工、MIT 設計。希望歐若拉成為一支畫筆，彩繪孩子們最美麗的童年。'
    },
    users: [
      {
        id: 1,
        email: 'admin@aurora.tw',
        name: '歐若拉管理員',
        phone: '07-350-8800',
        password: hashPassword('aurora888'),
        role: 'admin',
        createdAt: now
      },
      {
        id: 2,
        email: 'demo@aurora.tw',
        name: '林予安',
        phone: '0912-345-678',
        password: hashPassword('demo123'),
        role: 'member',
        createdAt: now
      }
    ],
    categories: [
      { id: 62, slug: 'sale', name: 'SALE', parentId: 0, countHint: 6 },
      { id: 63, slug: 'new-price', name: '新品魅力價', parentId: 62 },
      { id: 1, slug: 'tops', name: '上衣', parentId: 0 },
      { id: 6, slug: 'short-tops', name: '短袖上衣', parentId: 1 },
      { id: 5, slug: 'long-tops', name: '長袖上衣', parentId: 1 },
      { id: 16, slug: 'shirts', name: '襯衫系列', parentId: 1 },
      { id: 2, slug: 'bottoms', name: '下著', parentId: 0 },
      { id: 7, slug: 'shorts', name: '短褲', parentId: 2 },
      { id: 8, slug: 'pants', name: '長褲', parentId: 2 },
      { id: 19, slug: 'skirts', name: '長裙 / 短裙', parentId: 2 },
      { id: 3, slug: 'dresses', name: '洋裝', parentId: 0 },
      { id: 20, slug: 'gowns', name: '公主禮服', parentId: 3 },
      { id: 10, slug: 'short-dresses', name: '短袖 / 荷葉袖洋裝', parentId: 3 },
      { id: 43, slug: 'sleeveless', name: '無袖洋裝 / 背心裙', parentId: 3 },
      { id: 4, slug: 'outerwear', name: '外套', parentId: 0 },
      { id: 44, slug: 'jackets', name: '小外套', parentId: 4 },
      { id: 54, slug: 'boys', name: '男童', parentId: 0 },
      { id: 58, slug: 'boys-classic', name: '經典紳士系列', parentId: 54 },
      { id: 46, slug: 'baby', name: '小童', parentId: 0 },
      { id: 61, slug: 'baby-all', name: 'BABY / 小童', parentId: 46 },
      { id: 51, slug: 'accessories', name: '配件', parentId: 0 },
      { id: 56, slug: 'dolls', name: '玩偶 / 娃娃衣', parentId: 51 }
    ],
    banners: [
      {
        id: 1,
        title: '春夏新品',
        subtitle: 'Find your style. Spring / Summer 2026',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1800&q=80',
        link: '/products/10',
        button: '立即前往',
        sort: 1
      },
      {
        id: 2,
        title: '精緻雪花蝴蝶結禮服',
        subtitle: '網紗拼接 · 公主袖',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1800&q=80',
        link: '/product/2',
        button: '查看商品',
        sort: 2
      },
      {
        id: 3,
        title: '#奢華蕾絲 高級訂製',
        subtitle: '公主禮服系列',
        image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1800&q=80',
        link: '/products/20',
        button: '立即前往',
        sort: 3
      }
    ],
    products: [
      {
        id: 1,
        sku: '6124',
        name: '滿版鬱金香荷葉領網紗拼接春夏款短袖洋裝 *6124 粉紅',
        categoryId: 10,
        tags: ['sale', 'dresses'],
        price: 3698,
        salePrice: 2219,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '粉紅',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 18,
        featured: true,
        homeCategory: '短袖上衣',
        desc: '鬱金香印花搭荷葉領與裙襬網紗，輕盈透氣，適合春夏外出與家庭聚會。純棉內裡，寶貝穿著整天也不易過敏。'
      },
      {
        id: 2,
        sku: '5106',
        name: '精緻雪花蝴蝶結網紗拼接春夏款公主袖禮服 *5106 白',
        categoryId: 20,
        tags: ['gowns'],
        price: 5740,
        salePrice: 4018,
        sizes: ['8號 120cm', '10號 130cm', '12號 140cm', '14號 150cm'],
        color: '白',
        image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 9,
        featured: true,
        desc: '雪花刺繡與層次網紗堆疊出典禮氣場，腰間蝴蝶結可依身形微調。花童、畢業與音樂會首選。'
      },
      {
        id: 3,
        sku: '3206',
        name: '【高級訂製】愛心蕾絲層次網紗拼接禮服 *3206 白色',
        categoryId: 20,
        tags: ['gowns', 'sale'],
        price: 8400,
        salePrice: 7560,
        sizes: ['10號 130cm', '12號 140cm', '14號 150cm'],
        color: '白',
        image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 4,
        featured: true,
        desc: '高訂工房手工貼蕾絲與愛心網紗層次，前短後長裙襬走起路來有微風。建議專櫃試穿後下訂。'
      },
      {
        id: 4,
        sku: '6322',
        name: '舒適純棉田園草莓蝴蝶結春夏款短袖上衣 *6322 白',
        categoryId: 6,
        tags: ['tops', 'sale'],
        price: 1170,
        salePrice: 702,
        sizes: ['4號 100cm', '6號 110cm', '8號 120cm', '10號 130cm'],
        color: '白',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 32,
        featured: true,
        homeCategory: '短袖上衣',
        desc: '100% 精梳棉，草莓刺繡與小蝴蝶結點綴領口，日常上學與出遊都好搭配。'
      },
      {
        id: 5,
        sku: '6368',
        name: '舒適束口鬆緊條紋抓皺春夏款長褲 *6368 粉紅',
        categoryId: 8,
        tags: ['bottoms'],
        price: 1770,
        salePrice: 1062,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '粉紅',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 21,
        featured: true,
        homeCategory: '長褲',
        desc: '鬆緊腰與束口設計，活動自如。粉紅細條紋帶一點法式氣息。'
      },
      {
        id: 6,
        sku: '6182',
        name: '學院風雙假口袋鬆緊拉鍊春夏款百褶裙 *6182 水藍',
        categoryId: 19,
        tags: ['bottoms'],
        price: 1800,
        salePrice: 1080,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '水藍',
        image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 16,
        featured: true,
        homeCategory: '長裙 / 短裙',
        desc: '挺括百褶與側拉鍊，配白襯衫就是經典學院造型。'
      },
      {
        id: 7,
        sku: '6386',
        name: '格紋領設計紳士 POLO 衫春夏款 *6386 白',
        categoryId: 58,
        tags: ['boys'],
        price: 1640,
        salePrice: 984,
        sizes: ['4號 100cm', '6號 110cm', '8號 120cm', '10號 130cm'],
        color: '白',
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 24,
        featured: true,
        homeCategory: '男童系列',
        desc: '領口格紋拼接，透氣珠地棉，適合 generational 父子裝與正式場合。'
      },
      {
        id: 8,
        sku: '6385',
        name: '純棉帥氣賽車圖案春夏款短袖上衣 *6385 灰',
        categoryId: 58,
        tags: ['boys'],
        price: 870,
        salePrice: 522,
        sizes: ['4號 100cm', '6號 110cm', '8號 120cm', '10號 130cm'],
        color: '灰',
        image: 'https://images.unsplash.com/photo-1503944583220-94d9e0e59b24?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1503944583220-94d9e0e59b24?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 28,
        desc: '賽車印花與柔軟純棉，耐洗耐穿，小男孩衣櫃基本款。'
      },
      {
        id: 9,
        sku: '6104',
        name: '夢幻滿版金蔥蝴蝶結 BABY 無袖禮服 *6104 金',
        categoryId: 61,
        tags: ['baby', 'gowns'],
        price: 3480,
        salePrice: 2436,
        sizes: ['1號 80cm', '2號 90cm', '3號 95cm'],
        color: '金',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 11,
        featured: true,
        homeCategory: 'BABY / 小童',
        desc: '金蔥蝴蝶結滿版印花，內裡純棉，週歲宴與抓週儀式的亮點禮服。'
      },
      {
        id: 10,
        sku: '6522',
        name: '甜美花語蕾絲壓花荷葉袖 BABY 套裝 *6522 粉',
        categoryId: 61,
        tags: ['baby'],
        price: 2480,
        salePrice: 1736,
        sizes: ['1號 80cm', '2號 90cm'],
        color: '粉紅',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 14,
        desc: '上衣加內搭褲兩件式，蕾絲壓花輕柔不扎膚，附同色髮帶。'
      },
      {
        id: 11,
        sku: '5602',
        name: '小香風珍珠扣外套搭公主袖禮服套裝 *5602 米白',
        categoryId: 44,
        tags: ['outerwear', 'gowns'],
        price: 7770,
        salePrice: 5439,
        sizes: ['8號 120cm', '10號 130cm', '12號 140cm'],
        color: '米白',
        image: 'https://images.unsplash.com/photo-1609505848912-b7c0b9005ba5?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1609505848912-b7c0b9005ba5?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 6,
        desc: '混金蔥呢料外套配珍珠扣，內搭公主袖洋裝，秋冬典禮一次到位。'
      },
      {
        id: 12,
        sku: '5810',
        name: '寬鬆保暖連帽秋冬款帽 T *5810 灰',
        categoryId: 44,
        tags: ['outerwear'],
        price: 1990,
        salePrice: 1393,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '灰',
        image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 19,
        desc: '刷毛內裡、落肩剪裁，放學後與假日最常被穿出門的一件。'
      },
      {
        id: 13,
        sku: '6136',
        name: '法式氣質滿版點點娃娃領純棉短袖洋裝 *6136 黑',
        categoryId: 10,
        tags: ['dresses'],
        price: 2970,
        salePrice: 1782,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '黑',
        image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 12,
        desc: '黑底白點與圓潤娃娃領，法式小名媛氣場，卻是純棉透氣。'
      },
      {
        id: 14,
        sku: '6172',
        name: '氣質立體荷葉邊搭蝴蝶領結春夏款短袖襯衫 *6172 白',
        categoryId: 16,
        tags: ['tops'],
        price: 1980,
        salePrice: 1188,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '白',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 20,
        desc: '可拆式領結與立體荷葉，搭配百褶裙就是音樂會與演講的標準穿著。'
      },
      {
        id: 15,
        sku: '6184',
        name: '黑白格紋蕾絲拼接春夏款短裙 *6184 黑',
        categoryId: 19,
        tags: ['bottoms'],
        price: 1740,
        salePrice: 1044,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm'],
        color: '黑',
        image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 15,
        desc: '經典格紋裙襬加一圈蕾絲，英倫與公主兩種氣質同時成立。'
      },
      {
        id: 16,
        sku: '6702',
        name: '運動風舒適棉質娃娃領春夏款洋裝 *6702 藍',
        categoryId: 43,
        tags: ['dresses'],
        price: 2190,
        salePrice: 1314,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '藍',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 17,
        desc: '運動棉的舒適度，娃娃領的精緻感，放假一整天也不想換掉。'
      },
      {
        id: 17,
        sku: 'A018',
        name: '迷你公主禮服 · 同款娃娃衣',
        categoryId: 56,
        tags: ['accessories'],
        price: 890,
        salePrice: 690,
        sizes: ['均碼'],
        color: '粉',
        image: 'https://images.unsplash.com/photo-1558679908-541bcf1249aa?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1558679908-541bcf1249aa?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 30,
        desc: '與當季禮服同布同花，給心愛玩偶一件小小禮服，孩子會愛不釋手。'
      },
      {
        id: 18,
        sku: '6156',
        name: '復古純棉格紋娃娃領腰間綁帶無袖洋裝 *6156 紅',
        categoryId: 43,
        tags: ['dresses'],
        price: 2090,
        salePrice: 1254,
        sizes: ['6號 110cm', '8號 120cm', '10號 130cm', '12號 140cm'],
        color: '紅',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 13,
        desc: '新年紅格紋與腰間蝴蝶結，過年走春與家庭拍照都特別上相。'
      }
    ],
    newsCategories: [
      { id: 10, name: '年度設計理念' },
      { id: 6, name: '浪漫唯美系列' },
      { id: 4, name: '俏麗公主系列' },
      { id: 5, name: '經典英倫系列' },
      { id: 7, name: '韓風流行系列' },
      { id: 8, name: '居家休閒系列' },
      { id: 9, name: '率性可愛系列' }
    ],
    news: [
      {
        id: 22,
        categoryId: 6,
        title: '優雅蕾絲，穿出唯美浪漫感',
        date: '2026-03-12',
        image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1000&q=80',
        excerpt: '蕾絲、網紗等公主元素，散發滿滿甜美氣質仙氣。',
        content:
          '蕾絲從來不是裝飾，而是一種光線的語言。今年春夏我們把法式蕾絲鋪在領口與裙襬，讓走動時出現若隱若現的層次。搭配淺粉與米白，孩子看起來像剛從故事書裡走出來。\\n\\n建議搭配珍珠髮箍與裸膚平底鞋，整體更乾淨。'
      },
      {
        id: 6,
        categoryId: 4,
        title: '俏麗公主，活潑又不失氣質',
        date: '2026-02-18',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80',
        excerpt: '元氣十足的俏麗風格，看起來更輕盈、更有活力。',
        content:
          '公主不一定只穿蓬裙。荷葉袖、草莓刺繡與A字裙擺，讓孩子跑跳時衣服也跟著有節奏。這季色彩更飽和：水藍、櫻桃紅、奶油黃。'
      },
      {
        id: 21,
        categoryId: 5,
        title: '英倫格紋，經典萬年不敗款',
        date: '2025-11-02',
        image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1000&q=80',
        excerpt: '時尚趨勢千變萬化，最經典的格紋始終居於不敗地位。',
        content:
          '格紋是衣櫃裡的時間膠囊。百褶裙、襯衫領與小外套一組，從開學日穿到家族聚餐都得體。我們把格紋比例縮小，更適合兒童肩寬。'
      },
      {
        id: 27,
        categoryId: 10,
        title: '2026 春夏：把花園穿在身上',
        date: '2026-01-08',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80',
        excerpt: '鬱金香、愛麗絲與雪花刺繡，成為本季三條主線。',
        content:
          '主設計師在巴黎看到早春櫥窗後，決定把花園帶進布料。鬱金香印花走浪漫、愛麗絲圖騰走奇想、雪花刺繡走典禮。三條線可以單穿，也可以疊加。'
      },
      {
        id: 28,
        categoryId: 7,
        title: '韓風層次：短版上衣遇上蓬裙',
        date: '2025-12-20',
        image: 'https://images.unsplash.com/photo-1609505848912-b7c0b9005ba5?auto=format&fit=crop&w=1000&q=80',
        excerpt: '短版剪裁與蛋糕裙，做出輕盈的街頭公主感。',
        content:
          '我們把成人街拍的比例縮小到兒童身形：短袖短版、高腰蛋糕裙、運動棉混紡。舒服到可以上課，精緻到可以下午茶。'
      },
      {
        id: 26,
        categoryId: 8,
        title: '居家也可以很講究',
        date: '2025-09-30',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
        excerpt: '柔軟純棉與寬鬆剪裁，把儀式感留在日常。',
        content:
          '童裝最常被穿的其實是家裡。這季居家系列用親膚棉、鬆緊腰與淡色印花，讓睡衣與外出服的界線變得模糊而優雅。'
      }
    ],
    stores: [
      { id: 1, name: '台北忠孝 SOGO 5F', phone: '02-2771-2200', address: '台北市大安區忠孝東路四段 45 號', city: '台北' },
      { id: 2, name: '台北新光三越站前店 8F', phone: '02-2311-3367', address: '台北市中正區忠孝西路一段 66 號', city: '台北' },
      { id: 3, name: '桃園遠東百貨 6F', phone: '03-334-2573', address: '桃園市桃園區中正路 20 號', city: '桃園' },
      { id: 4, name: '新竹巨城遠東 5F', phone: '03-542-8859', address: '新竹市東區中央路 229 號', city: '新竹' },
      { id: 5, name: '台中遠東百貨 5F', phone: '04-2254-4597', address: '台中市西屯區臺灣大道三段 251 號', city: '台中' },
      { id: 6, name: '台南新光三越西門店 3F', phone: '06-303-1608', address: '台南市中西區西門路一段 658 號', city: '台南' },
      { id: 7, name: '高雄漢神巨蛋 6F', phone: '07-552-5903', address: '高雄市左營區博愛二路 777 號', city: '高雄' },
      { id: 8, name: '高雄明誠門市 1F', phone: '07-350-8798', address: '高雄市三民區明誠一路 128 號', city: '高雄' }
    ],
    faqs: [
      { id: 1, q: '尺寸怎麼選？', a: '請以身高為主、胸圍為輔。介於兩號之間建議選大一號，禮服類可至專櫃試穿。' },
      { id: 2, q: '如何退換貨？', a: '商品到貨七天內，吊牌完整且未洗滌可辦理退換。高訂與特價商品依專櫃規定。' },
      { id: 3, q: '是否提供到府？', a: '官網訂單滿 NT$2,000 台灣本島免運。離島運費於結帳頁顯示。' },
      { id: 4, q: '洗滌注意？', a: '蕾絲與網紗建議冷水手洗，不可烘乾。純棉單品可放入洗衣袋輕柔機洗。' }
    ],
    messages: [],
    subscribers: [],
    carts: {},
    orders: [
      {
        id: 1001,
        userId: 2,
        items: [
          { productId: 4, name: '草莓蝴蝶結短袖上衣 *6322 白', size: '6號 110cm', qty: 1, price: 702 }
        ],
        total: 702,
        status: '已出貨',
        receiver: '林予安',
        phone: '0912-345-678',
        address: '台北市大安區復興南路一段 1 號',
        note: '',
        createdAt: now
      }
    ]
  }
}

module.exports = { createSeed, img }
