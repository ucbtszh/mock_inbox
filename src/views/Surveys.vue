<template>
  <div id="surveys">
    <div v-show="showUsab">
      <Usab @done="showDemos = true; showUsab = false;" />
    </div>
    <div v-show="showDemos">
      <Demos @done="showEnd = true; showDemos = false; scrollUp()" />
    </div> 
    <div v-show="showEnd">
      <b>This is the end of the study.</b><br /><br />
      Thank you very much for participating! <br/>
      You may now close this window.
    </div>
  </div>
</template>

<script>
import Usab from "../components/Usability.vue"
import Demos from "../components/Demos.vue";

export default {
  components: {
    Usab, 
    Demos
  },
  data() {
    return {
      showUsab: true,
      showDemos: false,
      showEnd: false
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
