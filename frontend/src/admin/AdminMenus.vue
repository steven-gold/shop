<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">導覽選單</h2>
      <button class="solid-btn" @click="edit = blank()">新增項目</button>
    </div>
    <p class="hint">可分別編輯頁首、頁尾與會員區連結名稱。子選單請選擇上層項目。</p>
    <p v-if="err" class="ok">{{ err }}</p>
    <table class="table">
      <thead><tr><th>位置</th><th>名稱</th><th>連結</th><th>上層</th><th>排序</th><th></th></tr></thead>
      <tbody>
        <tr v-for="m in list" :key="m.id">
          <td>{{ locLabel(m.location) }}</td>
          <td>{{ m.name }}</td>
          <td>{{ m.url }}</td>
          <td>{{ parentName(m.parentId) }}</td>
          <td>{{ m.sort }}</td>
          <td>
            <button class="ghost-btn" @click="edit = { ...m }">編輯</button>
            <button class="ghost-btn" @click="remove(m)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form class="form wide card" v-if="edit" style="margin-top:20px" @submit.prevent="save">
      <select v-model="edit.location">
        <option value="header">頁首選單</option>
        <option value="footer">頁尾 SITE MAP</option>
        <option value="footer-member">頁尾 MEMBER</option>
      </select>
      <select v-model.number="edit.parentId">
        <option :value="0">無上層（主選單）</option>
        <option v-for="m in parents" :key="m.id" :value="m.id">{{ m.name }}</option>
      </select>
      <input v-model="edit.name" placeholder="選單顯示名稱" required />
      <input v-model="edit.url" placeholder="連結，如 /about 或 /products/20" required />
      <input v-model.number="edit.sort" type="number" placeholder="排序" />
      <label><input type="checkbox" v-model="edit.visible" /> 顯示</label>
      <div class="toolbar">
        <button class="solid-btn" type="submit">儲存</button>
        <button type="button" class="ghost-btn" @click="edit=null">取消</button>
      </div>
      <p v-if="ok" class="ok">已儲存</p>
    </form>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { api, bootstrap } from '../api'
const list = ref([])
const edit = ref(null)
const ok = ref(false)
const err = ref('')
const parents = computed(() => list.value.filter((m) => !m.parentId && (!edit.value || m.id !== edit.value.id)))
function locLabel(v) {
  return { header: '頁首', footer: '頁尾', 'footer-member': '會員區' }[v] || v
}
function parentName(id) {
  const m = list.value.find((x) => x.id === id)
  return m ? m.name : '—'
}
function blank() {
  return { location: 'header', name: '', url: '/', parentId: 0, sort: 0, visible: true }
}
async function load() { list.value = await api('/api/admin/menus') }
onMounted(async () => {
  try { await load() } catch (e) { err.value = e.message }
})
async function save() {
  err.value = ''
  ok.value = false
  const method = edit.value.id ? 'PUT' : 'POST'
  const path = edit.value.id ? `/api/admin/menus/${edit.value.id}` : '/api/admin/menus'
  await api(path, { method, body: JSON.stringify(edit.value) })
  edit.value = null
  await load()
  await bootstrap()
  ok.value = true
}
async function remove(m) {
  if (!confirm('確定刪除此選單？')) return
  await api(`/api/admin/menus/${m.id}`, { method: 'DELETE' })
  await load()
  await bootstrap()
}
</script>
