import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEJIpYYSBk-S2iWKXgJNAxOpeBKiNgZ3M",
  authDomain: "mock-inbox.firebaseapp.com",
  projectId: "mock-inbox",
  storageBucket: "mock-inbox.appspot.com",
  messagingSenderId: "787393509996",
  appId: "1:787393509996:web:0e91453e8c2f323bb1b649"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();
export { db, rtdb };

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
