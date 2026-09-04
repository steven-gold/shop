<template>
  <div>
    <h2 class="serif">頁面內容 / SEO</h2>
    <p class="hint">每個前台頁面可設定主標題、副標題、橫幅圖、內文與獨立 SEO。</p>
    <p v-if="err" class="ok">{{ err }}</p>
    <div class="tabs">
      <button class="ghost-btn" v-for="p in list" :key="p.id" :class="{ on: edit && edit.id === p.id }" @click="pick(p)">{{ p.menuName || p.title }}</button>
    </div>
    <form class="form wide card" v-if="edit" @submit.prevent="save">
      <input v-model="edit.menuName" placeholder="選單／內部名稱" />
      <input v-model="edit.title" placeholder="頁面主標題 L1" />
      <input v-model="edit.subtitle" placeholder="頁面副標題 L2（英文）" />
      <label>頁面橫幅</label>
      <ImageField v-model="edit.banner" />
      <label>頁面圖片</label>
      <ImageField v-model="edit.image" />
      <textarea v-model="edit.content" placeholder="頁面內文"></textarea>
      <template v-if="edit.slug === 'about'">
        <input v-model="edit.extras.storyHeading" placeholder="創業過程標題" />
        <input v-model="edit.extras.nameHeading" placeholder="品牌命名標題" />
        <textarea v-model="edit.extras.nameText" placeholder="品牌命名內文"></textarea>
        <input v-model="edit.extras.futureHeading" placeholder="品牌未來標題" />
        <div class="contact-row" v-for="(m, i) in (edit.extras.milestones || [])" :key="i">
          <input v-model="m.year" placeholder="年份" />
          <input v-model="m.text" placeholder="里程碑說明" />
        </div>
      </template>
      <h3 class="serif">SEO</h3>
      <input v-model="edit.seoTitle" placeholder="SEO 標題" />
      <textarea v-model="edit.seoDescription" placeholder="SEO Description"></textarea>
      <input v-model="edit.seoKeywords" placeholder="SEO Keywords" />
      <label>SEO / OG 圖片</label>
      <ImageField v-model="edit.seoImage" />
      <button class="solid-btn" type="submit">儲存此頁</button>
      <p v-if="ok" class="ok">已儲存</p>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api, bootstrap } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const edit = ref(null)
const ok = ref(false)
const err = ref('')
async function load() { list.value = await api('/api/admin/pages') }
onMounted(async () => {
  try {
    await load()
    if (list.value[0]) pick(list.value[0])
  } catch (e) { err.value = e.message }
})
function pick(p) {
  edit.value = { extras: {}, ...p, extras: { milestones: [], ...(p.extras || {}) } }
  ok.value = false
}
async function save() {
  err.value = ''
  ok.value = false
  const saved = await api(`/api/admin/pages/${edit.value.id}`, { method: 'PUT', body: JSON.stringify(edit.value) })
  pick(saved)
  await load()
  await bootstrap()
  ok.value = true
}
</script>
