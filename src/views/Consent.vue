<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      It seems that you are not using a mouse to interact with your device.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>

    <!-- TO DO: INSERT JPMC CONSENT FORM -->

    <br />
    <v-form v-model="showButton">
      <VueRecaptcha
        ref="recaptcha"
        sitekey="6LfEiy0dAAAAAOHnW3FYObBmao1oPBqx9W6kmXGV"
        :loadRecaptchaScript="true"
        @verify="showButton = true"
      /><br />

      <v-btn
        :disabled="!showButton"
        elevation="3"
        color="success"
        @click="
          login();
          $router.push('instruct');
        "
        width="100px"
        >I consent</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import { auth } from "../main";
import { signInAnonymously } from "firebase/auth";
import Vue from 'vue'

export default {
  name: "consent",
  metaInfo: {
    title: "Consent form | Online e-mail filter study",
    titleTemplate: null,
  },
  components: { VueRecaptcha },
  data() {
    return {
      showButton: false,
    };
  },
  methods: {
    login() {
      try {
        signInAnonymously(auth);
        // console.log("signed in anonymously")
      } catch {
        // console.log("error signing in anonymously");
        alert(
          "Something went wrong when trying to reach the task. Please refresh the page."
        );
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

    if (urlParams.has("cond")) {
      let cond = urlParams.get("cond");
      Vue.prototype.$cond = cond;
    } else {
      let cond = ["c", "t"]
      Vue.prototype.$cond = cond[Math.floor(Math.random(cond.length))] // TODO: DOUBLE CHECK TYPE == STRING
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
