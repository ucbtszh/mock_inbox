<template>
  <div>
    <Inbox
      :condition="$order[0]"
      :emls="emails"
      :UI="'UI1'"
      @next="$router.push('UI2')"
    />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui1_emls.json";

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
    // TODO: manual continue to next view with certain keyboard combination?
  },
};
</script>
