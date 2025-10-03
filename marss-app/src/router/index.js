// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import RoverPhotos from '../views/RoverPhotos.vue';
import MissionLog from '../views/MissionLog.vue';

const routes = [
  {
    path: '/',
    name: 'RoverPhotos',
    component: RoverPhotos,
  },
  {
    path: '/log',
    name: 'MissionLog',
    component: MissionLog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;