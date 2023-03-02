<template>
  <q-page class="q-pa-md">
    <Camera @loading="loading" @started="started" @stopped="stopped" @paused="paused" @resumed="resumed" @camera-change="cameraChange" @snapshot="snapshot" @error="error" ref="camera" :resolution="{ width: 375, height: 812 }" autoplay> </Camera>
    <button @click="snapShot">Create snapshot</button>
    <button @click="takePicture">Take Picture</button>
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

const takePicture = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = this.$refs.video;
    video.srcObject = stream;
    await video.play();

    const canvas = this.$refs.canvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

    const formData = new FormData();
    formData.append('image', blob);

    const response = await axios.post('/api/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    this.imageDataUrl = URL.createObjectURL(blob);
    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error taking picture:', error);
  }
};
</script>
