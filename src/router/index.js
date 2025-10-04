import { createRouter, createWebHashHistory } from "vue-router"; // 👈 Cambiado
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
  // 👇 Cambiado a createWebHashHistory para GitHub Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
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
