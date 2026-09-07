<template>
  <main>
      <PageHero :title="page.title || '飼養諮詢'" :subtitle="page.subtitle || 'CARE DESK'" :banner="page.banner" />
    <section class="section">
      <div class="wide contact-grid">
        <div>
          <img v-if="page.image" :src="page.image" alt="" style="width:100%;height:240px;object-fit:cover;margin-bottom:20px" />
          <h3 class="serif" style="font-size:28px">怎麼諮詢</h3>
          <div style="white-space:pre-wrap;line-height:2">{{ page.content }}</div>
        </div>
        <form class="form" @submit.prevent="send">
          <input v-model="form.name" placeholder="飼主姓名 *" required />
          <input v-model="form.email" type="email" placeholder="Email *" required />
          <input v-model="form.phone" placeholder="電話" />
          <input v-model="form.childAge" placeholder="毛孩種類 / 年齡 / 體重" />
          <button class="solid-btn" type="submit">送出諮詢</button>
          <p v-if="ok" class="ok">已收到，顧問會用 Email 或電話回覆。</p>
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
