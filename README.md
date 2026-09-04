# AURORA 歐若拉公主童裝

參考台灣專櫃童裝官網結構打造的前後台電商展示站。品牌為原創，商品與文案為示範資料。

## 前台

- 首頁輪播、分類馬賽克、品牌故事、風格 BLOG
- 商品列表 / 詳情、會員註冊登入、購物車與結帳
- 據點、聯絡表單、訂閱、購物須知
- 頁首選單、頁面標題、聯絡資訊、SEO 由後台 CMS 控制

## 後台 `/admin`

打開 `/admin` 即顯示登入表單。登入後可管理：

- 商品、商品分類（L1/L2 標題、選單名、展示圖、SEO）
- 導覽選單、頁面內容與分頁 SEO
- 訂單、文章、輪播、據點、留言、會員
- 網站設定（品牌、可自訂聯絡欄位、首頁文案、全站 SEO）
- 圖片上傳（Logo、橫幅、分類圖、商品圖）

## 示範帳號

前台會員：`demo@aurora.tw` / `demo123`

後台管理員：`admin@aurora.tw` / `aurora888`

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

4. Deploy。首次 API 會自動建立資料表並寫入示範商品。

示範帳號與本機相同。
