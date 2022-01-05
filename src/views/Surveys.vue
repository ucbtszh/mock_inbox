<template>
  <div id="surveys">
    <div v-show="showSUS">
      <SUS @done="showDemos = true; showSUS = false; scrollUp()" />
    </div>
    <div v-show="showDemos">
      <Demos />
    </div>
  </div>
</template>

<script>
import Demos from "../components/Demos.vue";
import SUS from "../components/SUS.vue";

export default {
  components: {
    Demos,
    SUS,
  },
  data() {
    return {
      showSUS: true,
      showDemos: false
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
