<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">商品分類 L1 / L2</h2>
      <button class="solid-btn" type="button" @click="startNew(0)">新增主分類</button>
    </div>
    <p class="hint">點擊分類名稱，編輯欄位會出現在該項目下方。</p>
    <p v-if="err" class="ok">{{ err }}</p>
    <form class="form wide card inline-create" v-if="isNewRoot" @submit.prevent="save">
      <h3 class="serif">新增分類</h3>
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
        <button type="button" class="ghost-btn" @click="edit=null">取消</button>
      </div>
    </form>
    <div class="item-list card" style="padding:0">
      <div class="item-block" v-for="row in rows" :key="row.key">
        <button type="button" class="item-hit" :class="[row.cls, { on: isOpen(row) }]" @click="activate(row)">{{ row.label }}</button>
        <form class="form wide inline-panel" v-if="isOpen(row) && edit" @submit.prevent="save">
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
            <button type="button" class="ghost-btn" @click="edit=null">取消</button>
          </div>
          <p v-if="ok" class="ok">已儲存</p>
        </form>
      </div>
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
const parents = computed(() => list.value.filter((c) => !c.parentId && (!edit.value || c.id !== edit.value.id)))
const isNewRoot = computed(() => !!(edit.value && !edit.value.id && !edit.value.parentId))
const rows = computed(() => {
  const out = []
  for (const p of tree.value) {
    out.push({ key: 'c' + p.id, kind: 'cat', item: p, parentId: 0, label: p.menuName || p.name, cls: '' })
    for (const ch of p.children || []) {
      out.push({ key: 'c' + ch.id, kind: 'cat', item: ch, parentId: p.id, label: ch.menuName || ch.name, cls: 'child' })
    }
    out.push({ key: 'add' + p.id, kind: 'add', parentId: p.id, label: '+ 新增子分類', cls: 'child add' })
  }
  return out
})
function blank(parentId) {
  return {
    name: '', menuName: '', pageTitle: '', pageSubtitle: '', slug: '', parentId: parentId || 0,
    image: '', banner: '', seoTitle: '', seoDescription: '', seoKeywords: '',
    visible: true, sort: 0, showOnHome: false, homeSort: 0, homeTitle: ''
  }
}
function isOpen(row) {
  if (!edit.value) return false
  if (row.kind === 'cat') return edit.value.id === row.item.id
  return !edit.value.id && edit.value.parentId === row.parentId
}
function activate(row) {
  if (row.kind === 'add') {
    if (edit.value && !edit.value.id && edit.value.parentId === row.parentId) {
      edit.value = null
      return
    }
    startNew(row.parentId)
    return
  }
  pick(row.item)
}
async function load() {
  list.value = await api('/api/admin/categories')
}
onMounted(async () => {
  try { await load() } catch (e) { err.value = e.message }
})
function pick(c) {
  if (edit.value && edit.value.id === c.id) {
    edit.value = null
    return
  }
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
