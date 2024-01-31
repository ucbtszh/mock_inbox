<template>
  <div style="margin-top: 1%; padding-bottom: 2%">
    thank you for accepting our order. Enclosed we are sending you the invoice
    for the construction work. Please check the invoice - as we were able to
    procure the necessary materials cheaper than expected, you will have to pay
    less than originally agreed. This offer is limited. Please make sure you
    send the money within the next 24 hours. Have a nice day!<br /><br />

    Your Glorious Builders Team<br /><br />

    Our Contact Details:<br />

    234 Tulip Avenue<br />
    Portland, Oregon<br />
    United States of America<br />
    Email: contact@glorious-builders.com<br />
    Our Phone: +1 353 5555 874<br /><br /><br />

    <div class="email-attachment">
      <div class="attachment-icon"></div>
      <div class="attachment-details">
        <p class="attachment-filename">Order invoice.pdf.exe</p>
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
