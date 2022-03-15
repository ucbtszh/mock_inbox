<template>
  <div>
    <Inbox :condition="$order[1]" :emls="emails" />
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
    };
  },
  mounted() {
    setTimeout(() => this.$router.push("UI3"), 420000);
  },
};
</script>
