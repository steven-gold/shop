<template>
  <main>
    <PageHero :title="page.title || '關於我們'" :subtitle="page.subtitle || 'INTRODUCTION'" crumb="HOME / 關於我們" :banner="page.banner" />
    <section class="section">
      <div class="wide" style="max-width:820px">
        <img v-if="page.image" :src="page.image" alt="" style="width:100%;height:360px;object-fit:cover;margin-bottom:36px" />
        <p class="script" style="font-size:32px;color:var(--rose)">{{ extras.storyHeading || '創業過程' }}</p>
        <p style="line-height:2;font-size:16px">{{ state.site?.story }}</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:48px 0;text-align:center">
          <div v-for="(m, i) in extras.milestones || []" :key="i">
            <b class="serif" style="font-size:36px">{{ m.year }}</b>
            <p>{{ m.text }}</p>
          </div>
        </div>
        <p class="script" style="font-size:32px;color:var(--rose)">{{ extras.nameHeading || '品牌命名' }}</p>
        <p style="line-height:2">{{ extras.nameText }}</p>
        <p class="script" style="font-size:32px;color:var(--rose)">{{ extras.futureHeading || '品牌未來' }}</p>
        <p style="line-height:2">{{ state.site?.future }}</p>
        <div v-if="page.content" style="line-height:2;margin-top:32px;white-space:pre-wrap">{{ page.content }}</div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed } from 'vue'
import { pageBySlug, state } from '../api'
import PageHero from '../components/PageHero.vue'
const page = computed(() => pageBySlug('about'))
const extras = computed(() => page.value.extras || {})
</script>
