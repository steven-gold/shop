<template>
  <main v-if="n">
    <div class="page-hero">
      <div class="crumb">BLOG / {{ n.categoryName }}</div>
      <h1>{{ n.title }}</h1>
      <p>{{ n.date }}</p>
    </div>
    <section class="section">
      <div class="wide" style="max-width:800px">
        <img :src="n.image" :alt="n.title" style="width:100%;height:420px;object-fit:cover;margin-bottom:32px" />
        <p v-for="(para, i) in paras" :key="i" style="line-height:2">{{ para }}</p>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api'
const route = useRoute()
const n = ref(null)
const paras = computed(() => (n.value?.content || '').split(/\n+/).filter(Boolean))
watch(() => route.params.id, async () => {
  n.value = await api(`/api/news/${route.params.id}`)
}, { immediate: true })
</script>
