<template>
  <div>
    <div class="toolbar">
      <h2 class="serif">商品管理</h2>
      <button class="solid-btn" type="button" @click="startNew">新增商品</button>
    </div>
    <form v-if="isCreate" class="form card inline-create" @submit.prevent="save">
      <input v-model="edit.name" placeholder="名稱" required />
      <input v-model="edit.sku" placeholder="貨號" />
      <input v-model.number="edit.categoryId" placeholder="分類 ID" />
      <input v-model.number="edit.price" placeholder="原價" type="number" />
      <input v-model.number="edit.salePrice" placeholder="售價" type="number" />
      <input v-model.number="edit.stock" placeholder="庫存" type="number" />
      <input v-model="edit.color" placeholder="顏色" />
      <input v-model="edit.sizes" placeholder="尺寸，逗號分隔" />
      <ImageField v-model="edit.image" placeholder="商品圖片" />
      <textarea v-model="edit.desc" placeholder="介紹"></textarea>
      <label><input type="checkbox" v-model="edit.featured" /> 精選</label>
      <button class="solid-btn" type="submit">儲存</button>
      <button type="button" class="ghost-btn" @click="edit=null">取消</button>
    </form>
    <table class="table">
      <thead><tr><th>圖</th><th>名稱</th><th>售價</th><th>庫存</th><th></th></tr></thead>
      <tbody>
        <template v-for="p in list" :key="p.id">
          <tr class="item-row" :class="{ on: isRow(p) }" @click="startEdit(p)">
            <td><img :src="p.image" style="width:48px;height:60px;object-fit:cover" /></td>
            <td>{{ p.name }}</td>
            <td>{{ money(p.salePrice) }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <button class="ghost-btn" type="button" @click.stop="startEdit(p)">{{ isRow(p) ? '收合' : '編輯' }}</button>
              <button class="ghost-btn" type="button" @click.stop="remove(p)">刪除</button>
            </td>
          </tr>
          <tr v-if="isRow(p)" class="inline-edit">
            <td colspan="5">
              <form class="form" @submit.prevent="save">
                <input v-model="edit.name" placeholder="名稱" required />
                <input v-model="edit.sku" placeholder="貨號" />
                <input v-model.number="edit.categoryId" placeholder="分類 ID" />
                <input v-model.number="edit.price" placeholder="原價" type="number" />
                <input v-model.number="edit.salePrice" placeholder="售價" type="number" />
                <input v-model.number="edit.stock" placeholder="庫存" type="number" />
                <input v-model="edit.color" placeholder="顏色" />
                <input v-model="edit.sizes" placeholder="尺寸，逗號分隔" />
                <ImageField v-model="edit.image" placeholder="商品圖片" />
                <textarea v-model="edit.desc" placeholder="介紹"></textarea>
                <label><input type="checkbox" v-model="edit.featured" /> 精選</label>
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
import { api, money } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const edit = ref(null)
const blank = () => ({ name: '', sku: '', categoryId: 3, price: 0, salePrice: 0, stock: 0, color: '', sizes: '', image: '', desc: '', featured: false })
const isCreate = computed(() => !!(edit.value && !edit.value.id))
function isRow(p) { return !!(edit.value && edit.value.id === p.id) }
function startEdit(p) {
  if (isRow(p)) { edit.value = null; return }
  edit.value = { ...p, sizes: (p.sizes || []).join(', ') }
}
function startNew() { edit.value = blank() }
async function load() { list.value = await api('/api/admin/products') }
onMounted(load)
async function save() {
  const method = edit.value.id ? 'PUT' : 'POST'
  const path = edit.value.id ? `/api/admin/products/${edit.value.id}` : '/api/admin/products'
  await api(path, { method, body: JSON.stringify(edit.value) })
  edit.value = null
  await load()
}
async function remove(p) {
  if (!confirm('確定刪除？')) return
  await api(`/api/admin/products/${p.id}`, { method: 'DELETE' })
  if (edit.value && edit.value.id === p.id) edit.value = null
  await load()
}
</script>
