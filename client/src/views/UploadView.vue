<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <span class="text-h5">Upload</span>
      <q-input rounded outlined v-model="text" label="Name" />
      <q-input rounded outlined v-model="text" label="Beschreibung" />
      <q-input rounded outlined v-model="price" label="Preis" mask="#.##" fill-mask="#" reverse-fill-mask />
      <img :src="imageUrl" alt="Uploaded image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const text = ref('');
const price = ref();
const imageSrc = ref('');

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = urlParams.get('image');

  if (imageUrl && imageUrl.startsWith('blob:')) {
    imageSrc.value = imageUrl;
  } else {
    console.error('Invalid image URL.');
  }
});
</script>
