<template>
  <div id="welcome">
    <v-alert v-if="usesMouse()">
      <!-- https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType -->
      It seems that you are not using a mouse to interact with your computer.
      <br />
      It is important for this study that you use a mouse. If you cannot do so,
      please return to Prolific. If you can, please use your mouse to continue.
    </v-alert>

    <h1 style="text-align: center">Welcome!</h1>
    <br />
    <p>
      Thank you for your interest in this research. We are testing new designs
      for the Outlook email client. You will be asked to process emails in a
      simulated Outlook inbox. This study is being undertaken by researchers
      from Saarland University (UdS), Lahore University of Management Sciences
      (LUMS) and College London (UCL). Before proceeding, please carefully read
      the following.<br /><br />
    </p>
    <b
      >By signing this consent form and clicking “Continue” below, I understand
      that: </b
    ><br /><br />
    <ul>
      <li>
        I declare that I will complete the tasks seriously and as accurate as
        possible.
      </li>
      <br />
      <li>
        My participation in this study is completely voluntary and I can leave
        at any time without giving a reason by closing the web browser. If I do
        this, any data I provided will be deleted.
      </li>
      <br />

      <li>
        My participation in this study contributes to scientific development and
        is in no way benefiting commercial purposes.
      </li>
      <br />
      <li>
        All my responses will be processed anonymously. The anonymous responses
        may be shared with other researchers and appear in academic
        publications. This research project has been approved by the designated
        ethics officer at Saarland University.
      </li>
      <br />
      <li>
        I may contact Saarland University with any additional questions or
        complaints through
        <a href="research@mx.uni-saarland.de">research@mx.uni-saarland.de</a>.
        If I feel my complaint has not been handled satisfactorily, I can
        contact the Saarland University Research Ethics Committee at
        <a href="ckoenig@mx.uni-saarland.de">ckoenig@mx.uni-saarland.de</a>.
      </li>
      <br />
      <li>This study is expected to take no longer than 40 minutes.</li>
    </ul>
    <br /><br />

    <!-- Why do we collect and process your data?
The data collection in this survey serves exclusively scientific purposes according to § 27 BDSG. After data collection and possible feedback to participants, the data will be completely anonymized. In addition, further storage and processing take place completely anonymously.

What kind of personal data is collected and processed and for how long?
We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this data protection declaration. 
In order to carry out our study, we use your personal data in compliance with the applicable data protection regulations. In the following, we would therefore like to explain which of your personal data will be collected and stored. You will also receive information on how your data is used and what rights you have with regard to the use of your data.
The following data will then be stored and analyzed in anonymized form:
•	Demographic data
•	The recorded study variables

Information on the rights of data subjects
You have the right to:
Pursuant to Art. 15 DSGVO, request information about your personal data processed by us. In particular, you may request information about the purposes of processing, the category of personal data, the categories of recipients to whom your data have been or will be disclosed, the planned storage period, the existence of a right to rectification, erasure, restriction of processing or objection, the existence of a right of complaint, the origin of your data if it has not been collected by us, and the existence of automated decision-making, including profiling, and, where applicable, meaningful information about its details; 
Pursuant to Art. 16 DSGVO, to request without delay the correction of incorrect or completion of your personal data stored by us; Pursuant to Art. 17 DSGVO, to request the deletion of your personal data stored by us, unless the processing is necessary for the exercise of the right to freedom of expression and information, for compliance with a legal obligation, for reasons of public interest or for the assertion, exercise or defense of legal claims; 
Pursuant to Art. 18 DSGVO, to request the restriction of the processing of your personal data, insofar as the accuracy of the data is disputed by you, the processing is unlawful, but you object to its erasure and we no longer require the data, but you need it for the assertion, exercise or defense of legal claims or you have objected to the processing pursuant to Art. 21 DSGVO; 
Pursuant to Art. 20 DSGVO, to receive your personal data that you have provided to us in a structured, common and machine-readable format or to request that it be transferred to another controller; 
In accordance with Art. 7 (3) DSGVO, to revoke your consent given to us at any time. This has the consequence that we may no longer continue the data processing based on this consent in the future; 
and 
Complain to a supervisory authority in accordance with Art. 77 DSGVO. As a rule, you can contact the supervisory authorities of your usual place of residence or workplace or our registered office for this purpose.
Information about the right to withdraw consent
You have the right to withdraw your participation in this study and your consent to the use of your data at any time. We reserve the right to analyze the data according to the research purpose until a possible revocation. 
You confirm that you are at least 18 years old, that you have read this consent form or had it read to you, that your questions about it have been answered to your satisfaction and that you are participating in this study voluntarily -->

    <!-- <p v-show="!$isProlificUser">
      Your unique ID is: <b>{{ this.$user }}</b>
    </p>
    <br /> -->

    <VueRecaptcha
      ref="recaptcha"
      sitekey="6LfEiy0dAAAAAOHnW3FYObBmao1oPBqx9W6kmXGV"
      :loadRecaptchaScript="true"
      @verify="showButton = true"
      style="margin: auto; width: 50%"
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
    title: "Consent form | Online email filter study",
    titleTemplate: null,
  },
  components: { VueRecaptcha },
  data() {
    return {
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
      localStorage.setItem("userUUID", uuid);
      localStorage.setItem("isProlificUser", true);
    } else {
      let uuid = [...Array(32)]
        .map(() => Math.random().toString(36)[2])
        .join("");
      // let uuid = "LOCAL_TEST"; ONLY USE FOR TESTING PURPOSES
      this.setID = uuid;
      Vue.prototype.$user = uuid;
      Vue.prototype.$isProlificUser = false;
      localStorage.setItem("userUUID", uuid);
      localStorage.setItem("isProlificUser", false);
    }

    // change this code to change set of emails based on condition (if required)
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
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
</style>
