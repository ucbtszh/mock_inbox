<template>
  <div id="surveys">
    <div v-show="showFeedback">
        <Debrief @done="showCode = true; showFeedback = false; scrollUp()" />
    </div>
    <div v-show="showCode">
        <CompCode />
    </div>
  </div>
</template>

<script>
import Debrief from "../components/Debrief.vue";
import CompCode from "../components/CompletionCode.vue";

export default {
  components: {
    Debrief,
    CompCode
  },
  data() {
    return {
      showFeedback: true,
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
