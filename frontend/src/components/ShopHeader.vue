<template>
  <header class="site-header solid">
    <div class="wide bar">
      <button class="icon-btn hamburger" @click="mobile = true">☰</button>
      <router-link to="/" class="logo">
        <img v-if="state.site?.logo" :src="state.site.logo" :alt="state.site?.name" class="logo-mark" />
        <span class="word">
          <strong>{{ state.site?.english || 'AURORA' }}</strong>
          <span>{{ state.site?.name || '歐若拉公主童裝' }}</span>
        </span>
      </router-link>
      <nav class="desk">
        <div class="item" v-for="m in headerMenus" :key="m.id">
          <router-link class="top" :to="m.url">{{ m.name }}</router-link>
          <div class="mega" v-if="m.children.length" :style="m.children.length > 8 ? 'min-width:260px' : ''">
            <router-link v-for="ch in m.children" :key="ch.id" :to="ch.url">{{ ch.name }}</router-link>
          </div>
        </div>
      </nav>
      <div class="icons">
        <button class="icon-btn" title="搜尋" @click="$router.push('/search')">Search</button>
        <button class="icon-btn" title="會員" @click="openMember">Me</button>
        <button class="icon-btn" title="購物車" @click="openCart">
          Bag
          <i class="badge" v-if="state.cartCount">{{ state.cartCount }}</i>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" v-if="mobile">
    <button class="icon-btn" @click="mobile = false">✕</button>
    <template v-for="m in headerMenus" :key="m.id">
      <router-link :to="m.url" @click="mobile=false">{{ m.name }}</router-link>
      <router-link v-for="ch in m.children" :key="ch.id" :to="ch.url" class="child" @click="mobile=false">{{ ch.name }}</router-link>
    </template>
    <router-link to="/subscribe" @click="mobile=false">童裝訂閱</router-link>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { state, menusAt, treeCategories } from '../api'

const router = useRouter()
const mobile = ref(false)

const fallback = computed(() => {
  const cats = treeCategories()
  return [
    { id: 'about', name: '關於我們', url: '/about', children: [] },
    {
      id: 'blog',
      name: '風格導覽 BLOG',
      url: '/blog',
      children: [
        { id: 'blog-all', name: '所有消息', url: '/blog' },
        ...(state.newsCategories || []).map((c) => ({ id: 'nc' + c.id, name: c.menuName || c.name, url: '/blog/' + c.id }))
      ]
    },
    {
      id: 'products',
      name: '產品介紹',
      url: '/products',
      children: [
        { id: 'p-all', name: '所有產品', url: '/products' },
        ...cats.map((c) => ({ id: 'c' + c.id, name: c.menuName || c.name, url: '/products/' + c.id }))
      ]
    },
    { id: 'stores', name: '服務據點', url: '/stores', children: [] },
    { id: 'contact', name: '聯絡我們', url: '/contact', children: [] }
  ]
})

const headerMenus = computed(() => {
  const list = menusAt('header')
  return list.length ? list : fallback.value
})

function openMember() {
  if (state.user) router.push('/member')
  else {
    state.authMode = 'login'
    state.authOpen = true
  }
}
function openCart() {
  if (!state.user) {
    state.authMode = 'login'
    state.authOpen = true
    return
  }
  router.push('/cart')
}
</script>
