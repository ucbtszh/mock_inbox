<template>
  <div>
    <Inbox :condition="$order[3]" :emls="emails" v-if="!end" />
    <div>You have completed the task.</div>
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui4_emls.json";

export default {
  components: {
    Inbox,
  },
  data() {
    return {
      emails: emails,
      end: false,
    };
  },
  mounted() {
    setTimeout(() => (this.end = true), 420000);
  },
};
</script>
