import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Consent from "../views/Consent.vue";
import { auth } from "../main"

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "Consent",
    component: Consent,
  },
  {
    path: "/inbox",
    name: "Inbox",
    component: () =>
      import(/* webpackChunkName: "inbox" */ "../views/Inbox.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if ((requiresAuth && !Vue.prototype.$user) | (requiresAuth && !auth.currentUser)) {
    next('/')
  } else {
    next();
  }
});

export default router;
