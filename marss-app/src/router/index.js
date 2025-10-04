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
  // Configuración de scroll behavior
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (botón atrás del navegador), usar esa
    if (savedPosition) {
      return savedPosition;
    }
    // Si tiene hash (ancla), ir a ese elemento
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // Por defecto, ir arriba con scroll suave
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});

export default router;