<template>
  <main v-if="p">
    <div class="wide detail">
      <div>
        <img class="main" :src="active" :alt="p.name" />
        <div class="thumbs">
          <img v-for="g in p.gallery" :key="g" :src="g" :class="{ on: g === active }" @click="active = g" />
        </div>
      </div>
      <div>
        <div class="crumb">PRODUCT / {{ p.sku }}</div>
        <h1>{{ p.name }}</h1>
        <div class="price" style="font-size:20px;margin:12px 0 24px">
          <s v-if="p.salePrice < p.price">{{ money(p.price) }}</s>
          <b>{{ money(p.salePrice) }}</b>
        </div>
        <p style="line-height:1.9;color:var(--ink-soft)">{{ p.desc }}</p>
        <p>顏色：{{ p.color }}　庫存：{{ p.stock }}</p>
        <div class="size-list">
          <button v-for="s in p.sizes" :key="s" :class="{ on: size === s }" @click="size = s">{{ s }}</button>
        </div>
        <button class="solid-btn" @click="add">加入購物車</button>
        <p v-if="msg" class="ok">{{ msg }}</p>
      </div>
    </div>
    <div class="wide section" v-if="p.related?.length">
      <div class="center-title"><h2>相關商品</h2></div>
      <div class="product-grid">
        <ProductCard v-for="r in p.related" :key="r.id" :p="r" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { api, money, refreshCart, state } from '../api'

const route = useRoute()
const p = ref(null)
const active = ref('')
const size = ref('')
const msg = ref('')

watch(() => route.params.id, async () => {
  p.value = await api(`/api/products/${route.params.id}`)
  active.value = p.value.image
  size.value = p.value.sizes[0] || ''
  msg.value = ''
}, { immediate: true })

async function add() {
  if (!state.user) {
    state.authOpen = true
    return
  }
  await api('/api/cart', { method: 'POST', body: JSON.stringify({ productId: p.value.id, size: size.value, qty: 1 }) })
  await refreshCart()
  msg.value = '已加入購物車'
}
</script>
