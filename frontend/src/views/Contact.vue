<template>
  <main>
    <PageHero :title="page.title || '聯絡我們'" :subtitle="page.subtitle || 'CONTACT'" crumb="HOME / 聯絡我們" :banner="page.banner" />
    <section class="section">
      <div class="wide contact-grid">
        <div>
          <img v-if="page.image" :src="page.image" alt="" style="width:100%;height:220px;object-fit:cover;margin-bottom:24px" />
          <p v-for="c in contacts" :key="c.id">
            <template v-if="c.href"><a :href="c.href">{{ c.label }}　{{ c.value }}</a></template>
            <template v-else>{{ c.label }}　{{ c.value }}</template>
          </p>
          <div v-if="page.content" style="margin-top:20px;white-space:pre-wrap;line-height:1.9">{{ page.content }}</div>
        </div>
        <form class="form" @submit.prevent="send">
          <input v-model="form.name" placeholder="姓名 *" required />
          <input v-model="form.email" type="email" placeholder="Email *" required />
          <input v-model="form.phone" placeholder="電話" />
          <input v-model="form.subject" placeholder="主旨" />
          <textarea v-model="form.content" placeholder="留言內容 *" required></textarea>
          <button class="solid-btn" type="submit">確認送出</button>
          <p v-if="ok" class="ok">謝謝您，將有專人儘快與您聯繫。</p>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { api, pageBySlug, state } from '../api'
import PageHero from '../components/PageHero.vue'
const page = computed(() => pageBySlug('contact'))
const contacts = computed(() => (state.site?.contacts || []).slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)))
const form = reactive({ name: '', email: '', phone: '', subject: '', content: '' })
const ok = ref(false)
async function send() {
  await api('/api/contact', { method: 'POST', body: JSON.stringify(form) })
  ok.value = true
}
</script>
