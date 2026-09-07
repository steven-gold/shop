function createSeed(hashPassword) {
  const now = new Date().toISOString()
  return {
    nextId: 200,
    site: {
      name: '里海寵物',
      english: 'RIKAI',
      slogan: '給毛孩真正需要的日常營養',
      phone: '07-556-2200',
      fax: '07-556-2201',
      email: 'hello@rikai.tw',
      address: '高雄市左營區崇德路 88 號',
      hours: '週一至週日 11:00 - 21:00',
      logo: '/logo.svg',
      favicon: '/logo.svg',
      aboutLead:
        '里海寵物做貓狗日常飲食與用品。我們把成分、份量與回購節奏講清楚，讓飼主不必在一堆標語裡猜。',
      story:
        '創辦人養了兩隻挑嘴的貓與一隻腸胃敏感的狗，發現市面上要嘛只有廣告詞，要嘛份量建議寫得很含糊。於是先在高雄做諮詢與小量進口，再把賣得好、退得少的品項留在架上。門市可以當面看糧、秤重，官網則用同一套庫存出貨。',
      future:
        '接下來會把保健線依年齡與體態拆得更細，並讓門市自取、超商取貨與宅配的庫存同步。我們仍堅持：先講清楚再成交。'
    },
    users: [
      {
        id: 1,
        email: 'admin@rikai.tw',
        name: '里海管理員',
        phone: '07-556-2200',
        password: hashPassword('rikai888'),
        role: 'admin',
        createdAt: now
      },
      {
        id: 2,
        email: 'demo@rikai.tw',
        name: '陳予安',
        phone: '0912-345-678',
        password: hashPassword('demo123'),
        role: 'member',
        createdAt: now
      }
    ],
    categories: [
      { id: 1, slug: 'cats', name: '貓貓專區', parentId: 0 },
      { id: 11, slug: 'cat-wet', name: '主食罐 / 鮮食', parentId: 1 },
      { id: 12, slug: 'cat-kibble', name: '乾糧', parentId: 1 },
      { id: 13, slug: 'cat-treats', name: '零食', parentId: 1 },
      { id: 2, slug: 'dogs', name: '狗狗專區', parentId: 0 },
      { id: 21, slug: 'dog-wet', name: '主食 / 鮮食', parentId: 2 },
      { id: 22, slug: 'dog-kibble', name: '乾糧', parentId: 2 },
      { id: 23, slug: 'dog-treats', name: '零食', parentId: 2 },
      { id: 3, slug: 'nutrition', name: '營養保健', parentId: 0 },
      { id: 31, slug: 'gut', name: '腸胃保健', parentId: 3 },
      { id: 32, slug: 'joint', name: '關節保健', parentId: 3 },
      { id: 33, slug: 'skin', name: '皮膚保健', parentId: 3 },
      { id: 4, slug: 'bundles', name: '組合優惠', parentId: 0 },
      { id: 5, slug: 'supplies', name: '生活用品', parentId: 0 },
      { id: 51, slug: 'clean', name: '清潔', parentId: 5 },
      { id: 52, slug: 'outdoor', name: '外出', parentId: 5 },
      { id: 6, slug: 'sale', name: '特價專區', parentId: 0 }
    ],
    banners: [
      {
        id: 1,
        title: '貓主食週',
        subtitle: '主食罐買 12 送 2，至門市或官網結帳',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1800&q=80',
        link: '/products/11',
        button: '看貓主食',
        sort: 1
      },
      {
        id: 2,
        title: '狗日常乾糧',
        subtitle: '份量對了，便便與精神都會說話',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1800&q=80',
        link: '/products/22',
        button: '看狗乾糧',
        sort: 2
      },
      {
        id: 3,
        title: '換季保健',
        subtitle: '腸胃、關節、皮膚三條線，依體態選',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=80',
        link: '/products/3',
        button: '看保健',
        sort: 3
      }
    ],
    products: [
      {
        id: 1,
        sku: 'RK-C110',
        name: '里海貓主食罐 雞肉南瓜 80g',
        categoryId: 11,
        tags: ['cats', 'sale'],
        price: 85,
        salePrice: 72,
        sizes: ['單罐 80g', '一箱 24 入'],
        color: '雞肉南瓜',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 120,
        featured: true,
        homeCategory: '貓貓專區',
        desc: '以雞肉與南瓜做成的日常主食罐，水分足夠、肉塊看得見。挑嘴貓可先從單罐試口，再改一箱。'
      },
      {
        id: 2,
        sku: 'RK-C112',
        name: '里海貓主食罐 鯖魚昆布 80g',
        categoryId: 11,
        tags: ['cats'],
        price: 88,
        salePrice: 88,
        sizes: ['單罐 80g', '一箱 24 入'],
        color: '鯖魚昆布',
        image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 96,
        featured: true,
        desc: '鯖魚主食罐，湯汁清、魚肉成塊。適合已經在吃濕食、想輪替蛋白質來源的貓。'
      },
      {
        id: 3,
        sku: 'RK-C210',
        name: '里海成貓乾糧 雞肉 1.5kg',
        categoryId: 12,
        tags: ['cats'],
        price: 780,
        salePrice: 680,
        sizes: ['1.5kg', '4kg'],
        color: '雞肉',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 40,
        featured: true,
        desc: '顆粒偏小，適合成貓維持體態。建議依體重換算每日克數，可與主食罐混餵。'
      },
      {
        id: 4,
        sku: 'RK-C310',
        name: '凍乾雞胸丁 貓零食 50g',
        categoryId: 13,
        tags: ['cats', 'sale'],
        price: 280,
        salePrice: 239,
        sizes: ['50g', '100g'],
        color: '原味雞胸',
        image: 'https://images.unsplash.com/photo-1495360010541-13dde6876e73?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1495360010541-13dde6876e73?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 64,
        featured: false,
        desc: '單一肉源凍乾，訓練與吃藥都好用。開封後請密封、盡快吃完。'
      },
      {
        id: 5,
        sku: 'RK-D110',
        name: '里海狗鮮食 牛肉地瓜 100g',
        categoryId: 21,
        tags: ['dogs'],
        price: 95,
        salePrice: 95,
        sizes: ['單包 100g', '一箱 20 入'],
        color: '牛肉地瓜',
        image: 'https://images.unsplash.com/photo-1587300003388-59208caa690e?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1587300003388-59208caa690e?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 80,
        featured: true,
        desc: '熟食真空包，隔水加熱即可。腸胃敏感的狗可先從半包開始換糧。'
      },
      {
        id: 6,
        sku: 'RK-D210',
        name: '里海成犬乾糧 羊肉 2kg',
        categoryId: 22,
        tags: ['dogs'],
        price: 980,
        salePrice: 860,
        sizes: ['2kg', '6kg'],
        color: '羊肉',
        image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 36,
        featured: true,
        desc: '羊肉配方，適合成犬日常。建議固定碗數，兩週看一次腰身再調整。'
      },
      {
        id: 7,
        sku: 'RK-D212',
        name: '里海幼犬乾糧 雞肉 1.5kg',
        categoryId: 22,
        tags: ['dogs'],
        price: 720,
        salePrice: 720,
        sizes: ['1.5kg'],
        color: '雞肉',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 28,
        featured: false,
        desc: '幼犬顆粒與鈣磷比另外調整。滿十個月可再換成成犬配方。'
      },
      {
        id: 8,
        sku: 'RK-D310',
        name: '潔牙牛皮捲 狗零食 5 入',
        categoryId: 23,
        tags: ['dogs', 'sale'],
        price: 220,
        salePrice: 168,
        sizes: ['5 入'],
        color: '原味',
        image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 50,
        featured: false,
        desc: '陪伴啃咬用，請依體型選擇並在旁看著。牙齒不好的高齡犬請改用潔牙點心。'
      },
      {
        id: 9,
        sku: 'RK-N110',
        name: '腸胃益生菌粉 30 包',
        categoryId: 31,
        tags: ['nutrition'],
        price: 680,
        salePrice: 620,
        sizes: ['30 包'],
        color: '原味',
        image: 'https://images.unsplash.com/photo-1583337130417-13406c109799?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1583337130417-13406c109799?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 44,
        featured: true,
        desc: '換糧、外出或軟便時可拌入主食。貓狗皆可，請依體重看包裝建議。'
      },
      {
        id: 10,
        sku: 'RK-N210',
        name: '關節 Mobil 嚼錠 60 錠',
        categoryId: 32,
        tags: ['nutrition'],
        price: 1280,
        salePrice: 1180,
        sizes: ['60 錠'],
        color: '雞肉味',
        image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 32,
        featured: false,
        desc: '中大型成犬與高齡犬常用。可當點心餵，建議連續兩個月再評估活動力。'
      },
      {
        id: 11,
        sku: 'RK-N310',
        name: '皮膚魚油膠囊 90 粒',
        categoryId: 33,
        tags: ['nutrition'],
        price: 890,
        salePrice: 790,
        sizes: ['90 粒'],
        color: '',
        image: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 38,
        featured: false,
        desc: '換季掉毛、皮膚乾癢時可搭配主食。刺膠囊拌飼料即可。'
      },
      {
        id: 12,
        sku: 'RK-B010',
        name: '貓主食入門箱 雞肉 12 罐',
        categoryId: 4,
        tags: ['bundles', 'sale'],
        price: 1020,
        salePrice: 799,
        sizes: ['12 罐'],
        color: '雞肉南瓜',
        image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 22,
        featured: true,
        desc: '第一次改濕食的組合：12 罐同口味，方便觀察便便與接受度。'
      },
      {
        id: 13,
        sku: 'RK-B020',
        name: '狗鮮食週配箱 牛肉 14 包',
        categoryId: 4,
        tags: ['bundles'],
        price: 1330,
        salePrice: 1180,
        sizes: ['14 包'],
        color: '牛肉地瓜',
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 18,
        featured: false,
        desc: '一週份鮮食，適合中型犬當主餐或拌乾糧。到貨請冷藏，三天內吃完已開封包。'
      },
      {
        id: 14,
        sku: 'RK-S110',
        name: '益生菌貓砂 6L',
        categoryId: 51,
        tags: ['supplies'],
        price: 420,
        salePrice: 389,
        sizes: ['6L'],
        color: '原味',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 48,
        featured: false,
        desc: '結團快、粉塵低。建議每盆先鋪 8 公分，每天鏟。'
      },
      {
        id: 15,
        sku: 'RK-S210',
        name: '雙扣外出牽繩 150cm',
        categoryId: 52,
        tags: ['supplies'],
        price: 560,
        salePrice: 560,
        sizes: ['S', 'M', 'L'],
        color: '橄欖綠',
        image: 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 26,
        featured: false,
        desc: '雙手把與雙扣設計，適合中小型犬散步。尺寸請量胸圍後再下單。'
      },
      {
        id: 16,
        sku: 'RK-S220',
        name: '可摺疊外出碗 兩件組',
        categoryId: 52,
        tags: ['supplies', 'sale'],
        price: 320,
        salePrice: 249,
        sizes: ['兩件組'],
        color: '沙色',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9dec37b?auto=format&fit=crop&w=900&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1589924691995-400dc9dec37b?auto=format&fit=crop&w=900&q=80'
        ],
        stock: 40,
        featured: false,
        desc: '矽膠摺疊碗，掛在牽繩上。貓狗外出喝水、餵零食都方便。'
      }
    ],
    newsCategories: [
      { id: 1, name: '到貨公告' },
      { id: 2, name: '飼養筆記' },
      { id: 3, name: '營養知識' }
    ],
    news: [
      {
        id: 22,
        categoryId: 1,
        title: '貓主食罐雞肉南瓜補貨，本週滿箱再送 2',
        date: '2026-09-01',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
        excerpt: '缺貨三週的雞肉南瓜主食罐已到倉，官網與三間門市同步開賣。',
        content:
          '雞肉南瓜 80g 已補貨。單罐與 24 入箱都可下單。買一箱（24 入）門市或官網結帳現送 2 罐，送完為止。\n\n超商取貨與宅配都可，生鮮鮮食請改寄送到府或自取。'
      },
      {
        id: 6,
        categoryId: 2,
        title: '換糧七天：先混、再看便便',
        date: '2026-08-18',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=80',
        excerpt: '突然換成新主食，最常見的是軟便與拒食。用七天混餵就夠了。',
        content:
          '第 1-2 天新糧 25%，第 3-4 天 50%，第 5-6 天 75%，第 7 天全換。便便成形、精神正常再加量。幼貓幼犬或腸胃敏感，把時程拉到十天。'
      },
      {
        id: 21,
        categoryId: 3,
        title: '魚油不是愈多愈好',
        date: '2026-07-22',
        image: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=1000&q=80',
        excerpt: '換季掉毛可以補，已經在吃含魚油主食就先算總量。',
        content:
          '先看主食標示的 EPA/DHA，再決定要不要加膠囊。過量會影響凝血與腸胃。不確定份量，把包裝拍照傳到門市或留言給我們。'
      },
      {
        id: 27,
        categoryId: 2,
        title: '門市自取怎麼約',
        date: '2026-06-30',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=80',
        excerpt: '官網選門市自取，當日 15:00 前的訂單可當日傍晚取。',
        content:
          '結帳選「門市自取」並指定台北內湖、台中西屯或高雄左營。備貨完成會簡訊通知。請帶下單手機號碼，現場不另收運費。'
      },
      {
        id: 28,
        categoryId: 3,
        title: '益生菌該什麼時候給',
        date: '2026-05-12',
        image: 'https://images.unsplash.com/photo-1583337130417-13406c109799?auto=format&fit=crop&w=1000&q=80',
        excerpt: '軟便、換糧、看病吃藥這三段最有感。',
        content:
          '健康成貓成犬不必天天吃。出現軟便、剛換主食、或剛結束抗生素時，連吃 7-14 天再停。持續超過兩週請先看獸醫。'
      },
      {
        id: 26,
        categoryId: 1,
        title: '左營門市週日延長至 21:00',
        date: '2026-04-08',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80',
        excerpt: '下班後來得及秤糧、問份量。',
        content:
          '高雄左營崇德路門市週日改為 11:00-21:00，與平日相同。內湖與西屯維持 20:30 閉店。'
      }
    ],
    stores: [
      { id: 1, name: '台北內湖門市', phone: '02-2790-2200', address: '台北市內湖區瑞光路 358 號 1 樓', city: '台北' },
      { id: 2, name: '台中西屯門市', phone: '04-2461-8800', address: '台中市西屯區河南路二段 280 號', city: '台中' },
      { id: 3, name: '高雄左營門市', phone: '07-556-2200', address: '高雄市左營區崇德路 88 號', city: '高雄' }
    ],
    faqs: [
      { id: 1, q: '有哪些出貨方式？', a: '超商取貨、寄送到府、門市自取。運費由後台設定，滿 NT$2,000 台灣本島免運（門市自取本來就是 NT$0）。生鮮鮮食建議宅配或自取。' },
      { id: 2, q: '可以怎麼付款？', a: '線上付款、信用卡、貨到付款。本站為示範環境，線上付款與刷卡不會真的請款，下單後訂單會進入待出貨。' },
      { id: 3, q: '如何退換貨？', a: '未開封乾糧、用品到貨七天內可辦理。生鮮、主食罐開封、保健開封後不退。請先聯絡門市或留言。' },
      { id: 4, q: '沒有會員可以查訂單嗎？', a: '可以。到「訂單查詢」輸入訂單編號與下單電話即可。' }
    ],
    messages: [],
    subscribers: [],
    carts: {},
    orders: [
      {
        id: 1001,
        orderNo: 'RK202609071001',
        userId: 2,
        items: [
          { productId: 1, name: '里海貓主食罐 雞肉南瓜 80g', size: '一箱 24 入', qty: 1, price: 72 }
        ],
        subtotal: 72,
        shippingMethod: 'home',
        shippingLabel: '寄送到府',
        shippingFee: 120,
        paymentMethod: 'cod',
        paymentLabel: '貨到付款',
        storeBrand: '',
        storeName: '',
        total: 192,
        status: '已出貨',
        receiver: '陳予安',
        phone: '0912-345-678',
        address: '台北市大安區復興南路一段 1 號',
        note: '',
        createdAt: now
      }
    ]
  }
}

module.exports = { createSeed }
