<template>
  <div>
    <h2 class="serif">聯絡留言</h2>
    <article class="card" v-for="m in list" :key="m.id" style="margin-bottom:12px">
      <b>{{ m.name }}</b>　{{ m.email }}　{{ m.phone }}
      <p>{{ m.subject }}</p>
      <p>{{ m.content }}</p>
      <button v-if="!m.read" class="ghost-btn" @click="read(m)">標為已讀</button>
    </article>
    <p v-if="!list.length">目前沒有留言</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
const list = ref([])
onMounted(async () => { list.value = await api('/api/admin/messages') })
async function read(m) {
  await api(`/api/admin/messages/${m.id}/read`, { method: 'PUT' })
  m.read = true
}
</script>
