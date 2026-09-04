<template>
  <main>
    <PageHero :title="page.title || '童裝訂閱'" :subtitle="page.subtitle || 'WARDROBE CLUB'" :banner="page.banner" />
    <section class="section">
      <div class="wide contact-grid">
        <div>
          <img v-if="page.image" :src="page.image" alt="" style="width:100%;height:240px;object-fit:cover;margin-bottom:20px" />
          <h3 class="serif" style="font-size:28px">訂閱流程</h3>
          <div style="white-space:pre-wrap;line-height:2">{{ page.content }}</div>
        </div>
        <form class="form" @submit.prevent="send">
          <input v-model="form.name" placeholder="家長姓名 *" required />
          <input v-model="form.email" type="email" placeholder="Email *" required />
          <input v-model="form.phone" placeholder="電話" />
          <input v-model="form.childAge" placeholder="寶貝年齡 / 身高" />
          <button class="solid-btn" type="submit">加入用戶</button>
          <p v-if="ok" class="ok">已收到您的訂閱，顧問將與您聯繫。</p>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { api, pageBySlug } from '../api'
import PageHero from '../components/PageHero.vue'
const page = computed(() => pageBySlug('subscribe'))
const form = reactive({ name: '', email: '', phone: '', childAge: '' })
const ok = ref(false)
async function send() {
  await api('/api/subscribe', { method: 'POST', body: JSON.stringify(form) })
  ok.value = true
}
</script>
