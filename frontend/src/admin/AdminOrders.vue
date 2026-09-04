<template>
  <div>
    <h2 class="serif">訂單</h2>
    <table class="table">
      <thead><tr><th>編號</th><th>收件</th><th>金額</th><th>狀態</th></tr></thead>
      <tbody>
        <tr v-for="o in list" :key="o.id">
          <td>#{{ o.id }}<br /><small>{{ o.items.map(i => i.name).join('、') }}</small></td>
          <td>{{ o.receiver }}<br />{{ o.phone }}<br />{{ o.address }}</td>
          <td>{{ money(o.total) }}</td>
          <td>
            <select :value="o.status" @change="set(o, $event.target.value)">
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
onMounted(async () => { list.value = await api('/api/admin/orders') })
async function set(o, status) {
  await api(`/api/admin/orders/${o.id}`, { method: 'PUT', body: JSON.stringify({ status }) })
  o.status = status
}
</script>
