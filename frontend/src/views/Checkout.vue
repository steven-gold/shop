<template>
  <main>
    <div class="page-hero"><div class="en">CHECKOUT</div><h1>結帳</h1></div>
    <section class="section">
      <div class="wide checkout-grid">
        <form class="form wide-form" @submit.prevent="place">
          <h3 class="serif">收件資料</h3>
          <input v-model="form.receiver" placeholder="收件人 *" required />
          <input v-model="form.phone" placeholder="電話 *" required />

          <h3 class="serif">出貨方式</h3>
          <p class="hint" v-if="options.shipping?.freeOver">商品滿 {{ money(options.shipping.freeOver) }} 台灣本島免運（門市自取本來就是 NT$0）。</p>
          <label class="opt" v-for="m in enabledShip" :key="m.id">
            <input type="radio" name="ship" :value="m.id" v-model="form.shippingMethod" />
            <span>
              <b>{{ m.name }}</b>
              <small>{{ feeText(m) }}{{ m.hint ? ' · ' + m.hint : '' }}</small>
            </span>
          </label>

          <template v-if="form.shippingMethod === 'cvs'">
            <select v-model="form.storeBrand">
              <option value="7-ELEVEN">7-ELEVEN</option>
              <option value="全家">全家</option>
              <option value="萊爾富">萊爾富</option>
            </select>
            <input v-model="form.storeName" placeholder="門市名稱，如 瑞安門市 *" required />
            <input v-model="form.address" placeholder="門市地址（選填）" />
          </template>
          <template v-else-if="form.shippingMethod === 'home'">
            <input v-model="form.address" placeholder="收件地址 *" required />
          </template>
          <template v-else-if="form.shippingMethod === 'pickup'">
            <select v-model="form.storeName" required>
              <option value="">選擇自取門市</option>
              <option v-for="s in options.stores" :key="s.id" :value="s.name + ' ' + s.address">{{ s.name }} · {{ s.address }}</option>
            </select>
          </template>

          <h3 class="serif">付款方式</h3>
          <label class="opt" v-for="m in enabledPay" :key="m.id">
            <input type="radio" name="pay" :value="m.id" v-model="form.paymentMethod" />
            <span>
              <b>{{ m.name }}</b>
              <small v-if="m.hint">{{ m.hint }}</small>
            </span>
          </label>

          <textarea v-model="form.note" placeholder="備註"></textarea>
          <button class="solid-btn" type="submit" :disabled="busy">確認下單</button>
          <p v-if="msg" class="ok">{{ msg }}</p>
        </form>
        <div class="card checkout-sum">
          <h3 class="serif">訂單摘要</h3>
          <p v-for="i in cart.items" :key="i.id">{{ i.name }} {{ i.size }} × {{ i.qty }}　{{ money(i.price * i.qty) }}</p>
          <p>商品 {{ money(subtotal) }}</p>
          <p>運費 {{ money(shippingFee) }}</p>
          <b>應付 {{ money(payable) }}</b>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, money, refreshCart, state } from '../api'

const router = useRouter()
const cart = ref({ items: [], total: 0 })
const options = ref({ shipping: { methods: [], freeOver: 0 }, payment: { methods: [] }, stores: [] })
const form = reactive({
  receiver: state.user?.name || '',
  phone: state.user?.phone || '',
  address: '',
  note: '',
  shippingMethod: 'home',
  paymentMethod: 'cod',
  storeBrand: '7-ELEVEN',
  storeName: ''
})
const msg = ref('')
const busy = ref(false)

const enabledShip = computed(() => (options.value.shipping?.methods || []).filter((m) => m.enabled !== false))
const enabledPay = computed(() => (options.value.payment?.methods || []).filter((m) => m.enabled !== false))
const subtotal = computed(() => cart.value.total || 0)
const selectedShip = computed(() => enabledShip.value.find((m) => m.id === form.shippingMethod))
const shippingFee = computed(() => {
  const m = selectedShip.value
  if (!m) return 0
  const freeOver = Number(options.value.shipping?.freeOver) || 0
  if (m.id !== 'pickup' && freeOver > 0 && subtotal.value >= freeOver) return 0
  return Number(m.fee) || 0
})
const payable = computed(() => subtotal.value + shippingFee.value)

function feeText(m) {
  const freeOver = Number(options.value.shipping?.freeOver) || 0
  if (m.id !== 'pickup' && freeOver > 0 && subtotal.value >= freeOver) return '本次免運'
  return money(m.fee)
}

onMounted(async () => {
  const [c, o] = await Promise.all([api('/api/cart'), api('/api/checkout-options')])
  cart.value = c
  options.value = o
  const firstShip = (o.shipping?.methods || []).find((m) => m.enabled !== false)
  const firstPay = (o.payment?.methods || []).find((m) => m.enabled !== false)
  if (firstShip) form.shippingMethod = firstShip.id
  if (firstPay) form.paymentMethod = firstPay.id
})

async function place() {
  msg.value = ''
  busy.value = true
  try {
    const order = await api('/api/orders', { method: 'POST', body: JSON.stringify(form) })
    await refreshCart()
    msg.value = `訂單 ${order.orderNo} 已成立，應付 ${money(order.total)}`
    setTimeout(() => router.push('/member'), 900)
  } catch (e) {
    msg.value = e.message
  } finally {
    busy.value = false
  }
}
</script>
