<template>
  <div class="admin-login-wrap" v-if="!authed">
    <form class="form card admin-login-card" @submit.prevent="login">
      <h1 class="serif" style="text-align:center;margin:0">AURORA 後台</h1>
      <p class="hint">請使用管理員帳號登入。打開本頁即可進入後台。</p>
      <p v-if="state.user && state.user.role !== 'admin'" class="ok">目前是會員帳號，請改用管理員登入。</p>
      <input v-model="email" type="email" placeholder="帳號" autocomplete="username" />
      <input v-model="password" type="password" placeholder="密碼" autocomplete="current-password" />
      <button class="solid-btn" type="submit">登入後台</button>
      <p v-if="err" class="ok">{{ err }}</p>
      <p class="hint">admin@aurora.tw / aurora888</p>
      <router-link to="/" class="ghost-btn" style="text-align:center">回前台</router-link>
    </form>
  </div>
  <div class="admin" v-else>
    <aside class="aside">
      <div class="brand">AURORA</div>
      <router-link to="/admin">總覽</router-link>
      <router-link to="/admin/products">商品</router-link>
      <router-link to="/admin/categories">商品分類</router-link>
      <router-link to="/admin/menus">導覽選單</router-link>
      <router-link to="/admin/pages">頁面 / SEO</router-link>
      <router-link to="/admin/orders">訂單</router-link>
      <router-link to="/admin/news">風格文章</router-link>
      <router-link to="/admin/banners">首頁輪播</router-link>
      <router-link to="/admin/stores">服務據點</router-link>
      <router-link to="/admin/messages">聯絡留言</router-link>
      <router-link to="/admin/members">會員</router-link>
      <router-link to="/admin/settings">網站設定</router-link>
      <button class="ghost-btn aside-out" type="button" @click="out">登出</button>
      <router-link to="/" style="margin-top:8px">回前台</router-link>
    </aside>
    <div class="admin-main">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, logout, setSession, state } from '../api'

const router = useRouter()
const authed = computed(() => !!(state.token && state.user && state.user.role === 'admin'))
const email = ref('admin@aurora.tw')
const password = ref('aurora888')
const err = ref('')

async function login() {
  err.value = ''
  try {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (data.user.role !== 'admin') {
      err.value = '此帳號沒有後台權限'
      return
    }
    setSession(data.token, data.user)
    router.replace('/admin')
  } catch (e) {
    err.value = e.message
  }
}

function out() {
  logout()
  router.replace('/admin')
}
</script>
