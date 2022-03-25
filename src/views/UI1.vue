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
    // TODO: manual continue to next view with certain keyboard combination?

    let metaInfo = {
      starttime: Date.now(),
      condition: this.$order,
      // prolific_user: this.$isProlificUser,
      browser_width: window.innerWidth,
      browser_height: window.innerHeight,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };
    this.writeMetaUser(this.$user, metaInfo);
  },
};
</script>
