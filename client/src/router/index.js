import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LikeView from '../views/LikeView.vue';
import CameraView from '../views/CameraView.vue';
// import UploadView from '../views/UploadView.vue';
import TestView from '../views/TestView.vue';

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
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   component: UploadView,
    // },
  ],
});

export default router;
