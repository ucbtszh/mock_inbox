<template>
  <div id="welcome">
    <b>Welcome!</b><br /><br />
    <p>
      Thank you for your interest in this research.<br />
      We are interested in whether a new job application assessment task could
      be used in real job application assessments for administrative roles. In
      this study, you will be asked to categorize e-mails as an executive
      assistant into a number of categories.<br />
      For each accurately categorized e-mail, you will receive a bonus payment
      of £0.05, up to a total of £2.35.<br /><br />
      This study is being undertaken by researchers from University College
      London (UCL).<br />
      Before proceeding, please carefully read the following.
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

    <v-col md="8">
      <v-row>
        <v-form ref="consentForm" v-model="valid">
          <v-checkbox
            v-model="gaOptIn"
            label="Check this box if you agree to enable tracking through Google Analytics."
          >
          </v-checkbox>
          <v-text-field
            label="Your Worker ID *"
            hint="* Required to make sure your participation in this study is backed up correctly."
            persistent-hint
            outlined
            :rules="[(v) => v.length >= 1 || 'Please fill in your Worker ID.']"
            v-model="workerId"
            v-if="!this.$isProlificUser"
          ></v-text-field
          ><br />
          <vue-recaptcha
            ref="recaptcha"
            sitekey="6Ldh5G4aAAAAAEHos3fj-ICnwn37wRGkg8FHtrgq"
            :loadRecaptchaScript="true"
            @verify="showButton = true"
          ></vue-recaptcha
          ><br />
          <v-btn
            v-show="showButton"
            color="primary"
            :disabled="!valid"
            elevation="3"
            @click="
              setUserID();
              login();
              randomCondition();
              disableTracking();
              $router.push('instruct');
            "
            >Continue</v-btn
          >
        </v-form>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import Vue from "vue";

import { auth } from "../firebaseConfig";

export default {
  name: "consent",
  metaInfo: {
    title: "Consent form | Online e-mail filter study",
    titleTemplate: null,
  },
  components: { VueRecaptcha },
  data() {
    return {
      workerId: "",
      valid: true,
      showButton: false, // set to true for debugging locally
      gaOptIn: false,
    };
  },
  methods: {
    randomCondition() {
      if (Vue.prototype.$condition) return;
      else {
        var conditions = ["cless", "hless", "bless"];
        var random = Math.floor(Math.random() * conditions.length);
        Vue.prototype.$condition = conditions[random];
      }
    },
    disableTracking() {
      if (this.gaOptIn) {
        this.$ga.enable();
        Vue.prototype.$GA = 1
      }
      if (!this.gaOptIn) {
        this.$ga.disable();
        Vue.prototype.$GA = 0
      }
    },
    login() {
      auth.signInAnonymously();
      // .catch(function(error) {
      //   console.log(error)
      // });
    },
    setUserID() {
      if (!this.$user) {
        let uuid = [...Array(32)]
          .map(() => Math.random().toString(36)[2])
          .join("");
        Vue.prototype.$user = uuid;
        Vue.prototype.$workerId = this.workerId;
      } else return;
    },
  },
  beforeMount() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    
    if (urlParams.has("PROLIFIC_PID")) {
      let uuid = urlParams.get("PROLIFIC_PID");
      Vue.prototype.$user = uuid;
      this.workerId = uuid;
      Vue.prototype.$workerId = this.workerId;
      Vue.prototype.$isProlificUser = true;
    } else {
      Vue.prototype.$isProlificUser = false;
    }

    if (urlParams.has("cond")) {
      let cond = urlParams.get("cond");
      Vue.prototype.$condition = cond;
    }
  },
};
</script>

<style scoped>
#welcome {
  margin-top: 5%;
  overflow: hidden;
}
</style>
