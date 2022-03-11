import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import "./assets/base.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEJIpYYSBk-S2iWKXgJNAxOpeBKiNgZ3M",
  authDomain: "mock-inbox.firebaseapp.com",
  databaseURL: "https://mock-inbox-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mock-inbox",
  storageBucket: "mock-inbox.appspot.com",
  messagingSenderId: "787393509996",
  appId: "1:787393509996:web:0e91453e8c2f323bb1b649"
};

// Initialize Firebase modular style
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const dbfs = getFirestore(firebaseApp)
const rtdb = getDatabase(firebaseApp);

// non-modular part for Firestore
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

export { auth, dbfs, rtdb };

Vue.config.productionTip = false;

let app
onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue ({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})