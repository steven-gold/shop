<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">服務據點</h2>
      <button class="solid-btn" type="button" @click="startNew">新增</button>
    </div>
    <form v-if="isCreate" class="form card inline-create" @submit.prevent="save">
      <input v-model="edit.name" placeholder="名稱" required />
      <input v-model="edit.city" placeholder="城市" />
      <input v-model="edit.phone" placeholder="電話" />
      <input v-model="edit.address" placeholder="地址" />
      <button class="solid-btn" type="submit">儲存</button>
      <button type="button" class="ghost-btn" @click="edit=null">取消</button>
    </form>
    <table class="table">
      <tbody>
        <template v-for="s in list" :key="s.id">
          <tr class="item-row" :class="{ on: isRow(s) }" @click="startEdit(s)">
            <td>{{ s.name }}</td>
            <td>{{ s.address }}</td>
            <td>{{ s.phone }}</td>
            <td>
              <button class="ghost-btn" type="button" @click.stop="startEdit(s)">{{ isRow(s) ? '收合' : '編輯' }}</button>
              <button class="ghost-btn" type="button" @click.stop="remove(s)">刪除</button>
            </td>
          </tr>
          <tr v-if="isRow(s)" class="inline-edit">
            <td colspan="4">
              <form class="form" @submit.prevent="save">
                <input v-model="edit.name" placeholder="名稱" required />
                <input v-model="edit.city" placeholder="城市" />
                <input v-model="edit.phone" placeholder="電話" />
                <input v-model="edit.address" placeholder="地址" />
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
const list = ref([])
const edit = ref(null)
const isCreate = computed(() => !!(edit.value && !edit.value.id))
function isRow(s) { return !!(edit.value && edit.value.id === s.id) }
function startEdit(s) {
  if (isRow(s)) { edit.value = null; return }
  edit.value = { ...s }
}
function startNew() { edit.value = { name: '', phone: '', address: '', city: '' } }
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
  if (edit.value && edit.value.id === s.id) edit.value = null
  await load()
}
</script>
