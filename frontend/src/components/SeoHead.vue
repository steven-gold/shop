<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { applySeo, pageBySlug, state } from '../api'

const route = useRoute()

function run() {
  const path = route.path
  if (path.startsWith('/admin')) {
    document.title = '後台 | ' + (state.site?.name || 'AURORA')
    return
  }
  const catId = Number(route.params.category || 0)
  if (path.startsWith('/products') && catId) {
    const cat = (state.categories || []).find((c) => c.id === catId)
    if (cat) {
      applySeo({
        title: cat.pageTitle || cat.name,
        seoTitle: cat.seoTitle || cat.pageTitle || cat.name,
        seoDescription: cat.seoDescription,
        seoKeywords: cat.seoKeywords,
        seoImage: cat.banner || cat.image
      })
      return
    }
  }
  let slug = 'home'
  if (path.startsWith('/about')) slug = 'about'
  else if (path.startsWith('/products') || path.startsWith('/product')) slug = 'products'
  else if (path.startsWith('/blog') || path.startsWith('/article')) slug = 'blog'
  else if (path.startsWith('/stores')) slug = 'stores'
  else if (path.startsWith('/contact')) slug = 'contact'
  else if (path.startsWith('/faq')) slug = 'faq'
  else if (path.startsWith('/privacy')) slug = 'privacy'
  else if (path.startsWith('/terms')) slug = 'terms'
  else if (path.startsWith('/subscribe')) slug = 'subscribe'
  else if (path === '/') slug = 'home'
  applySeo(pageBySlug(slug))
}

watch(() => [route.fullPath, state.pages, state.site, state.categories], run, { immediate: true, deep: true })
</script>
<template>
  <span class="seo-head" aria-hidden="true"></span>
</template>
