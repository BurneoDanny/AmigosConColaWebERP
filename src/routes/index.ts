import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/pages/LandingPage.vue") },
  { path: "/home", component: () => import("@/pages/Home.vue") },
  { path: "/login", component: () => import("@/pages/LoginPage.vue") },
  { path: "/adopciones", component: () => import("@pages/Adoption.vue") },
  { path: "/inventario", component: () => import("@pages/Inventory.vue") },
  {
    path: "/donaciones",
    component: () => import("@pages/Donation.vue"),
  },
  {
    path: "/solicitudes-adopciones",
    component: () => import("@pages/AdoptionRequests.vue"),
  },
  {
    path: "/pet-info/:id",
    component: () => import("@pages/PetInfo.vue"),
  },
  {
    path: "/crear-animal",
    name: "crear-animal",
    component: () =>
      import("@pages/animal_registration/AnimalRegistration.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from) => {
  const accessToken = localStorage.getItem("access_token");
  const authenticated = accessToken !== null;

  if (!authenticated && to.path !== "/login" && to.path !== "/") {
    return "/login";
  }

  if (authenticated && to.path === "/login") {
    return "/home";
  }
});

export default router;
