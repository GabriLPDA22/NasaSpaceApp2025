// index.js - ARCHIVO COMPLETO Y ACTUALIZADO

import { createRouter, createWebHistory } from 'vue-router';
import RoverPhotos from '../views/RoverPhotos.vue';
import MissionLog from '../views/MissionLog.vue';
import RoutesView from '../views/RoutesView.vue';
// PASO 1: Importa el componente del juego que crearemos.
import MissionGame from '../views/MissionGame.vue';

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
  // PASO 2: Añade el nuevo objeto de ruta para el juego.
  {
    path: '/game',
    name: 'MissionGame',
    component: MissionGame,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Tu configuración de scrollBehavior se mantiene igual.Z
  scrollBehavior(to, from, savedPosition) {AC
    if (savedPosition) {AC
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});

export default router;