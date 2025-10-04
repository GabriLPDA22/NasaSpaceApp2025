import { createRouter, createWebHistory } from 'vue-router';
import RoverPhotos from '../views/RoverPhotos.vue';
import MissionLog from '../views/MissionLog.vue';
import RoutesView from '../views/RoutesView.vue';

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
  {
    path: '/routes',
    name: 'RoutesView',
    component: RoutesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;