<template>
  <div id="instruction">
    Imagine that you are Alex Carter, an executive director of a fictive company
    called Anneon.<br /><br />

    Your task in this study is to process Alex' e-mails as you would do as an
    executive director.<br /><br />

    You will see a simulated version of Alex Carter's Outlook inbox.<br />
    It contains 47 e-mails that need to be handled adequately:<br /><br />

    <img src="../assets/ss_inbox_control.png" width="100%" /><br /><br />

    You need to select one of the e-mails and then any of the available options
    that you find applicable. The options are similar to what you would
    typically find in your Outlook e-mail inbox:<br /><br />
    <ul>
      <li><b>Reply</b>: allows you to reply to the sender of the e-mail</li>
      <li>
        <b>Forward</b>: allows you to forward the e-mail to your executive
        assistant to take care of it
      </li>
      <li><b>Archive</b>: will move the e-mail to an archive</li>
      <li><b>Delete</b>: will delete the e-mail</li>
      <li>
        <b>Junk</b>: will mark the e-mail as junk and move it to the junk folder
      </li>
    </ul>
    <br />

    When you are done processing all e-mails, click "DONE":<br /><br />
    <img src="../assets/ss_done.png" width="100%" /><br /><br />

    You can review these instructions at any time during the task through the
    "help" icon:<br /><br />
    <img src="../assets/ss_help.png" width="100%" /><br /><br />

    Click "START" below to go to the inbox.
    <br /><br /><br />
    <v-btn elevation="3" @click="$router.push('inbox')">Start</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#instruction {
  margin-top: 3%;
  width: 960px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  font-size: 16pt;
}
</style>
