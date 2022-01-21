import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Consent from "../views/Consent.vue";
import Instruct from "../views/Instruct.vue";

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
    path: "/inbox",
    name: "Inbox",
    component: () =>
      import(/* webpackChunkName: "inbox" */ "../views/Inbox.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/surveys",
    name: "Surveys",
    component: () =>
      import(/* webpackChunkName: "inbox" */ "../views/Surveys.vue"),
    meta: {
      requiresAuth: true,
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
