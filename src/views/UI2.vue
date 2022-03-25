<template>
  <div>
    <Inbox
      :condition="$order[1]"
      :emls="emails"
      :UI="'UI2'"
      @next="$router.push('UI3')"
    />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui2_emls.json";

export default {
  components: {
    Inbox,
  },
  data() {
    return {
      emails: emails,
    };
  },
};
</script>
