<template>
  <main>
    <div class="page-hero"><div class="en">MEMBER</div><h1>會員中心</h1></div>
    <section class="section">
      <div class="wide" style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
        <form class="form" @submit.prevent="save">
          <input v-model="form.name" placeholder="姓名" />
          <input v-model="form.phone" placeholder="電話" />
          <input v-model="form.password" type="password" placeholder="新密碼（空白則不更改）" />
          <button class="solid-btn" type="submit">更新資料</button>
          <button type="button" class="ghost-btn" @click="out">登出</button>
          <p v-if="ok" class="ok">已更新</p>
        </form>
        <div>
          <h3 class="serif">我的訂單</h3>
          <article v-for="o in orders" :key="o.id" class="card" style="margin-bottom:12px">
            <b>#{{ o.id }}</b>　{{ o.status }}　{{ money(o.total) }}
            <p v-for="i in o.items" :key="i.productId + i.size">{{ i.name }} × {{ i.qty }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, logout, money, state } from '../api'
const router = useRouter()
const form = reactive({ name: state.user?.name || '', phone: state.user?.phone || '', password: '' })
const orders = ref([])
const ok = ref(false)
onMounted(async () => { orders.value = await api('/api/orders') })
async function save() {
  state.user = await api('/api/auth/profile', { method: 'PUT', body: JSON.stringify(form) })
  localStorage.setItem('aurora_user', JSON.stringify(state.user))
  ok.value = true
}
function out() {
  logout()
  router.push('/')
}
</script>
