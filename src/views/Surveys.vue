<template>
  <div id="surveys">
    <div v-show="showNASA">
      <NASA @done="showDemos = true; showNASA = false; scrollUp()" />
    </div>
    <!-- <div v-show="showUsab">
      <Usab />
    </div> -->
    <div v-show="showDemos">
      <Demos />
    </div>
  </div>
</template>

<script>
import Demos from "../components/Demos.vue";
// import Usab from "../components/Usability.vue";
import NASA from "../components/NASA-TLX.vue";

export default {
  components: {
    Demos,
    // Usab,
    NASA,
  },
  data() {
    return {
      showNASA: true,
      showUsab: false,
      showDemos: false,
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
