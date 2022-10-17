<template>
  <div id="instruction">
    <InstructTxt /><br />
    You can review these instructions at any time during the task through the
    "help" icon:<br /><br />
    <img src="../assets/ss_help.png" width="100%" /><br /><br />

    Click on the button below to confirm that you understood the task and are
    ready to start.<br /><br /><br />

    <v-btn
      elevation="3"
      @click="
        $router.push('inbox');
        logDuration(Date.now());
      "
      color="success"
      >I understand</v-btn
    ><br /><br /><br />
  </div>
</template>

<script>
import InstructTxt from "../components/InstructTxt.vue";
import tracking from "../utils/track_ui";
import fs from "../utils/firestore";

export default {
  data() {
    return {
      startInstruct: "",
    };
  },
  mixins: [tracking, fs],
  components: {
    InstructTxt,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.startInstruct = Date.now();
  },
  methods: {
    logDuration(endTime) {
      let duration = { duration: endTime - this.startInstruct };
      this.writeResponseData(this.$user, "instructDuration", duration);
    },
  },
};
</script>

<style scoped>
#instruction {
  margin-top: 3%;
  width: 960px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  font-size: 16pt;
}
</style>
