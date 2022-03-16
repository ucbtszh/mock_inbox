<template>
  <div>
    <Inbox :condition="$order[0]" :emls="emails" />
  </div>
</template>

<script>
import Inbox from '../components/Inbox.vue';
import emails from "../assets/ui1_emls.json";

export default {
  components: {
    Inbox
  },
  data() {
    return {
      emails: emails
    }
  },
  mounted() {
      setTimeout(() => this.$router.push('UI2'), 420000)
  }
}
</script>
