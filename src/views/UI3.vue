<template>
  <div>
    <Inbox :condition="$order[2]" />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";

export default {
  components: {
    Inbox,
  },
  mounted() {
    setTimeout(() => this.$router.push("UI4"), 420000);
  },
};
</script>
