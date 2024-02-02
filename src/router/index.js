import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Consent from "../views/Consent.vue";
import Instruct from "../views/Instruct.vue";
import Failed from "../views/Failed.vue";

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "Consent",
    component: Consent,
  },
  {
    path: "/instruct",
    name: "Instruction",
    component: Instruct,
  },
  {
    path: "/UI",
    name: "UI",
    component: () => import(/* webpackChunkName: "inbox" */ "../views/UI.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/returnsub",
    name: "Return",
    component: Failed,
  },
  {
    path: "/surveys",
    name: "Surveys",
    component: () =>
      import(/* webpackChunkName: "inbox" */ "../views/Surveys.vue"),
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

export default router;
