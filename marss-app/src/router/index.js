// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import RoverPhotos from '../views/RoverPhotos.vue'; // Lo crearemos a continuación

const routes = [
  {
    path: '/',
    name: 'RoverPhotos',
    component: RoverPhotos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;