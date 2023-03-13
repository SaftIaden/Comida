<template>
  <q-page class="q-pa-md">
    <div v-if="!taken">
      <Camera
        @loading="loading"
        @started="started"
        @stopped="stopped"
        @paused="paused"
        @resumed="resumed"
        @camera-change="cameraChange"
        @snapshot="snapshot"
        @error="error"
        ref="camera"
        :resolution="{ width: 375, height: 812 }"
        autoplay
      >
      </Camera>
      <q-btn color="info" @click="snapShot">Create snapshot</q-btn>
    </div>
    <div v-if="taken" class="q-gutter-md" style="font-family: Poppins">
      <h2 style="font-family: Poppins">Infos</h2>
      <q-input required rounded outlined v-model="name" label="Name" />
      <q-input
        required
        rounded
        outlined
        v-model="description"
        label="Beschreibung"
      />
      <q-input
        required
        rounded
        outlined
        v-model="price"
        label="Preis"
        mask="##.##"
        fill-mask="#"
      />
      <q-btn color="info" @click="taken = !taken">Neues Foto</q-btn>
      <q-btn color="info" @click="sendMeal">Senden</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import Camera from 'simple-vue-camera';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const camera = ref();

const name = ref('');
const description = ref('');
const price = ref();
const taken = ref(false);

const refFormData = ref();

const snapShot = async () => {
  const blob = await camera.value?.snapshot();
  console.log(blob);
  // To show the screenshot with an image tag, create a url
  const url = URL.createObjectURL(blob);
  console.log(url);

  const formData = new FormData();

  formData.append('image', blob);

  refFormData.value = formData;

  console.log(formData.get('image'));
  console.log(refFormData.value);

  taken.value = !taken.value;

  return {
    camera,
    snapShot,
  };
};

const sendMeal = async () => {
  refFormData.value.append('name', name.value);
  refFormData.value.append('description', description.value);
  refFormData.value.append('price', price.value);
  console.log(refFormData.value.get('name'));
  console.log(refFormData.value.get('description'));
  console.log(refFormData.value.get('price'));
  console.log(refFormData.value.get('image'));

  const { data } = await axios.post(
    'http://localhost:3000/meals',
    refFormData.value,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  console.log(data);

  name.value = '';
  description.value = '';
  price.value = '';
};

const loading = () =>
  console.log('Camera is loading and will start any second');
const started = () => console.log('Camera has started');
const stopped = () => console.log('Camera has stopped');
const paused = () => console.log('Video feed has paused');
const resumed = () => console.log('Video feed has resumed');
const cameraChange = (deviceID) =>
  console.log(`Camera has been changed to ${deviceID}`);
const snapshot = (blob) => console.log('A snapshot has been taken', blob);
const error = (error) => console.log('error', error);
</script>
