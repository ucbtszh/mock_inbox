<template>
  <div id="surveys">
    <div v-show="showDemos">
      <Demos @done="showCode = true; showDemos = false; scrollUp()" />
    </div> 
    <div v-show="showCode">
        <CompCode />
    </div>
  </div>
</template>

<script>
import Demos from "../components/Demos.vue";
import CompCode from "../components/CompletionCode.vue";

export default {
  components: {
    Demos,
    CompCode
  },
  data() {
    return {
      showDemos: true,
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
