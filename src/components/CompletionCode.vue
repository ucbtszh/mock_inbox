<template>
  <div id="completion">
    Thank you very much for participating in this study. <br />
    We greatly appreciate your time and effort in doing so. <br /><br />

    <div id="completioncode" v-show="this.$user.length != 24">
      <b>Your completion code:</b> {{ completionCode }}
      <v-btn
        color="primary"
        elevation="3"
        @click="
          copyCode();
          copyText = 'Copied!';
        "
        >{{ copyText }}</v-btn
      >
    <br /><br />
    <b>Make sure to copy this unique code,</b> so you can log your participation
    in this study in your account and obtain your compensation. <br />
    </div>

    <div id="prolific-return" v-show="this.$isProlificUser">
      Click the button below to go back to Prolific and log your participation in this study.<br /><br />
      <v-btn color="primary" elevation="3" :href="ccURL" link>Go back to Prolific</v-btn>
    </div>
  </div>
</template>

<script>
import db from "../utils/firestore"

export default {
  data() {
    return {
      completionCode:
        "ETRAY" +
        this.$user.substr(0, 3),
      copyText: "Copy",
      ccURL: "https://prolific.co"
    };
  },
  mixins: [db],
  methods: {
    copyCode: function() {
      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }
      navigator.clipboard.writeText(this.completionCode);
      let complete = {
        ts: Date.now(),
        code: this.completionCode,
      }
      this.writeResponseData(this.$user, 'completion_code', complete)
    },
  },
  beforeCreate() {
    if (!this.$user) {
      this.$user = localStorage.getItem('userUUID');
    } 
    if(!this.$isProlificUser) {
      this.$isProlificUser = localStorage.getItem('isProlificUser');
    }
  }
};
</script>

<style scoped>
#completioncode {
  border: 3px solid black;
  padding: 15px 15px;
  display: inline-block;
}
</style>
