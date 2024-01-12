<template>
  <div id="end">
    <div v-show="showPurpose">
      <b>This is the end of the study.</b><br /><br />

      <b>What do you think was the purpose of this study?</b><br /><br />
      <v-form v-model="isValid">
        <v-textarea
          auto-grow
          outlined
          rows="4"
          label=""
          style="width: 575px"
          v-model="feedbackResponse"
          :rules="[(v) => !!v || 'Please answer this question.']"
        ></v-textarea>
        <v-btn elevation="3" color="primary" @click="saveFeedback()" :disabled="!isValid"
          >NEXT</v-btn
        >
      </v-form>
    </div>

    <div v-show="showDebrief">
      Dear Participant,<br /><br />

      Thank you for participating in our studies ‘TITLE OF TASK 1 AS USED IN
      PROLIFIC’ and ‘TITEL OF TASK 2 AS USED IN PROLIFIC’. This debriefing aims
      to clarify the connection between these two tasks, as they are part of the
      same research project on phishing e-mails.<br /><br />

      <b>Part 1: TITLE AS USED IN PORLIFIC</b><br />
      The study commenced with a phishing e-mail detection training three weeks
      ago, during which you crafted phishing e-mails from the perspective of a
      cybercriminal. The training aimed to equip you with knowledge and skills
      to recognize and avoid falling victim to phishing e-mail attempts.
      <br /><br />
      <b>Part 2: TITLE AS USED IN PORLIFIC</b><br />
      Today, you participated in the ‘e-tray exercise’ to measure your ability
      to detect phishing e-mails. It was important that you were not made aware
      in advance that this exercise was directly associated with the earlier
      phishing training, so that you were unaware that the e-tray contained
      simulated phishing emails. These elements were necessary to simulate a
      real phishing attack under realistic circumstances. <br /><br />

      <b>Study Objective and Ethical Considerations</b><br />
      Together, these two tasks aimed to assess the real-world applicability of
      the acquired knowledge from the phishing training. Your responses in the
      e-tray exercise provide valuable insights into the effectiveness of the
      training. These studies were previously approved by our university’s
      Research Ethics Committee and, accordingly, adheres to ethical guidelines
      that rigorously maintain your privacy and confidentiality. If you have any
      concerns or questions, please e-mail us at research@mx.uni-saarland.de.We
      appreciate your commitment to advancing our understanding of
      cybersecurity. The insights we gain will contribute to developing better
      training programs.<br /><br /><br />

      <v-btn @click="$emit('done')" color="primary">OK</v-btn>
    </div>
  </div>
</template>

<script>
import db from "../utils/firestore";

export default {
  name: "end",
  metaInfo: {
    titleTemplate: "End of study",
  },
  mixins: [db],
  data() {
    return {
      isValid: true,
      feedbackResponse: "",
      showDebrief: false,
      showPurpose: true,
    };
  },
  methods: {
    saveFeedback() {
      if (!this.$user) {
        this.$user = localStorage.getItem("userUUID");
      }
      // console.log("feedback", responses)
      this.writeResponseData(this.$user, "feedback", {
        studyPurpose: this.feedbackResponse,
      });
      this.showDebrief = true;
      this.showPurpose = false;
    },
  },
};
</script>

<style scoped>
#end {
  margin-top: 3%;
  width: 950px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
</style>
