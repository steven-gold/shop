<template>
  <main>
    <PageHero :title="page.title || '風格導覽 BLOG'" :subtitle="page.subtitle || 'STYLE BLOG'" crumb="HOME / 風格導覽" :banner="page.banner" />
    <div class="wide layout-2">
      <aside class="side">
        <router-link to="/blog" :class="{ active: !route.params.category }">所有消息</router-link>
        <router-link v-for="c in cats" :key="c.id" :to="`/blog/${c.id}`" :class="{ active: Number(route.params.category) === c.id }">{{ c.menuName || c.name }}</router-link>
      </aside>
      <div class="blog-grid" style="grid-template-columns:1fr 1fr">
        <router-link class="blog-card" v-for="n in items" :key="n.id" :to="`/article/${n.id}`">
          <img :src="n.image" :alt="n.title" />
          <div class="date">{{ n.date }}</div>
          <h3>{{ n.title }}</h3>
          <p>{{ n.excerpt }}</p>
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api, pageBySlug } from '../api'
import PageHero from '../components/PageHero.vue'
const route = useRoute()
const cats = ref([])
const items = ref([])
const page = computed(() => pageBySlug('blog'))
watch(() => route.params.category, async () => {
  const data = await api(`/api/news?category=${route.params.category || ''}`)
  cats.value = data.categories
  items.value = data.items
}, { immediate: true })
</script>
