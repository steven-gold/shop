<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">服務據點</h2>
      <button class="solid-btn" @click="edit = { name: '', phone: '', address: '', city: '' }">新增</button>
    </div>
    <table class="table">
      <tr v-for="s in list" :key="s.id">
        <td>{{ s.name }}</td>
        <td>{{ s.address }}</td>
        <td>{{ s.phone }}</td>
        <td>
          <button class="ghost-btn" @click="edit = { ...s }">編輯</button>
          <button class="ghost-btn" @click="remove(s)">刪除</button>
        </td>
      </tr>
    </table>
    <form v-if="edit" class="form card" style="margin-top:20px" @submit.prevent="save">
      <input v-model="edit.name" placeholder="名稱" required />
      <input v-model="edit.city" placeholder="城市" />
      <input v-model="edit.phone" placeholder="電話" />
      <input v-model="edit.address" placeholder="地址" />
      <button class="solid-btn" type="submit">儲存</button>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
const list = ref([])
const edit = ref(null)
async function load() { list.value = await api('/api/admin/stores') }
onMounted(load)
async function save() {
  const method = edit.value.id ? 'PUT' : 'POST'
  const path = edit.value.id ? `/api/admin/stores/${edit.value.id}` : '/api/admin/stores'
  await api(path, { method, body: JSON.stringify(edit.value) })
  edit.value = null
  await load()
}
async function remove(s) {
  await api(`/api/admin/stores/${s.id}`, { method: 'DELETE' })
  await load()
}
</script>
