<template>
  <main>
    <PageHero :title="page.title || '服務據點'" :subtitle="page.subtitle || 'STORE LOCATIONS'" crumb="HOME / 服務據點" :banner="page.banner" />
    <section class="section">
      <div class="wide" v-if="page.content" style="max-width:760px;margin-bottom:32px;white-space:pre-wrap;line-height:1.9">{{ page.content }}</div>
      <div class="wide" style="display:grid;grid-template-columns:repeat(2,1fr);gap:18px">
        <article class="card" v-for="s in list" :key="s.id">
          <h3 class="serif" style="margin:0 0 8px;font-size:24px">{{ s.name }}</h3>
          <p>{{ s.address }}</p>
          <p>{{ s.phone }}</p>
          <a class="ghost-btn" :href="'https://www.google.com/maps/search/' + encodeURIComponent(s.address)" target="_blank">開啟地圖</a>
        </article>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { api, pageBySlug } from '../api'
import PageHero from '../components/PageHero.vue'
const list = ref([])
const page = computed(() => pageBySlug('stores'))
onMounted(async () => { list.value = await api('/api/stores') })
</script>
