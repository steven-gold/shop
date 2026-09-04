<template>
  <main>
    <section class="hero" v-if="home">
      <img :src="current.image" :alt="current.title" />
      <div class="veil"></div>
      <div class="copy">
        <p>{{ current.subtitle }}</p>
        <h2>{{ current.title }}</h2>
        <router-link class="ghost-btn" :to="current.link">{{ current.button }}</router-link>
      </div>
      <div class="hero-nav">
        <button @click="prev">‹</button>
        <span>{{ index + 1 }}</span>
        <span style="opacity:.4">/ {{ home.banners.length }}</span>
        <button @click="next">›</button>
      </div>
    </section>

    <section class="section" v-if="home">
      <div class="wide">
        <div class="center-title">
          <h1>{{ copy.heading }}</h1>
          <p>{{ copy.subheading }}</p>
        </div>
        <div class="mosaic">
          <router-link class="tile" :class="{ flip: i % 2 === 1 }" v-for="(t, i) in home.tiles" :key="t.categoryId" :to="`/products/${t.categoryId}`">
            <img :src="t.image" :alt="t.title" />
            <div class="meta">
              <div>
                <b>{{ t.title }}</b><br />
                <span>+ More Aurora</span>
              </div>
              <div class="count">{{ t.count }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="split" v-if="home">
      <div class="photo" :style="{ backgroundImage: `url(${pageImage || home.banners[2]?.image})` }"></div>
      <div class="panel">
        <div>
          <p class="script" style="font-size:28px;margin:0">{{ copy.aboutScript }}</p>
          <h2>{{ copy.aboutHeading }}</h2>
          <p>{{ home.site.aboutLead }}</p>
          <router-link class="ghost-btn" to="/about">{{ copy.aboutButton }}</router-link>
          <div style="height:24px"></div>
          <router-link class="ghost-btn" to="/stores">{{ copy.storesButton }}</router-link>
        </div>
      </div>
    </section>

    <section class="section" v-if="home">
      <div class="wide">
        <div class="center-title">
          <h2>{{ copy.blogHeading }}</h2>
          <p>{{ copy.blogSubheading }}</p>
        </div>
        <div class="blog-grid">
          <router-link class="blog-card" v-for="n in home.news" :key="n.id" :to="`/article/${n.id}`">
            <img :src="n.image" :alt="n.title" />
            <div class="date">{{ n.date }}</div>
            <h3>{{ n.title }}</h3>
            <p>{{ n.excerpt }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { api, pageBySlug } from '../api'

const home = ref(null)
const index = ref(0)
const current = computed(() => home.value?.banners[index.value] || {})
const copy = computed(() => home.value?.site?.home || {})
const pageImage = computed(() => pageBySlug('home').image || pageBySlug('about').image || '')
let timer

onMounted(async () => {
  home.value = await api('/api/home')
  timer = setInterval(next, 6000)
})
onUnmounted(() => clearInterval(timer))

function next() {
  if (!home.value) return
  index.value = (index.value + 1) % home.value.banners.length
}
function prev() {
  if (!home.value) return
  index.value = (index.value - 1 + home.value.banners.length) % home.value.banners.length
}
</script>
