<template>
  <q-page class="q-pa-md">
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
    <button @click="snapShot">Create snapshot</button>
  </q-page>
</template>

<script setup>
import Camera from 'simple-vue-camera';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const camera = ref();

const snapShot = async () => {
  const blob = await camera.value?.snapshot();
  console.log(blob);
  // To show the screenshot with an image tag, create a url
  const url = URL.createObjectURL(blob);
  console.log(url);
  

  return {
    camera,
    snapShot,
  };
};

const loading = () => console.log('Camera is loading and will start any second');
const started = () => console.log('Camera has started');
const stopped = () => console.log('Camera has stopped');
const paused = () => console.log('Video feed has paused');
const resumed = () => console.log('Video feed has resumed');
const cameraChange = (deviceID) => console.log(`Camera has been changed to ${deviceID}`);
const snapshot = (blob) => console.log('A snapshot has been taken');
const error = (error) => console.log('error');
</script>
