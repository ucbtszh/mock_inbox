<template>
  <div>
    <Inbox :condition="$order[2]" :emls="emails" />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui3_emls.json"

export default {
  components: {
    Inbox,
  },
  data() {
    return {
      emails: emails
    }
  },
  mounted() {
    setTimeout(() => this.$router.push("UI4"), 420000);
  },
};
</script>
