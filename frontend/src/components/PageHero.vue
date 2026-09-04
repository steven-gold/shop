<template>
  <div class="page-hero" :class="{ 'has-banner': !!banner }" :style="banner ? { backgroundImage: 'url(' + banner + ')' } : null">
    <div class="page-hero-inner">
      <div class="crumb" v-if="crumb">{{ crumb }}</div>
      <div class="en">{{ subtitle }}</div>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  crumb: { type: String, default: '' },
  banner: { type: String, default: '' }
})
</script>
