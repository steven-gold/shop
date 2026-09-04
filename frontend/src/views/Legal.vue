<template>
  <main>
    <PageHero :title="page.title" :subtitle="page.subtitle" :banner="page.banner" />
    <section class="section">
      <div class="wide" style="max-width:760px;line-height:2;white-space:pre-wrap">{{ page.content }}</div>
    </section>
  </main>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { pageBySlug } from '../api'
import PageHero from '../components/PageHero.vue'
const route = useRoute()
const page = computed(() => pageBySlug(route.path.includes('privacy') ? 'privacy' : 'terms'))
</script>
