<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">風格文章</h2>
      <button class="solid-btn" @click="edit = { title: '', excerpt: '', content: '', image: '', categoryId: 6, date: '' }">新增</button>
    </div>
    <table class="table">
      <tr v-for="n in list" :key="n.id">
        <td>{{ n.date }}</td>
        <td>{{ n.title }}</td>
        <td>
          <button class="ghost-btn" @click="edit = { ...n }">編輯</button>
          <button class="ghost-btn" @click="remove(n)">刪除</button>
        </td>
      </tr>
    </table>
    <form v-if="edit" class="form card" style="margin-top:20px" @submit.prevent="save">
      <input v-model="edit.title" placeholder="標題" required />
      <input v-model.number="edit.categoryId" placeholder="分類 ID" />
      <input v-model="edit.date" placeholder="日期 YYYY-MM-DD" />
      <ImageField v-model="edit.image" placeholder="文章圖片" />
      <input v-model="edit.excerpt" placeholder="摘要" />
      <textarea v-model="edit.content" placeholder="內文"></textarea>
      <button class="solid-btn" type="submit">儲存</button>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const edit = ref(null)
async function load() { list.value = await api('/api/admin/news') }
onMounted(load)
async function save() {
  const method = edit.value.id ? 'PUT' : 'POST'
  const path = edit.value.id ? `/api/admin/news/${edit.value.id}` : '/api/admin/news'
  await api(path, { method, body: JSON.stringify(edit.value) })
  edit.value = null
  await load()
}
async function remove(n) {
  if (!confirm('確定刪除？')) return
  await api(`/api/admin/news/${n.id}`, { method: 'DELETE' })
  await load()
}
</script>
