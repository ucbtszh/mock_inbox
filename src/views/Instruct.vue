<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="instruction">
          <h2>Instructions</h2><br/>
          <p>
            In this exercise, you will be asked to prioritize various tasks,
            initiate actions, process information, make decisions, and/or
            coordinate deadlines in a meaningful way.
          </p>
          <p>
            <b>Please put yourself in the following situation:</b> <br />

            ATCL (American Telecommunication Company Ltd.) has established a new
            division in Portland, Oregon in April 2022 to build the 5G network
            in the United States of America. You are <b>A. Jones</b>, the
            <b>head of this department</b>. You oversee the organization and
            implementation of all necessary processes and are therefore
            responsible for the success of the project.
          </p>
          <p>
            The organogram below shows the organizational structure of the
            employees relevant to you.
          </p>
          <img src="../assets/etray_instruct.png" width="100%" /><br /><br />

          Click on the blue arrow on the right to continue.<br/><br/><br/>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="instruction">
          <p>
            Today is <b>Wednesday, August 13, 2022</b>. You were on vacation
            last week and did not check your emails. You have already arrived at
            the office at <b>7:00 a.m.</b> to complete the tasks at hand.<br /><br />

            <b>You have 40 minutes</b> to process the emails you have received,
            as you will no longer be in the office from
            <b>7:40 a.m.</b> onwards, because you have a number of other
            appointments. You will not be able to reach any of your co-workers
            or business partners, as the official start of work is not until
            <b>8:00 a.m.</b>. However, you can send a message to your secretary,
            <b>Mr. Amin</b>.<br /><br />

            The order in which you process them is entirely up to you. Your task
            is to choose what you think is the
            <b>best applicable action for each email.</b><br /><br />
            <img src="../assets/ss_inbox_control.png" width="100%" />
          </p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="instruction">
          The inbox has similar functionalities to what you typically find in an
          actual email inbox.<br />
          To process an email, click on an email in the list on the left.<br />
          The full email will be displayed on the right. <br /><br />

          All available actions that you can take with the selected email are
          displayed in the bar above the emails.<br /><br />

          <ul>
            <li>
              <b>Reply</b>: allows you to reply to the sender of the email.
            </li>
            <li>
              <b>Forward</b>: forward the email to your executive assistant
              (EA), so the EA can take care of it. You do not need to type an
              extra message for this action.
            </li>
            <li><b>Archive</b>: move the email to an archive.</li>
            <li><b>Delete</b>: delete the email.</li>
            <li>
              <b>Report as phishing</b>: report the phishing email to the IT
              department.
            </li>
          </ul>
          <br />
          When you are done processing all emails, click "<b>DONE</b>":<br /><br />
          <img src="../assets/ss_done.png" width="100%" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="instruction">
          You can review these instructions at any time during the task through
          the "help" icon:<br /><br />
          <img src="../assets/ss_help.png" width="100%" /><br /><br />
          Next, you will be asked a few questions to make sure you understand
          the task.
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="instruction">
          <ComprehensionCheck />
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ComprehensionCheck from "../components/ComprehensionCheck.vue";

import "swiper/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ComprehensionCheck,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.instruction {
  margin-top: 3%;
  width: 960px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  font-size: 16pt;
}
.swiper {
  overflow: hidden;
}
</style>
