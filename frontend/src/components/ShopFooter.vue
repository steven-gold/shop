<template>
  <footer class="site">
    <div class="wide cols">
      <div>
        <div class="logo">
          <img v-if="state.site?.logo" :src="state.site.logo" alt="" class="logo-mark invert" />
          <span class="word">
            <strong>{{ state.site?.english || 'AURORA' }}</strong>
            <span>{{ state.site?.name || '歐若拉公主童裝' }}</span>
          </span>
        </div>
        <p>{{ state.site?.slogan }}</p>
        <p v-for="c in contacts.slice(0, 3)" :key="c.id">{{ c.label }} {{ c.value }}</p>
      </div>
      <div>
        <h4>SITE MAP</h4>
        <router-link v-for="m in footerMenus" :key="m.id" :to="m.url">{{ m.name }}<br /></router-link>
      </div>
      <div>
        <h4>MEMBER</h4>
        <router-link v-for="m in memberMenus" :key="m.id" :to="m.url">{{ m.name }}<br /></router-link>
      </div>
      <div>
        <h4>STYLE BLOG</h4>
        <p>{{ state.site?.home?.blogSubheading || '季節輪換總有新的故事值得期盼，穿搭靈感這裡找。' }}</p>
        <router-link to="/blog" class="ghost-btn" style="margin-top:12px">view all</router-link>
      </div>
    </div>
    <div class="wide copy">
      Copyright © 2026 {{ state.site?.name || '歐若拉公主童裝' }} {{ state.site?.english || 'AURORA' }} — All Rights Reserved.
      <router-link to="/admin" class="admin-entry">管理後台</router-link>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { state, menusAt } from '../api'

const contacts = computed(() => (state.site?.contacts || []).slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)))
const footerMenus = computed(() => {
  const list = menusAt('footer')
  return list.length ? list : [
    { id: 1, name: '關於我們', url: '/about' },
    { id: 2, name: '風格導覽 BLOG', url: '/blog' },
    { id: 3, name: '產品介紹', url: '/products' },
    { id: 4, name: '服務據點', url: '/stores' },
    { id: 5, name: '聯絡我們', url: '/contact' }
  ]
})
const memberMenus = computed(() => {
  const list = menusAt('footer-member')
  return list.length ? list : [
    { id: 1, name: '購物車', url: '/cart' },
    { id: 2, name: '會員中心', url: '/member' },
    { id: 3, name: '購物須知', url: '/faq' },
    { id: 4, name: '隱私權政策', url: '/privacy' },
    { id: 5, name: '童裝訂閱', url: '/subscribe' }
  ]
})
</script>
