<template>
  <div style="margin-top: 1%; padding-bottom: 2%">
    <img
      src="https://www.allaboutlean.com/wp-content/uploads/2019/11/Microsoft-Logo-1024x219.png"
      width="300"
    /><br /><br />
    <b
      >We have noticed suspicious activities on your Microsoft account.<br /><br />
      Due to security reasons we request you to reset the password for your
      Microsoft <br /><br />
      Online Services Account.<br /><br />
      Click now on the link below and then follow the instructions in your web
      browser:<br /><br /><br />

      <h3>
        <a
          @click="parentFunction('https://www.microsoft.com')"
          href="https://www.microsoft.com"
          target="_blank"
          >Reset your password now</a
        ><br /><br />

        If you not reset your password in the next 3 days your Microsoft Online
        Services account will be locked.
      </h3></b
    >
    <br /><br />
    Microsoft Cooperation | One Microsoft Way Redmond, WA 98052-6399
    <br />
    This message was sent from an unmonitored email adress. Please do not reply
    to this message.
  </div>
</template>

<script>
import "./styles.css";

export default {
  props: {
    parentFunction: Function,
  },
};
</script>
