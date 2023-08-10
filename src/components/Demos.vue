<template>
  <div id="demographics">
    <v-form v-model="isValid" ref="form">
      <v-radio-group v-model="formResponse.age">
        <div class="statement">What age bracket do you belong to?</div>
        <v-radio
          v-for="(age, index) in ageBracks"
          :key="index"
          :label="age.label"
          :value="age.value"
        ></v-radio>
      </v-radio-group>

      <v-radio-group
        v-model="formResponse.gender"
        :rules="[(v) => !!v || 'Gender is required']"
      >
        <div class="statement">What gender do you identify with?</div>
        <v-radio
          v-for="(g, index) in gender"
          :key="index"
          :label="g.label"
          :value="g.value"
        ></v-radio>
      </v-radio-group>

      <v-radio-group
        v-model="formResponse.bg"
        :rules="[(v) => !!v || 'Please answer this question']"
      >
        <div class="statement">Which of the following applies to you?</div>
        <v-radio
          v-for="(g, index) in bg"
          :key="index"
          :label="g.label"
          :value="g.value"
        ></v-radio>
      </v-radio-group>

      <v-radio-group
        v-model="formResponse.lastTrain"
        :rules="[(v) => !!v || 'Please answer this question']"
      >
        <div class="statement">
          When did you last complete a cybersecurity or phishing awareness
          training?
        </div>
        <v-radio
          v-for="(g, index) in lastTrain"
          :key="index"
          :label="g.label"
          :value="g.value"
        ></v-radio>
      </v-radio-group>

      <v-card-text>
        <v-slider
          v-model="formResponse.emlDep"
          :max="6"
          @click="emlDepClick = true"
          :rules="[
            emlDepClick || 'Please answer this question',
          ]"
          step="1"
          ticks="always"
          tick-size="15"
          required
          ><template v-slot:prepend>
            <h4>Not dependent at all</h4>
          </template>
          <template v-slot:append>
            <h4>Highly dependent</h4>
          </template>
        </v-slider>
      </v-card-text>

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
  name: "demographics",
  metaInfo: {
    titleTemplate: "Demographics survey",
  },
  mixins: [db],
  data() {
    return {
      isValid: true,
      emlDepClick: false,
      formResponse: {
        age: "",
        gender: "",
        bg: "",
        lastTrain: "",
        emlDep: "",
      },
      ageBracks: [
        {
          label: "18-25",
          value: 1,
        },
        {
          label: "26-30",
          value: 2,
        },
        {
          label: "31-35",
          value: 3,
        },
        {
          label: "36-40",
          value: 4,
        },
        {
          label: "41-45",
          value: 5,
        },
        {
          label: "46-50",
          value: 6,
        },
        {
          label: "51-55",
          value: 7,
        },
        {
          label: "56-60",
          value: 8,
        },
        {
          label: "60-64",
          value: 9,
        },
        {
          label: "65 or over",
          value: 10,
        },
      ],
      gender: [
        {
          label: "female",
          value: 1,
        },
        {
          label: "male",
          value: 2,
        },
        {
          label: "non-binary",
          value: 3,
        },
        {
          label: "other",
          value: 4,
        },
        {
          label: "prefer not to say",
          value: 5,
        },
      ],
      bg: [
        { label: "I have a technical background", value: 1 },
        { label: "I have a non-technical background", value: 2 },
        { label: "Prefer not to say", value: 0 },
      ],
      lastTrain: [
        { label: "Less than a month ago", value: 1 },
        { label: "1-6 months ago", value: 2 },
        { label: "7-12 months ago", value: 3 },
        { label: "More than 12 months ago", value: 4 },
        { label: "Do not remember", value: 0 },
      ],
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.writeResponseData(this.$user, "demos", this.formResponse);
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
