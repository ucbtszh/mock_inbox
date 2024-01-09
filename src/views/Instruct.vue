<template>
  <div id="instruction">
    <InstructTxt /><br />
    You can review these instructions at any time during the task through the
    "help" icon:<br /><br />
    <img src="../assets/ss_help.png" width="100%" /><br /><br />

    Click "START" below to go to the inbox.
    <br /><br /><br />
    <div style="display:flex; justify-content:center; align-items:center;">
    <v-btn style="margin-bottom:2%" elevation="3" @click="$router.push('inbox')" color="success"
      >Start</v-btn>
    </div>
  </div>
</template>

<script>
import InstructTxt from "../components/InstructTxt.vue";
import db from "../utils/firestore";

export default {
  data() {
    return {};
  },
  mixins: [db],
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
    this.writeMetaUser(this.$user, metaInfo);
  },
};
</script>

<style scoped>
#instruction {
  margin-top: 5%;
  width: 960px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
</style>
