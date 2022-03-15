<template>
  <div>
    <Inbox :condition="$order[1]" :emls="emails" v-if="!end" />
    <div>You have completed the task.</div>
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/stimuli_eml_full_shuffled.json";

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
