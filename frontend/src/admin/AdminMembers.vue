<template>
  <div>
    <h2 class="serif">會員</h2>
    <table class="table">
      <tr v-for="u in list" :key="u.id">
        <td>{{ u.name }}</td>
        <td>{{ u.email }}</td>
        <td>{{ u.phone }}</td>
        <td>{{ u.createdAt?.slice(0,10) }}</td>
      </tr>
    </table>
    <h3 class="serif" style="margin-top:32px">訂閱用戶</h3>
    <table class="table">
      <tr v-for="s in subs" :key="s.id">
        <td>{{ s.name }}</td>
        <td>{{ s.email }}</td>
        <td>{{ s.childAge }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
const list = ref([])
const subs = ref([])
onMounted(async () => {
  list.value = await api('/api/admin/members')
  subs.value = await api('/api/admin/subscribers')
})
</script>
