<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      It seems that you are not using a mouse to interact with your device.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>

    <h2>Interview or Survey User Notice</h2>
    <br />
    <p>
      We invite you to participate in a J.P. Morgan & Chase AI Research (“J.P.
      Morgan”) survey. The purpose of this survey is to gather and use feedback
      on how users process e-mails. J.P. Morgan may record you and/or your voice
      during the survey and use any information, including any personal
      information, provided by you during the survey (collectively “Study
      Information”) only for the purposes outlined herein. We may use and share
      the Study Information to improve our products and services. J.P. Morgan
      may also aggregate and/or de-identify Study Information: (i) for the
      purposes outlined herein, (ii) publish our findings (iii) and/or share
      Study Information with third-parties. Based on the Study Information
      provided, we may follow up with you to provide information about our
      products and services that may be of interest to you.
    </p>
    <br />

    <p>
      Your participation in this survey is completely voluntary and you can
      choose to end your participation at any time. You may receive Confidential
      Information from J.P. Morgan during this survey. “Confidential
      Information” includes all of J.P. Morgan’s: (i) personnel information;
      (ii) business plans, strategies, forecasts, projects and analyses; (iii)
      technical and business processes, methods and models; (iv) hardware and
      system designs, architectures, structure and protocols; (v) product and
      service specifications; (vi) sales and marketing information; and (vii)
      all intellectual property rights in any of the foregoing. Confidential
      Information shall not include information that becomes generally available
      to the public (other than by the acts or omissions of you). By
      participating in this study/workshop you agree that Confidential
      information is and shall remain the property of J.P. Morgan to be held in
      strict confidence by you solely for J.P. Morgan’s benefit, and shall not
      be used or otherwise disclosed to any other parties at any time, without
      obtaining J.P. Morgan's prior written consent.
    </p>

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
import Vue from "vue";
import VueRecaptcha from "vue-recaptcha";
import { auth } from "../main";
import { signInAnonymously } from "firebase/auth";

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
      Vue.prototype.$cond = urlParams.get("cond");
    } else {
      let cond = ["c", "t"];
      Vue.prototype.$cond = cond[Math.floor(Math.random() * cond.length)];
    }
  },
};
</script>

<style scoped>
#welcome {
  margin-top: 5%;
  width: 900px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
