<template>
  <div>
    You have finished processing all e-mails. Below you will be asked several
    questions about your experience in doing so.
    <div v-show="showNASA">
      <NASA />
    </div>
    <div v-show="showUsab">
      <Usab />
    </div>
    <div v-show="showDemos">
      <Demos />
    </div>
  </div>
</template>

<script>
import Demos from "../components/Demos.vue";
import Usab from "../components/Usability.vue";
import NASA from "../components/NASA-TLX.vue";

export default {
  components: {
    Demos,
    Usab,
    NASA,
  },
  data() {
    return {
      showNASA: true,
      showUsab: false,
      showDemos: false,
    };
  },
};
</script>
