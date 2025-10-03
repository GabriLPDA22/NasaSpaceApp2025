import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
    meta: {
      title: "Mars Circular Economy - Home",
    },
  },
  {
    path: "/scenarios",
    name: "Scenarios",
    component: () => import("../views/ScenarioView.vue"),
    meta: {
      title: "Scenarios - Mars Circular Economy",
    },
  },
  {
    path: "/scenarios/residence",
    name: "Residence",
    component: () => import("../views/ResidenceView.vue"),
    meta: {
      title: "Residence Renovations - Mars Circular Economy",
      scenario: "residence",
    },
  },
  {
    path: "/scenarios/celebration",
    name: "Celebration",
    component: () => import("../views/CelebrationView.vue"),
    meta: {
      title: "Cosmic Celebrations - Mars Circular Economy",
      scenario: "celebration",
    },
  },
  {
    path: "/scenarios/discovery",
    name: "Discovery",
    component: () => import("../views/DiscoveryView.vue"),
    meta: {
      title: "Daring Discoveries - Mars Circular Economy",
      scenario: "discovery",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "About - Mars Circular Economy",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Navigation guard para cambiar el título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Mars Circular Economy";
  next();
});

export default router;
