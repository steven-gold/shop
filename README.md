# 里海寵物 RIKAI

寵物食品與用品電商展示站。品牌、商品與文案皆為原創示範資料。

## 前台

- 首頁輪播、分類、精選商品、品牌故事、最新訊息
- 商品列表 / 詳情、會員註冊登入、購物車與結帳
- 結帳可選超商取貨、寄送到府、門市自取，運費計入應付金額
- 付款可選線上付款、信用卡、貨到付款（金流為示範）
- 訂單查詢、門市、聯絡表單、飼養諮詢、購物須知
- 頁首選單、頁面標題、聯絡資訊、SEO 由後台 CMS 控制

## 後台 `/admin`

打開 `/admin` 即顯示登入表單。登入後可管理：

- 商品、商品分類（L1/L2 標題、選單名、展示圖、SEO）
- 導覽選單、頁面內容與分頁 SEO
- 訂單（狀態、出貨方式；改出貨方式會重算運費與應付金額）
- 文章、輪播、門市、留言、會員
- 網站設定（品牌、聯絡欄位、首頁文案、出貨運費、付款方式、全站 SEO）
- 圖片上傳（Logo、橫幅、分類圖、商品圖）

## 示範帳號

前台會員：`demo@rikai.tw` / `demo123`

後台管理員：`admin@rikai.tw` / `rikai888`

## 啟動

```bash
# 安裝後端依賴
cd backend
npm install
node server.js

# 另開終端安裝前端依賴
cd frontend
npm install
npm run dev
```

前端開發伺服器會把 `/api` 與 `/uploads` 轉發到 `http://127.0.0.1:3001`。

## 上線（GitHub + Vercel + Neon）

程式已推到 https://github.com/steven-gold/shop 。本機沒有 `DATABASE_URL` 時仍使用 `backend/data.json`。

1. 到 [Neon](https://console.neon.tech/) 新建專案，複製 Connection string（`postgresql://...`）
2. 到 [Vercel](https://vercel.com/new) Import `steven-gold/shop`
3. 在 Vercel 專案 Environment Variables 新增：

```
DATABASE_URL=postgresql://...你的 Neon 連線字串
JWT_SECRET=自訂一串隨機密鑰
```

4. Deploy。首次 API 會自動建立資料表並寫入示範商品。若既有資料的 cmsVersion 小於 3，啟動時會重塞本版示範資料。

示範帳號與本機相同。
