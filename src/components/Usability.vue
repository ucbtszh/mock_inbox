<template>
  <div id="usability">
    <v-form v-model="isValid" ref="form">
      <div class="statement">
        How would you rate the overall user-friendliness of the inbox?
      </div>
      <v-card-text>
        <v-slider
          v-model="formResponse.friendly"
          :max="6"
          :rules="[
            !isNaN(formResponse.friendly) || 'Please answer this question',
          ]"
          step="1"
          ticks="always"
          tick-size="15"
          required
          ><template v-slot:prepend>
            <h4>Not user-friendly at all</h4>
          </template>
          <template v-slot:append>
            <h4>Very user-friendly</h4>
          </template>
        </v-slider>
      </v-card-text>

      <div v-show="$cond == 't'">
        How easy/difficult was it to understand the warnings? <br />
        <v-card-text>
          <v-slider
            v-model="formResponse.ease"
            :max="6"
            @click="rated3 = true"
            :rules="[
              !isNaN(formResponse.ease) || 'Please answer this question',
            ]"
            step="1"
            ticks="always"
            tick-size="15"
            required
            ><template v-slot:prepend>
              <h4>Very easy</h4>
            </template>
            <template v-slot:append>
              <h4>Very difficult</h4>
            </template>
          </v-slider>
        </v-card-text>
        <br />

        <div class="statement">
          How useful did you find the e-mail warnings?
        </div>
        <v-card-text>
          <v-slider
            v-model="formResponse.useful"
            :max="6"
            :rules="[
              !isNaN(formResponse.useful) || 'Please answer this question',
            ]"
            step="1"
            ticks="always"
            tick-size="15"
            required
            ><template v-slot:prepend>
              <h4>Not useful at all</h4>
            </template>
            <template v-slot:append>
              <h4>Very useful</h4>
            </template>
          </v-slider>
        </v-card-text>
      </div>

      <div class="statement">What could be improved about this study?</div>
      <v-textarea v-model="formResponse.improve"></v-textarea>

      Please leave any other comments/feedback/questions for us here:
      <v-textarea v-model="formResponse.feedback"></v-textarea>
      <br /><br />

      <v-btn color="primary" :disabled="!isValid" @click="validate()">
        NEXT
      </v-btn>
    </v-form>
    <br /><br /><br />
  </div>
</template>

<script>
import db from "../utils/firestore";

export default {
  name: "usability",
  metaInfo: {
    titleTemplate: "Usability survey",
  },
  mixins: [db],
  data() {
    return {
      isValid: true,
      formResponse: {
        ease: "",
        friendly: 0,
        useful: 0,
        improve: "",
        feedback: "",
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.writeResponseData(this.$user, "usability", this.formResponse);
        this.$emit("done");
      } else {
        return;
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
#demos {
  margin-top: 5%;
}
</style>
