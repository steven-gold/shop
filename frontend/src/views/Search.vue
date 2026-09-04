<template>
  <main>
    <div class="page-hero"><div class="en">SEARCH</div><h1>搜尋商品</h1></div>
    <section class="section">
      <div class="wide">
        <form class="form" style="max-width:480px;margin:0 auto 40px" @submit.prevent="load">
          <input v-model="q" placeholder="輸入商品名稱或貨號" />
          <button class="solid-btn" type="submit">搜尋</button>
        </form>
        <div class="product-grid">
          <ProductCard v-for="p in items" :key="p.id" :p="p" />
        </div>
        <p v-if="searched && !items.length" style="text-align:center">沒有符合的商品</p>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { api } from '../api'
const q = ref('')
const items = ref([])
const searched = ref(false)
async function load() {
  const data = await api(`/api/products?q=${encodeURIComponent(q.value)}&pageSize=24`)
  items.value = data.items
  searched.value = true
}
</script>
