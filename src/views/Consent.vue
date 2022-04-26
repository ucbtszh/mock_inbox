<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      It seems that you are not using a mouse to interact with your computer.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>

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
        Compensation for my participation in this study in the form of Amazon
        vouchers will only happen upon full completion of the provided task;
      </li>
      <li>
        My participation in this study contributes to scientific development and
        is in no way benefiting commercial purposes;
      </li>
      <li>The audio of today's session will be recorded;</li>
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
    <br /> -->

      <!-- <VueRecaptcha
      ref="recaptcha"
      sitekey="6LfEiy0dAAAAAOHnW3FYObBmao1oPBqx9W6kmXGV"
      :loadRecaptchaScript="true"
      @verify="showButton = true"
    /><br /> -->

      <v-btn
        :disabled="!showButton"
        elevation="3"
        color="success"
        @click="
          login();
          setCondOrder(cond);
          $router.push('instruct');
        "
        width="100px"
        >Continue</v-btn
      >
    </v-form>
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
    title: "Consent form | Online e-mail filter study",
    titleTemplate: null,
  },
  // components: { VueRecaptcha },
  data() {
    return {
      setID: null,
      showButton: false,
      uuid: null,
      cond: null,
    };
  },
  methods: {
    login() {
      try {
        signInAnonymously(auth);
        Vue.prototype.$user = this.uuid;
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
    setCondOrder(value) {
      value === "1"
        ? (Vue.prototype.$order = ["control", "ivBtn", "ivNudge", "ivScore"])
        : (Vue.prototype.$order = ["control", "ivBtn", "ivScore", "ivNudge"]);
      // ? (Vue.prototype.$order = ["control", "ivNudge", "ivScore", "ivBtn"])
      // : value === 3
      // ? (Vue.prototype.$order = ["control", "ivNudge", "ivBtn", "ivScore"])
      // : value === 4
      // ? (Vue.prototype.$order = ["control", "ivBtn", "ivScore", "ivNudge"])
      // : value === 5
      // ? (Vue.prototype.$order = ["control", "ivScore", "ivNudge", "ivBtn"])
      // : (Vue.prototype.$order = ["control", "ivScore", "ivBtn", "ivNudge"]);

      // console.log("ORDER", this.$order);
    },
  },
  // beforeCreate() {
  //   let queryString = window.location.search;
  //   let urlParams = new URLSearchParams(queryString);

  //   if (urlParams.has("PROLIFIC_PID")) {
  //     let uuid = urlParams.get("PROLIFIC_PID");
  //     Vue.prototype.$user = uuid;
  //     Vue.prototype.$isProlificUser = true;
  //   } else {
  //     let uuid = [...Array(32)]
  //       .map(() => Math.random().toString(36)[2])
  //       .join("");
  //     this.setID = uuid;
  //     Vue.prototype.$user = uuid;
  //     Vue.prototype.$isProlificUser = false;
  //   }

  //   if (urlParams.has("cond")) {
  //     let cond = urlParams.get("cond");
  //     Vue.prototype.$condition = cond;
  //   } else {
  //     var conditions = ["ivBtn", "ivNudge", "ivScore", "control"];
  //     var random = Math.floor(Math.random() * conditions.length);
  //     Vue.prototype.$condition = conditions[random];
  //   }
  // },
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
