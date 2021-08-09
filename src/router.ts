import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { useAuth } from "./modules/auth"

import Dashboard from "./views/Dashboard.vue";
import CreateQr from "./views/CreateQr.vue";
import View from "./views/customers/View.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import NotFound from "./views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/qr",
    name: "CreateQr",
    component: CreateQr,
  },
  {
    path: "/customers/view",
    name: "View",
    component: View,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('surfsos_backoffice_token');

  if (!to.matched.length) {
    return next('/dashboard');
  }

  if (authRequired && !loggedIn) {
    return next('/');
  }

  if (loggedIn && publicPages.includes(to.path)) {
    return next('/dashboard');
  }

  next();
});

export default router;
