<template>
  <main>
    <div class="page-hero"><div class="en">ORDER</div><h1>訂單查詢</h1></div>
    <section class="section">
      <div class="wide" style="max-width:640px">
        <form class="form" @submit.prevent="lookup">
          <input v-model="orderId" placeholder="訂單編號，如 RK202609071001 或 1001 *" required />
          <input v-model="phone" placeholder="下單電話 *" required />
          <button class="solid-btn" type="submit">查詢</button>
          <p v-if="err" class="ok">{{ err }}</p>
        </form>
        <article v-if="order" class="card" style="margin-top:28px">
          <b>{{ order.orderNo }}</b>　{{ order.status }}
          <p>{{ order.receiver }}　{{ order.phone }}</p>
          <p>{{ order.shippingLabel }}　{{ order.paymentLabel }}</p>
          <p>{{ order.address }}</p>
          <p v-for="i in order.items" :key="i.productId + i.size">{{ i.name }} {{ i.size }} × {{ i.qty }}　{{ money(i.price * i.qty) }}</p>
          <p>運費 {{ money(order.shippingFee) }}</p>
          <b>合計 {{ money(order.total) }}</b>
        </article>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { api, money } from '../api'
const orderId = ref('')
const phone = ref('')
const order = ref(null)
const err = ref('')
async function lookup() {
  err.value = ''
  order.value = null
  try {
    order.value = await api('/api/orders/lookup', { method: 'POST', body: JSON.stringify({ orderId: orderId.value, phone: phone.value }) })
  } catch (e) {
    err.value = e.message
  }
}
</script>
