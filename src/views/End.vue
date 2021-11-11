<template>
  <div id="end">
    <div v-show="showFeedback">
      <b>You made it.</b> This is the end of the study.<br /><br />

      <b>Could this study be improved in any way?</b><br />
      We are eager to improve the presentation of this study to improve the
      quality of responses.<br />
      As an experienced survey taker, you have a better grasp of what works in
      these kinds of tasks than we do.<br />
      Please tell us what could be improved, so we can adapt this study for
      future participants:<br /><br />
      <v-form>
        <v-textarea
          auto-grow
          outlined
          rows="4"
          label="Your feedback"
          style="width: 575px"
          v-model="feedbackResponse"
        ></v-textarea>
        <v-btn
          color="primary"
          elevation="3"
          :disabled="!isValid"
          @click="saveFeedback()"
          >NEXT</v-btn
        >
      </v-form>
    </div>

    <div id="end" v-show="showEnd">
        <CompletionCode />
    </div>
  </div>
</template>

<script>
import db from "../utils/firestore";
import CompletionCode from "../components/CompletionCode.vue";

export default {
  name: "end",
  metaInfo: {
    titleTemplate: "End of study",
  },
  components: { CompletionCode },
  mixins: [db],
  data() {
    return {
      isValid: true,
      showFeedback: true,
      showEnd: false,
      feedbackResponse: "",
    };
  },
  methods: {
    saveFeedback() {
      this.showFeedback = false;
      this.showEnd = true;
      let responses = {
        feedback: this.feedbackResponse,
      };
      // console.log("feedback", responses)
      this.writeResponseData(this.$user, "feedback", responses);
    },
  },
};
</script>

<style scoped>
#end {
  margin-top: 10%;
}
</style>
