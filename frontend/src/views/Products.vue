<template>
  <main>
    <PageHero :title="title" :subtitle="subtitle" crumb="HOME / 產品介紹" :banner="banner" />
    <div class="wide layout-2">
      <aside class="side">
        <div class="parent">產品分類</div>
        <router-link to="/products" :class="{ active: !route.params.category }">所有產品</router-link>
        <template v-for="c in tree" :key="c.id">
          <router-link :to="`/products/${c.id}`" class="parent" :class="{ active: Number(route.params.category) === c.id }">{{ c.menuName || c.name }}</router-link>
          <router-link v-for="ch in c.children" :key="ch.id" class="child" :to="`/products/${ch.id}`" :class="{ active: Number(route.params.category) === ch.id }">{{ ch.menuName || ch.name }}</router-link>
        </template>
      </aside>
      <div>
        <div class="toolbar">
          <span>共 {{ total }} 件</span>
          <select v-model="sort" @change="load">
            <option value="">最新上架</option>
            <option value="price-asc">價格低到高</option>
            <option value="price-desc">價格高到低</option>
          </select>
        </div>
        <div class="product-grid">
          <ProductCard v-for="p in items" :key="p.id" :p="p" />
        </div>
        <div style="display:flex;gap:8px;margin-top:28px;justify-content:center">
          <button v-for="n in pages" :key="n" class="ghost-btn" :style="{ background: n===page ? 'var(--ink)' : '', color: n===page ? '#fff' : '' }" @click="page=n; load()">{{ n }}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import PageHero from '../components/PageHero.vue'
import { api, pageBySlug, treeCategories } from '../api'

const route = useRoute()
const items = ref([])
const total = ref(0)
const page = ref(1)
const sort = ref('')
const tree = computed(() => treeCategories())
const currentCat = computed(() => {
  const id = Number(route.params.category || 0)
  return tree.value.flatMap((c) => [c, ...c.children]).find((c) => c.id === id)
})
const cmsPage = computed(() => pageBySlug('products'))
const title = computed(() => currentCat.value?.pageTitle || currentCat.value?.name || cmsPage.value.title || '產品介紹')
const subtitle = computed(() => currentCat.value?.pageSubtitle || cmsPage.value.subtitle || 'PRODUCT')
const banner = computed(() => currentCat.value?.banner || cmsPage.value.banner || '')
const pages = computed(() => {
  const n = Math.ceil(total.value / 12) || 1
  return Array.from({ length: n }, (_, i) => i + 1)
})

async function load() {
  const category = route.params.category || ''
  const data = await api(`/api/products?category=${category}&page=${page.value}&sort=${sort.value}`)
  items.value = data.items
  total.value = data.total
}
watch(() => route.params.category, () => { page.value = 1; load() }, { immediate: true })
</script>
