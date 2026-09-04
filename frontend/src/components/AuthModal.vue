<template>
  <div class="modal-mask" v-if="state.authOpen" @click.self="state.authOpen = false">
    <div class="modal">
      <h3>{{ title }}</h3>
      <p v-if="err" class="ok">{{ err }}</p>
      <form class="form" @submit.prevent="submit">
        <input v-if="state.authMode !== 'login'" v-model="name" placeholder="姓名 *" required />
        <input v-model="email" type="email" placeholder="帳號 Email *" required />
        <input v-if="state.authMode !== 'forgot'" v-model="password" type="password" placeholder="密碼 *" required />
        <input v-if="state.authMode === 'register'" v-model="phone" placeholder="手機" />
        <button class="solid-btn" type="submit">{{ action }}</button>
      </form>
      <div class="switch" @click="cycle">{{ hint }}</div>
      <p style="text-align:center;font-size:12px;color:#8a7d74;margin-top:18px">
        示範會員 demo@aurora.tw / demo123<br />後台 admin@aurora.tw / aurora888
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, refreshCart, setSession, state } from '../api'

const router = useRouter()
const email = ref('demo@aurora.tw')
const password = ref('demo123')
const name = ref('')
const phone = ref('')
const err = ref('')

const title = computed(() => ({ login: '會員登入', register: '會員註冊', forgot: '重設密碼' }[state.authMode]))
const action = computed(() => ({ login: '登入', register: '確認送出', forgot: '送出驗證信' }[state.authMode]))
const hint = computed(() => ({
  login: '忘記密碼 / 會員註冊',
  register: '已經有帳號了？馬上登入',
  forgot: '會員登入 / 會員註冊'
}[state.authMode]))

function cycle() {
  err.value = ''
  state.authMode = state.authMode === 'login' ? 'register' : state.authMode === 'register' ? 'forgot' : 'login'
}

async function submit() {
  err.value = ''
  try {
    if (state.authMode === 'forgot') {
      err.value = '重設連結已模擬寄出，請使用原密碼登入。'
      return
    }
    const path = state.authMode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const body = state.authMode === 'login'
      ? { email: email.value, password: password.value }
      : { email: email.value, password: password.value, name: name.value, phone: phone.value }
    const data = await api(path, { method: 'POST', body: JSON.stringify(body) })
    setSession(data.token, data.user)
    await refreshCart()
    state.authOpen = false
    if (data.user.role === 'admin') router.push('/admin')
  } catch (e) {
    err.value = e.message
  }
}
</script>
