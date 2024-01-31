<template>
  <div style="margin-top: 1%; padding-bottom: 2%">
    Dear Mr. Jones,<br /><br />

    We are writing to you on behalf of the City Police Portland, Oregon
    regarding a criminal investigation we are currently conducting. <br /><br />

    You are obligated to carefully review the attached document and respond to
    us as soon as possible.<br /><br />

    Please note that failure to respond promptly to this request may result in
    legal actions against you and your company.<br /><br /><br />

    Sincerely,<br />
    City Police Portland, Oregon<br /><br /><br />

    <div class="email-attachment">
      <div class="attachment-icon"></div>
      <div class="attachment-details">
        <p class="attachment-filename">case-234981.zip</p>
      </div>
      <a
        @click="
          parentFunction('https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1')
        "
        class="download-link"
        target="_blank"
        href="https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1"
        >Download</a
      >
    </div>
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
