<template>
  <div class="app-shell" :class="{ 'is-admin': isAdmin }">
    <SeoHead />
    <ShopHeader v-if="!isAdmin" />
    <router-view />
    <ShopFooter v-if="!isAdmin" />
    <AuthModal v-if="!isAdmin" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ShopHeader from './components/ShopHeader.vue'
import ShopFooter from './components/ShopFooter.vue'
import AuthModal from './components/AuthModal.vue'
import SeoHead from './components/SeoHead.vue'
import { bootstrap } from './api'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

onMounted(() => {
  bootstrap()
})
</script>
