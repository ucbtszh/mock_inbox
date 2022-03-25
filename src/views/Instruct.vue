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

export default {
  data() {
    return {};
  },
  components: {
    InstructTxt,
  },
  mounted() {
    window.scrollTo(0, 0);
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
