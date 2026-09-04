<template>
  <router-link class="pcard" :to="`/product/${p.id}`">
    <img :src="p.image" :alt="p.name" />
    <h3>{{ p.name }}</h3>
    <div class="price">
      <s v-if="p.salePrice && p.salePrice < p.price">{{ money(p.price) }}</s>
      <b>{{ money(p.salePrice || p.price) }}</b>
    </div>
  </router-link>
</template>

<script setup>
import { money } from '../api'
defineProps({ p: { type: Object, required: true } })
</script>
