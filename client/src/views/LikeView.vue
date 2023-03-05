<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
const search = ref('');
const meals = ref([]);
onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/meals/likes');
  console.log(data);
  meals.value = data;
});

function toBase64(arr) {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const likeMeal = async (id) => {
  const { data } = await axios.patch(`http://localhost:3000/meals/${id}/like`);
  console.log(data);
};
const dislikeMeal = async (id) => {
  const { data } = await axios.patch(`http://localhost:3000/meals/${id}/dislike`);
  console.log(data);
};

const filteredMeals = computed(() => {
  return meals.value.filter((meal) => {
    return meal.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<template>
  <q-layout class="xs">
    <q-page-container>
      <q-input v-model="search" class="q-pa-md" bg-color="accent" color="primary" rounded outlined type="search">
        <template v-slot:append>
          <q-icon name="search" color="dark" />
        </template>
      </q-input>
    </q-page-container>

    <div style="font-family: Poppins" class="q-pa-md row items-start q-gutter-md q-mb-xl">
      <h2 style="font-family: Poppins">Best Bites</h2>
      <div v-for="m of filteredMeals" :key="m.id">
        <q-card class="my-card">
          <img :src="`data:image/png;base64,${toBase64(m.image.data)}`" />

          <q-card-section>
            <div class="text-h4">{{ m.name }}</div>
            <div class="text-body1 text-weight-bold">{{ m.price }}€</div>
          </q-card-section>

          <q-card-section class="q-pt-none">{{ m.description }} </q-card-section>
          <div class="q-pa-md row justify-around">
            <div>
              <q-btn class="q-mr-md" round color="positive" @click="likeMeal(m.id)"> <i class="fa-regular fa-thumbs-up"></i></q-btn>
              <q-btn class="q-mr-lg" round color="negative" @click="dislikeMeal(m.id)"> <i class="fa-regular fa-thumbs-down"></i></q-btn>
            </div>
            <div class="text-h6">{{ m.likes }} Likes</div>
          </div>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>
