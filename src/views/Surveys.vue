<template>
  <div id="surveys">
    <div v-show="showSUS">
      <SUS @done="showFeedback = true; showSUS = false; scrollUp()" />
    </div>
    <div v-show="showFeedback">
        <Debrief @done="showCode = true; showFeedback = false; scrollUp()" />
    </div>
    <div v-show="showCode">
        <CompCode />
    </div>
  </div>
</template>

<script>
import SUS from "../components/SUS.vue";
import Debrief from "../components/Debrief.vue";
import CompCode from "../components/CompletionCode.vue";

export default {
  components: {
    SUS,
    Debrief,
    CompCode
  },
  data() {
    return {
      showSUS: true,
      showFeedback: false,
      showCode: false
    };
  },
  methods: {
    scrollUp() {
      window.scrollTo(0,0)
    }
  }
};
</script>

<style scoped>
#surveys {
  margin-top: 3%;
  width: 950px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
</style>
