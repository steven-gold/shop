<template>
  <main>
    <PageHero :title="page.title || '購物須知'" :subtitle="page.subtitle || 'FAQ'" :banner="page.banner" />
    <section class="section">
      <div class="wide" style="max-width:760px">
        <div v-if="page.content" style="white-space:pre-wrap;line-height:1.9;margin-bottom:28px">{{ page.content }}</div>
        <article v-for="f in list" :key="f.id" style="margin-bottom:28px">
          <h3 class="serif">{{ f.q }}</h3>
          <p style="line-height:1.9;color:var(--ink-soft)">{{ f.a }}</p>
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
const page = computed(() => pageBySlug('faq'))
onMounted(async () => { list.value = await api('/api/faqs') })
</script>
