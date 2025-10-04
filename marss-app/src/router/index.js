import { createRouter, createWebHistory } from "vue-router";
import RoverPhotos from "../views/RoverPhotos.vue";
import MissionLog from "../views/MissionLog.vue";
import RoutesView from "../views/RoutesView.vue";
import MissionGame from "../views/MissionGame.vue";

const routes = [
  {
    path: "/",
    name: "RoverPhotos",
    component: RoverPhotos,
  },
  {
    path: "/log",
    name: "MissionLog",
    component: MissionLog,
  },
  {
    path: "/routes",
    name: "RoutesView",
    component: RoutesView,
  },
  {
    path: "/game",
    name: "MissionGame",
    component: MissionGame,
  },
];

const router = createRouter({
  // 👇 LÍNEA CORREGIDA: Le pasamos la URL base al historial del router.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Tu configuración de scrollBehavior se mantiene igual.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
