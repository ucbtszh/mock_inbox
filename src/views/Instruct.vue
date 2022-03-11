<template>
  <div id="instruction">
    <InstructTxt /><br />
    You can review these instructions at any time during the task through the
    "help" icon:<br /><br />
    <img src="../assets/ss_help.png" width="100%" /><br /><br />

    Click "START" below to go to the inbox.
    <br /><br /><br />
    <v-btn elevation="3" @click="$router.push('inbox')" color="success"
      >Start</v-btn
    >
  </div>
</template>

<script>
import InstructTxt from "../components/InstructTxt.vue";
import { writeMetaUser } from "../utils/firestore";

export default {
  data() {
    return {};
  },
  components: {
    InstructTxt,
  },
  mounted() {
    window.scrollTo(0, 0);

    let metaInfo = {
      starttime: Date.now(),
      condition: this.$condition,
      prolific_user: this.$isProlificUser,
      browser_width: window.innerWidth,
      browser_height: window.innerHeight,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };
    writeMetaUser(this.$user, metaInfo);
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
