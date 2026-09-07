<template>
  <main>
    <div class="page-hero"><div class="en">CART</div><h1>購物車</h1></div>
    <section class="section">
      <div class="wide">
        <table class="table" v-if="cart.items?.length">
          <thead><tr><th>商品</th><th>規格</th><th>數量</th><th>小計</th><th></th></tr></thead>
          <tbody>
            <tr v-for="i in cart.items" :key="i.id">
              <td style="display:flex;gap:12px;align-items:center">
                <img :src="i.image" style="width:72px;height:88px;object-fit:cover" />
                {{ i.name }}
              </td>
              <td>{{ i.size }}</td>
              <td><input class="qty" type="number" min="1" :value="i.qty" @change="update(i, $event)" /></td>
              <td>{{ money(i.price * i.qty) }}</td>
              <td><button class="ghost-btn" @click="remove(i)">移除</button></td>
            </tr>
          </tbody>
        </table>
        <p v-else>購物車還是空的。到商品列表選幾樣再回來。</p>
        <div class="cart-foot" v-if="cart.items?.length">
          <div>
            <p class="hint">運費在結帳頁依出貨方式計算，滿額可免運。</p>
            <b>商品合計 {{ money(cart.total) }}</b>
          </div>
          <router-link class="solid-btn" to="/checkout">前往結帳</router-link>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api, money, refreshCart } from '../api'
const cart = ref({ items: [], total: 0 })
async function load() { cart.value = await api('/api/cart') }
async function update(i, e) {
  await api(`/api/cart/${i.id}`, { method: 'PUT', body: JSON.stringify({ qty: e.target.value }) })
  await load(); await refreshCart()
}
async function remove(i) {
  await api(`/api/cart/${i.id}`, { method: 'DELETE' })
  await load(); await refreshCart()
}
onMounted(load)
</script>
