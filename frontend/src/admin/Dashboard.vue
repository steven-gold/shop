<template>
  <div>
    <h2 class="serif">營運總覽</h2>
    <p v-if="err" class="ok">{{ err }}</p>
    <div class="stats" v-if="s">
      <div class="stat"><b>{{ s.products }}</b><span>商品</span></div>
      <div class="stat"><b>{{ s.orders }}</b><span>訂單</span></div>
      <div class="stat"><b>{{ s.members }}</b><span>會員</span></div>
      <div class="stat"><b>{{ money(s.revenue) }}</b><span>營收</span></div>
    </div>
    <p>未讀留言 {{ s?.unread || 0 }} 則</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api, money } from '../api'
const s = ref(null)
const err = ref('')
onMounted(async () => {
  try {
    s.value = await api('/api/admin/stats')
  } catch (e) {
    err.value = e.message
  }
})
</script>
