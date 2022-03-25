<template>
  <div>
    <Inbox
      :condition="$order[2]"
      :emls="emails"
      :UI="'UI3'"
      @next="$router.push('UI4')"
    />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui3_emls.json";

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
