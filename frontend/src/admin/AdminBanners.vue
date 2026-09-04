<template>
  <div>
    <h2 class="serif">首頁輪播</h2>
    <p class="hint">點擊輪播項目，編輯欄位會出現在該項目下方。</p>
    <p v-if="err" class="ok">{{ err }}</p>
    <div class="item-list card" style="padding:0">
      <div class="item-block" v-for="b in list" :key="b.id">
        <button type="button" class="item-hit" :class="{ on: openId === b.id }" @click="toggle(b)">{{ b.title || ('輪播 ' + b.id) }}</button>
        <form class="form wide inline-panel" v-if="openId === b.id" @submit.prevent="save(b)">
          <ImageField v-model="b.image" />
          <input v-model="b.title" placeholder="標題" />
          <input v-model="b.subtitle" placeholder="副標" />
          <input v-model="b.button" placeholder="按鈕文字" />
          <input v-model="b.link" placeholder="連結" />
          <button class="solid-btn" type="submit">儲存</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const openId = ref(0)
const err = ref('')
onMounted(async () => {
  try { list.value = await api('/api/admin/banners') } catch (e) { err.value = e.message }
})
function toggle(b) {
  openId.value = openId.value === b.id ? 0 : b.id
}
async function save(b) {
  await api(`/api/admin/banners/${b.id}`, { method: 'PUT', body: JSON.stringify(b) })
}
</script>
