<template>
  <div>
    <h2 class="serif">訂單</h2>
    <table class="table">
      <thead><tr><th>編號</th><th>收件</th><th>出貨 / 付款</th><th>金額</th><th>狀態</th></tr></thead>
      <tbody>
        <tr v-for="o in list" :key="o.id">
          <td>{{ o.orderNo }}<br /><small>{{ o.items.map(i => i.name).join('、') }}</small></td>
          <td>{{ o.receiver }}<br />{{ o.phone }}<br />{{ o.address }}</td>
          <td>
            <select :value="o.shippingMethod" @change="setShip(o, $event.target.value)">
              <option v-for="m in shipMethods" :key="m.id" :value="m.id">{{ m.name }} {{ money(m.fee) }}</option>
            </select>
            <br />
            <small>{{ o.paymentLabel || o.paymentMethod }}</small>
          </td>
          <td>
            商品 {{ money(o.subtotal) }}<br />
            運費 {{ money(o.shippingFee) }}<br />
            <b>{{ money(o.total) }}</b>
          </td>
          <td>
            <select :value="o.status" @change="setStatus(o, $event.target.value)">
              <option>待出貨</option>
              <option>已出貨</option>
              <option>已完成</option>
              <option>已取消</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api, money } from '../api'
const list = ref([])
const shipMethods = ref([])
onMounted(async () => {
  const [orders, opts] = await Promise.all([api('/api/admin/orders'), api('/api/checkout-options')])
  list.value = orders
  shipMethods.value = (opts.shipping?.methods || []).filter((m) => m.enabled !== false)
})
async function setStatus(o, status) {
  const updated = await api(`/api/admin/orders/${o.id}`, { method: 'PUT', body: JSON.stringify({ status }) })
  Object.assign(o, updated)
}
async function setShip(o, shippingMethod) {
  const updated = await api(`/api/admin/orders/${o.id}`, { method: 'PUT', body: JSON.stringify({ shippingMethod }) })
  Object.assign(o, updated)
}
</script>
