<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      It seems that you are not using a mouse to interact with your computer.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>
    <h1>INSERT CONSENT FORM</h1>
    
      <p v-show="!$isProlificUser">
      Your unique ID is: <b>{{ this.$user }}</b>
    </p>

    <!-- <VueRecaptcha
      ref="recaptcha"
      sitekey="6LfEiy0dAAAAAOHnW3FYObBmao1oPBqx9W6kmXGV"
      :loadRecaptchaScript="true"
      @verify="showButton = true"
      /><br /> -->

    <br />
    <br />
    <!-- ADD TO BTN BELOW WHEN IMPLEMENTING RECAPTCHA VALIDATION  :disabled="!showButton" -->
    <v-btn
      elevation="3"
      color="success"
      @click="
        login();
        $router.push('instruct');
      "
      width="100px"
      >Continue</v-btn
    >
  </div>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
import Vue from "vue";
import { auth } from "../main";
import { signInAnonymously } from "firebase/auth";

export default {
  name: "consent",
  metaInfo: {
    title: "Etray study",
    titleTemplate: null,
  },
  // components: { VueRecaptcha },
  data() {
    return {
      setID: null,
      showButton: false,
      uuid: null,
    };
  },
  methods: {
    login() {
      try {
        signInAnonymously(auth);
        // console.log("signed in anonymously")
      } catch {
        // console.log("error signing in anonymously");
      }
    },
    usesMouse() {
      document.addEventListener("pointermove", (ev) =>
        ev.pointerType === "mouse" ? true : false
      );
    },
  },
  beforeCreate() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    if (urlParams.has("PROLIFIC_PID")) {
      let uuid = urlParams.get("PROLIFIC_PID");
      Vue.prototype.$user = uuid;
      Vue.prototype.$isProlificUser = true;
    } else {
      // let uuid = [...Array(32)]
      //   .map(() => Math.random().toString(36)[2])
      //   .join("");
      let uuid = "TEST_LOCAL";
      this.setID = uuid;
      Vue.prototype.$user = uuid;
      Vue.prototype.$isProlificUser = false;
    }
  },
};
</script>

<style scoped>
#welcome {
  margin-top: 5%;
  width: 960px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
