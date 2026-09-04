<template>
  <div class="image-field">
    <img v-if="modelValue" :src="modelValue" alt="" />
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder || '圖片網址'" />
    <label class="ghost-btn upload-btn">
      上傳圖片
      <input type="file" accept="image/*" hidden @change="onFile" />
    </label>
    <small v-if="err" class="ok">{{ err }}</small>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { api } from '../api'
defineProps({ modelValue: String, placeholder: String })
const emit = defineEmits(['update:modelValue'])
const err = ref('')
async function onFile(e) {
  const file = e.target.files && e.target.files[0]
  e.target.value = ''
  if (!file) return
  err.value = ''
  const fd = new FormData()
  fd.append('file', file)
  try {
    const data = await api('/api/admin/upload', { method: 'POST', body: fd })
    emit('update:modelValue', data.url)
  } catch (ex) {
    err.value = ex.message
  }
}
</script>
