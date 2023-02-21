<template>
  <div class="navbar row no-wrap justify-between bg-warning ">
    <q-btn to="/" size="100%" icon="fa-solid fa-house" unelevated text-color="primary"></q-btn>
    <q-btn
      to="/likes"
      size="100%"
      icon="fa-solid fa-heart"
      unelevated
      text-color="primary"
    ></q-btn>
    <q-btn
      to="/camera"
      size="100%"
      icon="fa-solid fa-camera"
      unelevated
      text-color="primary"
    ></q-btn>
  </div>
</template>

<style scoped>
.navbar {
  width: 100vw;
  height: 6.5vh;
}
</style>
