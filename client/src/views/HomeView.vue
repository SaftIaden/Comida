<script setup>
import { ref, onMounted, computed, toRaw } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { openDB } from 'idb';

const $q = useQuasar();
const search = ref('');
const meals = ref([]);
const storedMeals = ref([]);

const recognition = ref(null);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/meals');
  meals.value = data;

  if (!window.indexedDB) alert('IndexedDB is not available!');
  if (!db) await openDataBase();

  await addAll();

  recognition.value = new window.webkitSpeechRecognition();
  recognition.value.lang = 'de-DE';

  recognition.value.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    search.value = result[0].transcript;
  };
});

const startSpeechRecognition = () => {
  recognition.value.start();
};

let db = null;

const openDataBase = async () => {
  db = await openDB('mealDB', 1, {
    upgrade(db) {
      const store = db.createObjectStore('meals', { keyPath: 'id' });
      store.createIndex('name', 'name');
      store.createIndex('description', 'description');
      store.createIndex('price', 'price');
      store.createIndex('image', 'image');
    },
  });
};

const getStoredMeals = async () => {
  storedMeals.value = await db.getAll('meals');
};

const addAll = async () => {
  meals.value.forEach(async (meal) => {
    await db.put('meals', toRaw(meal));
  });
  console.log(meals.value);
  getStoredMeals();
};

const removeMeal = async (meal) => {
  await db.delete('meals', meal.id);
  getStoredMeals();
};

const filteredMeals = computed(() => {
  return meals.value.filter((meal) => {
    return meal.name.toLowerCase().includes(search.value.toLowerCase());
  });
});

function toBase64(arr) {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const likeMeal = async (id) => {
  const { data } = await axios.patch(`http://localhost:3000/meals/${id}/like`);
  console.log(data);
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
};
const dislikeMeal = async (id) => {
  const { data } = await axios.patch(
    `http://localhost:3000/meals/${id}/dislike`,
  );
  console.log(data);
};

const confirm = async (id) => {
  $q.dialog({
    title: 'Confirm delete',
    message: 'Sicher, dass Sie diese Speise löschen möchten?',
    cancel: true,
    persistent: true,
    class: 'bg-warning text-dark',
  })
    .onOk(async () => {
      console.log('>>>> OK');
      console.log(id);
      const { data } = await axios.delete(`http://localhost:3000/meals/${id}`);
      await removeMeal();
      console.log(data);
    })
    .onCancel(() => {
      console.log('>>>> Cancel');
    })
    .onDismiss(() => {
      console.log('I am triggered on both OK and Cancel');
    });
};

const editMeal = ref(false);
const name = ref('');
const description = ref('');
const price = ref('');

const patchMeal = async (id) => {
  console.log(price.value);
  console.log(name.value);
  const { data } = await axios.patch(`http://localhost:3000/meals/${id}`, {
    name: name.value,
    description: description.value,
    price: price.value,
  });
  console.log(data);
};

const onSwipeLeft = () => {
  console.log('Links');
};

const onSwipeRight = () => {
  console.log('Rechts');
};

const onTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
};

const onTouchMove = (event) => {
  currentX.value = event.touches[0].clientX;
};

const onTouchEnd = () => {
  if (startX.value && currentX.value) {
    const deltaX = currentX.value - startX.value;
    if (deltaX > 50) {
      onSwipeRight();
    } else if (deltaX < -50) {
      onSwipeLeft();
    }
  }

  startX.value = null;
  currentX.value = null;
};

const startX = ref(0);
const currentX = ref(0);
</script>

<template>
  <q-layout class="xs">
    <q-page-container>
      <q-input
        v-model="search"
        class="q-pa-md"
        bg-color="accent"
        color="primary"
        rounded
        outlined
        type="search"
      >
        <template v-slot:append>
          <div class="row align-center">
            <i
              @click="startSpeechRecognition"
              class="fa-solid fa-microphone q-mr-md"
            ></i>
            <q-icon name="search" color="dark" />
          </div>
        </template>
      </q-input>
    </q-page-container>

    <div
      style="font-family: Poppins"
      class="q-pa-md row items-start q-gutter-md q-mb-xl"
    >
      <h2 style="font-family: Poppins">Comida</h2>
      <div v-for="m of filteredMeals" :key="m.id">
        <q-card
          class="my-card bg-primary"
          ref="swipeElement"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <img :src="`data:image/png;base64,${toBase64(m.image.data)}`" />

          <q-card-section>
            <div class="text-h4">{{ m.name }}</div>

            <div class="text-body1 text-weight-bold">{{ m.price }}€</div>

            <div class="">
              {{ m.likes }} <i class="fa-solid fa-heart text-pink"></i>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none"
            >{{ m.description }}
          </q-card-section>
          <div class="q-pa-md row justify-center">
            <q-btn
              class="q-mr-md"
              round
              color="positive"
              @click="likeMeal(m.id)"
            >
              <i class="fa-regular fa-thumbs-up"></i
            ></q-btn>
            <q-btn
              class="q-mr-lg"
              round
              color="negative"
              @click="dislikeMeal(m.id)"
            >
              <i class="fa-regular fa-thumbs-down"></i
            ></q-btn>
            <q-btn
              class="q-mr-lg"
              round
              color="warning"
              @click="editMeal = !editMeal"
              ><i class="fa-solid fa-pen-to-square"></i
            ></q-btn>
            <q-btn
              class="q-mr-lg"
              round
              color="negative"
              @click="confirm(m.id)"
            >
              <i class="fa-solid fa-trash"></i
            ></q-btn>
          </div>
          <div v-if="editMeal" class="q-pa-md q-gutter-md">
            <q-input rounded outlined label="Name" v-model="name" />
            <q-input
              rounded
              outlined
              v-model="description"
              label="Beschreibung"
            />
            <q-input
              rounded
              outlined
              v-model="price"
              label="Preis"
              mask="##.##"
              fill-mask="#"
            />
            <q-btn color="info" @click="patchMeal(m.id)">Confirm Edit</q-btn>
          </div>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>
