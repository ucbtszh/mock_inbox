<template>
  <div id="end">
    <div>
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
          elevation="3"
          @click="saveFeedback()"
          >NEXT</v-btn
        >
      </v-form>
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
    };
  },
  methods: {
    saveFeedback() {
      // console.log("feedback", responses)
      this.writeResponseData(this.$user, "feedback", {"feedback": this.feedbackResponse});
      this.$emit("done")
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
