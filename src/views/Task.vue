<template>
  <div>
    <Inbox :emls="emails" :UI="'inbox_iv2'" :timeNow="Date.now()" />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/meta_emails.json";
import db from "../utils/firestore";

export default {
  components: {
    Inbox,
  },
  mixins: [db],
  data() {
    return {
      emails: emails,
    };
  },
  mounted() {
    let metaInfo = {
      starttime: Date.now(),
      browser_width: window.innerWidth,
      browser_height: window.innerHeight,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };
    this.writeMetaUser(this.$user, metaInfo);
  },
};
</script>
