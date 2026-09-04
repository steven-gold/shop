<template>
  <main>
    <div class="page-hero"><div class="en">CHECKOUT</div><h1>結帳</h1></div>
    <section class="section">
      <div class="wide" style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
        <form class="form" @submit.prevent="place">
          <input v-model="form.receiver" placeholder="收件人 *" required />
          <input v-model="form.phone" placeholder="電話 *" required />
          <input v-model="form.address" placeholder="地址 *" required />
          <textarea v-model="form.note" placeholder="備註"></textarea>
          <button class="solid-btn" type="submit">確認下單</button>
          <p v-if="msg" class="ok">{{ msg }}</p>
        </form>
        <div>
          <p v-for="i in cart.items" :key="i.id">{{ i.name }} × {{ i.qty }}　{{ money(i.price * i.qty) }}</p>
          <b>合計 {{ money(cart.total) }}</b>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, money, refreshCart, state } from '../api'
const router = useRouter()
const cart = ref({ items: [], total: 0 })
const form = reactive({ receiver: state.user?.name || '', phone: state.user?.phone || '', address: '', note: '' })
const msg = ref('')
onMounted(async () => { cart.value = await api('/api/cart') })
async function place() {
  const order = await api('/api/orders', { method: 'POST', body: JSON.stringify(form) })
  await refreshCart()
  msg.value = `訂單 #${order.id} 已成立`
  setTimeout(() => router.push('/member'), 800)
}
</script>
