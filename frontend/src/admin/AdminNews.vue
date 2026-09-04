<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">風格文章</h2>
      <button class="solid-btn" type="button" @click="startNew">新增</button>
    </div>
    <form v-if="isCreate" class="form card inline-create" @submit.prevent="save">
      <input v-model="edit.title" placeholder="標題" required />
      <input v-model.number="edit.categoryId" placeholder="分類 ID" />
      <input v-model="edit.date" placeholder="日期 YYYY-MM-DD" />
      <ImageField v-model="edit.image" placeholder="文章圖片" />
      <input v-model="edit.excerpt" placeholder="摘要" />
      <textarea v-model="edit.content" placeholder="內文"></textarea>
      <button class="solid-btn" type="submit">儲存</button>
      <button type="button" class="ghost-btn" @click="edit=null">取消</button>
    </form>
    <table class="table">
      <tbody>
        <template v-for="n in list" :key="n.id">
          <tr class="item-row" :class="{ on: isRow(n) }" @click="startEdit(n)">
            <td>{{ n.date }}</td>
            <td>{{ n.title }}</td>
            <td>
              <button class="ghost-btn" type="button" @click.stop="startEdit(n)">{{ isRow(n) ? '收合' : '編輯' }}</button>
              <button class="ghost-btn" type="button" @click.stop="remove(n)">刪除</button>
            </td>
          </tr>
          <tr v-if="isRow(n)" class="inline-edit">
            <td colspan="3">
              <form class="form" @submit.prevent="save">
                <input v-model="edit.title" placeholder="標題" required />
                <input v-model.number="edit.categoryId" placeholder="分類 ID" />
                <input v-model="edit.date" placeholder="日期 YYYY-MM-DD" />
                <ImageField v-model="edit.image" placeholder="文章圖片" />
                <input v-model="edit.excerpt" placeholder="摘要" />
                <textarea v-model="edit.content" placeholder="內文"></textarea>
                <button class="solid-btn" type="submit">儲存</button>
                <button type="button" class="ghost-btn" @click="edit=null">取消</button>
              </form>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { api } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const edit = ref(null)
const isCreate = computed(() => !!(edit.value && !edit.value.id))
function isRow(n) { return !!(edit.value && edit.value.id === n.id) }
function startEdit(n) {
  if (isRow(n)) { edit.value = null; return }
  edit.value = { ...n }
}
function startNew() { edit.value = { title: '', excerpt: '', content: '', image: '', categoryId: 6, date: '' } }
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
  if (edit.value && edit.value.id === n.id) edit.value = null
  await load()
}
</script>
