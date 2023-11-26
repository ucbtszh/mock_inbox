<template>
  <div>
    <Inbox
      :emls="emails"
      :UI="'ETRAY'"
      @next="$router.push('surveys')"
    />
  </div>
</template>

<script>
import Inbox from "../components/Inbox.vue";
import emails from "../assets/ui1_emls.json";
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
      condition: 'ETRAY_STUDY',
      // prolific_user: this.$isProlificUser,
      browser_width: window.innerWidth,
      browser_height: window.innerHeight,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };
    if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
    }
    this.writeMetaUser(this.$user, metaInfo);
  },
};
</script>
