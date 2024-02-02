<template>
  <div id="comprehension">
    <div id="c1" v-show="showC1">
      <v-form v-model="isvalid">
        You play the role of A. Jones, the Head of Department for ATCL's
        endeavour to build the 5G network in the USA.<br />
        <v-radio-group
          :rules="[(v) => !!v || 'Please answer this question.']"
          v-model="c1"
        >
          <v-radio value="1" label="True"></v-radio>
          <v-radio value="0" label="False"></v-radio>
        </v-radio-group>
        <v-btn
          color="success"
          elevation="3"
          :disabled="!isvalid"
          @click="
            c1clicks++;
            validateC1();
          "
        >
          Submit
        </v-btn><br/>
        <div v-show="c1clicks == 1" style="color: red">
          {{ warning }}
        </div>
      </v-form>
    </div>
    <div id="c2" v-show="showC2">
      <v-form v-model="isvalid2">
        What is the name of your secretary?<br />
        <v-radio-group
          :rules="[(v) => !!v || 'Please answer this question.']"
          v-model="c2"
        >
          <v-radio value="a" label="Chris Bond"> </v-radio>
          <v-radio value="b" label="Riley Smith"> </v-radio>
          <v-radio value="c" label="Anand Amin"> </v-radio>
        </v-radio-group>
        <v-btn
          color="success"
          elevation="3"
          :disabled="!isvalid2"
          @click="
            c2clicks++;
            validateC2();
          "
        >
          Submit
        </v-btn><br/>
        <div v-show="c2clicks == 1" style="color: red">
          {{ warning }}
        </div>
      </v-form>
    </div>
    <div id="c3" v-show="showC3">
      <v-form v-model="isvalid3">
        My task is to...<br />
        <v-radio-group
          :rules="[(v) => !!v || 'Please answer this question.']"
          v-model="c3"
        >
          <v-radio value="a" label="...process all e-mails as fast as I can.">
          </v-radio>
          <v-radio
            value="b"
            label="...memorise e-mails that are most important for ATCL's expansion efforts."
          >
          </v-radio>
          <v-radio
            value="c"
            label="...choose the best applicable action for each e-mail in any order of my preference."
          >
          </v-radio>
        </v-radio-group>
        <v-btn
          color="success"
          elevation="3"
          :disabled="!isvalid3"
          @click="
            c3clicks++;
            validateC3();
          "
        >
          Submit
        </v-btn><br/>
        <div v-show="c3clicks == 1" style="color: red">
          {{ warning }}
        </div>
      </v-form>
    </div>

    <div id="c4" v-show="showC4">
      Well done!<br /><br />
      Click "START" below to go to the inbox.
      <br /><br /><br />
      <v-btn elevation="3" @click="$router.push('UI')" color="success"
        >Start</v-btn
      >
    </div>
  </div>
</template>

<script>
import db from "../utils/firestore";

export default {
  mixins: [db],
  data() {
    return {
      c1: "",
      c2: "",
      c3: "",
      c1clicks: 0,
      c2clicks: 0,
      c3clicks: 0,
      showC1: true,
      showC2: false,
      showC3: false,
      showC4: false,
      isvalid: false,
      isvalid2: false,
      isvalid3: false,
      warning:
        "This answer is incorrect. You have one attempt left. Please review the instructions before your next attempt. When you use the blue arrows on the side to go back through the instructions and come back here, you will be directed to this question again.",
    };
  },
  methods: {
    validateC1: function () {
      if ((this.c1clicks == 2) & (this.c1 == 0)) {
        this.$router.push("returnsub");
      } else if (this.c1 == 1) {
        this.showC1 = false;
        this.showC2 = true;
      }
    },
    validateC2: function () {
      if ((this.c2clicks == 2) & (this.c2 !== "c")) {
        this.$router.push("returnsub");
      } else if (this.c2 === "c") {
        this.showC2 = false;
        this.showC3 = true;
      }
    },
    validateC3: function () {
      if ((this.c3clicks == 2) & (this.c3 !== "c")) {
        this.$router.push("returnsub");
      } else if (this.c3 === "c") {
        this.showC3 = false;
        this.showC4 = true;
      }
    },
    saveAttempts: function () {
      let data = {
        c1attempts: this.c1clicks,
        c2attempts: this.c2clicks,
        c3attempts: this.c3clicks,
        c1: this.c1,
        c2: this.c2,
        c3: this.c3,
      };
      // console.log("comp checks")
      this.writeResponseData(this.$uuid, "comprehension", data);
    },
  },
};
</script>
