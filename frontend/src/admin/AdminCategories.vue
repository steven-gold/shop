<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">商品分類 L1 / L2</h2>
      <button class="solid-btn" @click="startNew(0)">新增主分類</button>
    </div>
    <p v-if="err" class="ok">{{ err }}</p>
    <div class="cat-tree">
      <div class="card list">
        <template v-for="p in tree" :key="p.id">
          <button type="button" :class="{ on: edit && edit.id === p.id }" @click="pick(p)">{{ p.menuName || p.name }}</button>
          <button type="button" class="child" v-for="ch in p.children" :key="ch.id" :class="{ on: edit && edit.id === ch.id }" @click="pick(ch)">{{ ch.menuName || ch.name }}</button>
          <button type="button" class="child add" @click="startNew(p.id)">+ 新增子分類</button>
        </template>
      </div>
      <form class="form wide card" v-if="edit" @submit.prevent="save">
        <h3 class="serif">{{ edit.id ? '編輯分類' : '新增分類' }}</h3>
        <select v-model.number="edit.parentId">
          <option :value="0">主分類（L1）</option>
          <option v-for="p in parents" :key="p.id" :value="p.id">隸屬 {{ p.name }}</option>
        </select>
        <input v-model="edit.name" placeholder="分類名稱" required />
        <input v-model="edit.menuName" placeholder="選單顯示名稱" />
        <input v-model="edit.pageTitle" placeholder="頁面主標題 L1" />
        <input v-model="edit.pageSubtitle" placeholder="頁面副標題 L2" />
        <input v-model="edit.slug" placeholder="網址代稱 slug" />
        <input v-model.number="edit.sort" type="number" placeholder="排序" />
        <label>分類展示圖</label>
        <ImageField v-model="edit.image" />
        <label>頁面橫幅</label>
        <ImageField v-model="edit.banner" />
        <input v-model="edit.seoTitle" placeholder="SEO 標題" />
        <textarea v-model="edit.seoDescription" placeholder="SEO Description"></textarea>
        <input v-model="edit.seoKeywords" placeholder="SEO Keywords" />
        <input v-model="edit.homeTitle" placeholder="首頁磁磚標題" />
        <input v-model.number="edit.homeSort" type="number" placeholder="首頁排序" />
        <label><input type="checkbox" v-model="edit.showOnHome" /> 顯示於首頁磁磚</label>
        <label><input type="checkbox" v-model="edit.visible" /> 前台可見</label>
        <div class="toolbar">
          <button class="solid-btn" type="submit">儲存</button>
          <button type="button" class="ghost-btn" v-if="edit.id" @click="remove">刪除</button>
        </div>
        <p v-if="ok" class="ok">已儲存</p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { api, bootstrap, treeCategories } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const edit = ref(null)
const ok = ref(false)
const err = ref('')
const tree = computed(() => treeCategories(list.value))
const parents = computed(() => list.value.filter((c) => !c.parentId))
function blank(parentId) {
  return {
    name: '', menuName: '', pageTitle: '', pageSubtitle: '', slug: '', parentId: parentId || 0,
    image: '', banner: '', seoTitle: '', seoDescription: '', seoKeywords: '',
    visible: true, sort: 0, showOnHome: false, homeSort: 0, homeTitle: ''
  }
}
async function load() {
  list.value = await api('/api/admin/categories')
}
onMounted(async () => {
  try { await load() } catch (e) { err.value = e.message }
})
function pick(c) {
  edit.value = { ...c }
  ok.value = false
}
function startNew(parentId) {
  edit.value = blank(parentId)
  ok.value = false
}
async function save() {
  err.value = ''
  ok.value = false
  const method = edit.value.id ? 'PUT' : 'POST'
  const path = edit.value.id ? `/api/admin/categories/${edit.value.id}` : '/api/admin/categories'
  edit.value = await api(path, { method, body: JSON.stringify(edit.value) })
  await load()
  await bootstrap()
  ok.value = true
}
async function remove() {
  if (!confirm('確定刪除此分類？')) return
  await api(`/api/admin/categories/${edit.value.id}`, { method: 'DELETE' })
  edit.value = null
  await load()
  await bootstrap()
}
</script>
