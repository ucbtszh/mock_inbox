import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "./assets/base.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEJIpYYSBk-S2iWKXgJNAxOpeBKiNgZ3M",
  authDomain: "mock-inbox.firebaseapp.com",
  projectId: "mock-inbox",
  storageBucket: "mock-inbox.appspot.com",
  messagingSenderId: "787393509996",
  appId: "1:787393509996:web:0e91453e8c2f323bb1b649",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, auth };

Vue.config.productionTip = false;

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue ({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})