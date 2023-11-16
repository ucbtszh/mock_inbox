<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      It seems that you are not using a mouse to interact with your computer.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>

    <h1 style="text-align:center">Welcome!</h1><br /><br />
    <p>
      Thank you for your interest in this research.
      We are testing new designs for the Outlook email client. You will be
      asked to process emails in a simulated Outlook inbox. 
      This study is being undertaken by researchers from University College
      London (UCL).
      Before proceeding, please carefully read the following.<br /><br />
    </p>
    <b
      >By signing this consent form and clicking “Continue” below, I understand
      that:
    </b><br />
    <br>
        I declare that I will complete the tasks seriously and as accurate 
        My participation in this study is completely voluntary and I can leave
        at any time without giving a reason by closing the web browser. If I do
        this, any data I provided will be deleted. 
        My participation in this study contributes to scientific development and
        is in no way benefiting commercial purposes. 
        If I enable tracking through Google Analytics, my responses may be
        analysed using information from third party cookies. 
        All my responses will be processed anonymously. 
        The anonymous responses may be shared with other researchers and appear
        in academic publications. 
        This research project has been approved by the designated ethics officer
        at UdS.<br>
        I may contact Saarland University with any additional questions or complaints through
        <a href="research@mx.uni-saarland.de">research@mx.uni-saarland.de</a>. If I feel my
        complaint has not been handled satisfactorily, I can contact the Saarland University
        Research Ethics Committee at
        <a href="ckoenig@mx.uni-saarland.de">ckoenig@mx.uni-saarland.de</a>;
      This study is expected to take no longer than 40 minutes.
    <br />
    <v-form v-model="showButton">
      <v-text-field
        v-model="uuid"
        :rules="[(v) => !!v || 'enter unique ID']"
        id="uuid"
        label="Participant ID:"
      ></v-text-field>
      <v-text-field
        v-model="cond"
        :rules="[(v) => !!v || 'enter order number']"
        id="cond"
        label="Order:"
      ></v-text-field>

      <!-- <p v-show="!$isProlificUser">
      Your unique ID is: <b>{{ this.$user }}</b>
    </p>

    <VueRecaptcha
      ref="recaptcha"
      sitekey="6LfEiy0dAAAAAOHnW3FYObBmao1oPBqx9W6kmXGV"
      :loadRecaptchaScript="true"
      @verify="showButton = true"
      style="margin: auto; width:50%"

    /><br />

    <!-- captcha disabled for testing -->
    <v-btn
      :disabled="!showButton"
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
    title: "Consent form | Online email filter study",
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

      // maybe we can use cookies? store session id from prolific as well
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
