<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <q-layout view="hHh lpR fFf" class="tet-primary">
    <q-page-container class="bg-primary">
      <router-view />
      <q-page-sticky position="bottom">
        <NavBar></NavBar>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>
