import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LikeView from '../views/LikeView.vue';
import CameraView from '../views/CameraView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/likes',
      name: 'likes',
      component: LikeView,
    },
    {
      path: '/camera',
      name: 'camera',
      component: CameraView,
    },
  ],
});

export default router;
