<template>
  <div id="welcome">
    <b>Welcome!</b><br /><br />
    <p>
      Thank you for your interest in this research.<br />
      We are testing new designs for the Outlook e-mail client. You will be
      asked to process e-mails in a simulated Outlook inbox. <br />
      This study is being undertaken by researchers from University College
      London (UCL).<br />
      Before proceeding, please carefully read the following.<br /><br />
    </p>
    <b
      >By signing this consent form and clicking “Continue” below, I understand
      that:</b
    ><br />
    <ul>
      <li>
        I declare that I will complete the tasks seriously and as accurate as I
        can to be compensated fairly for my efforts;
      </li>
      <li>
        My participation in this study is completely voluntary and I can leave
        at any time without giving a reason by closing the web browser. If I do
        this, any data I provided will be deleted;
      </li>
      <li>
        Financial compensation for my participation in this study will only
        happen upon full completion of the provided task;
      </li>
      <li>
        My participation in this study contributes to scientific development and
        is in no way benefiting commercial purposes;
      </li>
      <li>
        If I enable tracking through Google Analytics, my responses may be
        analysed using information from third party cookies;
      </li>
      <li>All my responses will be processed anonymously;</li>
      <li>
        The anonymous responses may be shared with other researchers and appear
        in academic publications;
      </li>
      <li>
        This research project has been approved by the designated ethics officer
        at UCL;
      </li>
      <li>
        I may contact UCL with any additional questions or complaints through
        <a href="mailto:ucbtszh@ucl.ac.uk">ucbtszh@ucl.ac.uk</a>. If I feel my
        complaint has not been handled satisfactorily, I can contact the UCL
        Research Ethics Committee at
        <a href="mailto:scs.ethics@ucl.ac.uk">scs.ethics@ucl.ac.uk</a>;
      </li>
      <li>This study is expected to take no longer than 30 minutes.</li>
    </ul>
    <br />

    <p v-show="!isProlificUser">
      Your unique ID is: <b>{{ this.$user }}</b>
    </p>
    <br />

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
      >Continue</v-btn
    >
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import Vue from "vue";
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
      isProlificUser: false,
      setID: null,
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
      }
    },
  },
  beforeCreate() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    if (urlParams.has("PROLIFIC_PID")) {
      let uuid = urlParams.get("PROLIFIC_PID");
      Vue.prototype.$user = uuid;
      Vue.prototype.$isProlificUser = true;
      this.isProlificUser = true;
    } else {
      let uuid = [...Array(32)]
        .map(() => Math.random().toString(36)[2])
        .join("");
      this.setID = uuid;
      Vue.prototype.$user = uuid;
      Vue.prototype.$isProlificUser = false;
    }

    if (urlParams.has("cond")) {
      let cond = urlParams.get("cond");
      Vue.prototype.$condition = cond;
    } else {
      var conditions = ["ivBtn", "ivNudge", "ivScore", "control"];
      var random = Math.floor(Math.random() * conditions.length);
      Vue.prototype.$condition = conditions[random];
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
