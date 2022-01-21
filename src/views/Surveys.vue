<template>
  <div id="surveys">
    <div v-show="showSUS">
      <SUS @done="showDemos = true; showSUS = false; scrollUp()" />
    </div>
    <div v-show="showDemos">
      <Demos @done="showFeedback = true; showDemos = false; scrollUp()" />
    </div>
    <div v-show="showFeedback">
        <Improve @done="showCode = true; showFeedback = false; scrollUp()" />
    </div>
    <div v-show="showCode">
        <CompCode />
    </div>
  </div>
</template>

<script>
import Demos from "../components/Demos.vue";
import SUS from "../components/SUS.vue";
import Improve from "../components/Improv.vue";
import CompCode from "../components/CompletionCode.vue";

export default {
  components: {
    Demos,
    SUS,
    Improve,
    CompCode
  },
  data() {
    return {
      showSUS: true,
      showDemos: false,
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
