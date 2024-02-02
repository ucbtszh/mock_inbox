<template>
  <div style="margin-top: 1%; padding-bottom: 2%">
    Hi A. Jones,<br /><br />
    You missed a scheduled Zoom conference meeting from 020-2085-5***.
    <div class="meeting">
      <b>Topic:</b> Scheduling new projects (orders & payments)<br />
      <b>Time:</b> August 10, 2022 08:30 AM (GMT)<br />
      <b>Duration:</b> 0:20 minutes<br /><br />
      Check your missed conference below!<br />
      <a
        href="about:blank"
        @click="
          parentFunction('https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1')
        "
        target="_blank"
        title="https://ngrok.io/b31d032cfdcf47a399990a71e43c5d2a"
        >https://us0_4web.zom.us/8224394218</a
      >
    </div>
    <div class="footer">
      Meeting ID: 822 439 42019299<br />
      Zoom will only keep this message for 48 hours.
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
