<template>
  <div>
    <h2 class="serif">網站設定</h2>
    <div class="tabs">
      <button class="ghost-btn" :class="{ on: tab==='brand' }" @click="tab='brand'">品牌</button>
      <button class="ghost-btn" :class="{ on: tab==='contact' }" @click="tab='contact'">聯絡資訊</button>
      <button class="ghost-btn" :class="{ on: tab==='home' }" @click="tab='home'">首頁文案</button>
        <button class="ghost-btn" :class="{ on: tab==='ship' }" @click="tab='ship'">出貨與付款</button>
        <button class="ghost-btn" :class="{ on: tab==='seo' }" @click="tab='seo'">全站 SEO</button>
    </div>
    <p v-if="err" class="ok">{{ err }}</p>
    <form class="form wide card" v-if="site" @submit.prevent="save">
      <template v-if="tab==='brand'">
        <input v-model="site.name" placeholder="品牌中文名" />
        <input v-model="site.english" placeholder="品牌英文名" />
        <input v-model="site.slogan" placeholder="標語" />
        <label>Logo</label>
        <ImageField v-model="site.logo" placeholder="Logo 圖片" />
        <label>Favicon</label>
        <ImageField v-model="site.favicon" placeholder="Favicon" />
        <textarea v-model="site.aboutLead" placeholder="品牌簡介"></textarea>
        <textarea v-model="site.story" placeholder="創業過程"></textarea>
        <textarea v-model="site.future" placeholder="品牌未來"></textarea>
      </template>
      <template v-else-if="tab==='contact'">
        <p class="hint">可新增電話、傳真、Email、地址、營業時間或自訂欄位，前台聯絡頁與頁尾會同步顯示。</p>
        <div class="contact-row" v-for="(c, i) in site.contacts" :key="c.id || i">
          <input v-model="c.label" placeholder="欄位名稱，如 電話" />
          <input v-model="c.value" placeholder="內容" />
          <input v-model="c.href" placeholder="連結（選填）" />
          <input v-model.number="c.sort" type="number" placeholder="排序" />
          <button type="button" class="ghost-btn" @click="site.contacts.splice(i,1)">移除</button>
        </div>
        <button type="button" class="ghost-btn" @click="addContact">新增欄位</button>
      </template>
      <template v-else-if="tab==='home'">
        <input v-model="site.home.heading" placeholder="首頁區塊標題（L1）" />
        <input v-model="site.home.subheading" placeholder="首頁區塊副標（L2）" />
        <input v-model="site.home.aboutScript" placeholder="品牌區英文手寫" />
        <input v-model="site.home.aboutHeading" placeholder="品牌區標題" />
        <input v-model="site.home.aboutButton" placeholder="關於我們按鈕文字" />
        <input v-model="site.home.storesButton" placeholder="據點按鈕文字" />
        <input v-model="site.home.blogHeading" placeholder="BLOG 標題" />
        <input v-model="site.home.blogSubheading" placeholder="BLOG 副標" />
      </template>
      <template v-else-if="tab==='ship'">
        <p class="hint">運費會加進結帳應付金額。滿額免運不套用在門市自取（自取本來就是 0）。線上付款與刷卡為示範，不會真的請款。</p>
        <input v-model.number="site.shipping.freeOver" type="number" placeholder="滿額免運門檻，0 表示不啟用" />
        <h3 class="serif">出貨方式</h3>
        <div class="contact-row" v-for="(m, i) in site.shipping.methods" :key="m.id || i">
          <input v-model="m.name" placeholder="名稱，如 超商取貨" />
          <input v-model.number="m.fee" type="number" placeholder="運費" />
          <input v-model="m.hint" placeholder="說明" />
          <label><input type="checkbox" v-model="m.enabled" /> 啟用</label>
        </div>
        <h3 class="serif">付款方式</h3>
        <div class="contact-row" v-for="(m, i) in site.payment.methods" :key="m.id || i">
          <input v-model="m.name" placeholder="名稱，如 貨到付款" />
          <input v-model="m.hint" placeholder="說明" />
          <label><input type="checkbox" v-model="m.enabled" /> 啟用</label>
        </div>
      </template>
      <template v-else>
        <input v-model="site.seo.title" placeholder="預設網頁標題" />
        <textarea v-model="site.seo.description" placeholder="預設 Description"></textarea>
        <input v-model="site.seo.keywords" placeholder="預設 Keywords" />
        <input v-model="site.seo.ogTitle" placeholder="OG Title" />
        <label>OG 圖片</label>
        <ImageField v-model="site.seo.ogImage" placeholder="社群分享圖" />
      </template>
      <button class="solid-btn" type="submit">儲存</button>
      <p v-if="ok" class="ok">已儲存</p>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api, applyFavicon, bootstrap, state } from '../api'
import ImageField from '../components/ImageField.vue'
const site = ref(null)
const tab = ref('brand')
const ok = ref(false)
const err = ref('')
onMounted(async () => {
  try {
    site.value = await api('/api/site')
    site.value.contacts = site.value.contacts || []
    site.value.seo = site.value.seo || {}
    site.value.home = site.value.home || {}
    site.value.shipping = site.value.shipping || { freeOver: 2000, methods: [] }
    site.value.payment = site.value.payment || { methods: [] }
    if (!site.value.shipping.methods) site.value.shipping.methods = []
    if (!site.value.payment.methods) site.value.payment.methods = []
  } catch (e) { err.value = e.message }
})
function addContact() {
  site.value.contacts.push({ id: Date.now(), type: 'custom', label: '', value: '', href: '', sort: site.value.contacts.length + 1 })
}
async function save() {
  err.value = ''
  ok.value = false
  try {
    state.site = await api('/api/admin/site', { method: 'PUT', body: JSON.stringify(site.value) })
    applyFavicon()
    await bootstrap()
    ok.value = true
  } catch (e) { err.value = e.message }
}
</script>
