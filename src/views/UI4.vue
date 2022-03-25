<template>
  <div>
    <Inbox
      :condition="$order[3]"
      :emls="emails"
      :UI="'UI4'"
      @next="end = true"
      v-if="!end"
    />
    <h2 style="text-align: center">You have completed the task.</h2>
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
};
</script>
