<template>
  <div>
    <h2 class="serif">首頁輪播</h2>
    <p v-if="err" class="ok">{{ err }}</p>
    <div class="card" v-for="b in list" :key="b.id" style="margin-bottom:16px">
      <form class="form wide" @submit.prevent="save(b)">
        <ImageField v-model="b.image" />
        <input v-model="b.title" placeholder="標題" />
        <input v-model="b.subtitle" placeholder="副標" />
        <input v-model="b.button" placeholder="按鈕文字" />
        <input v-model="b.link" placeholder="連結" />
        <button class="solid-btn" type="submit">儲存</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
import ImageField from '../components/ImageField.vue'
const list = ref([])
const err = ref('')
onMounted(async () => {
  try { list.value = await api('/api/admin/banners') } catch (e) { err.value = e.message }
})
async function save(b) {
  await api(`/api/admin/banners/${b.id}`, { method: 'PUT', body: JSON.stringify(b) })
}
</script>
