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
        v-model="formResponse.edLev"
        persistent-hint
        :rules="[(v) => !!v || 'Education level is required']"
      >
        <div class="statement">
          What is the highest education level that you completed?
        </div>
        <v-radio
          v-for="(e, index) in edLev"
          :key="index"
          :label="e.label"
          :value="e.value"
        ></v-radio> </v-radio-group
      ><br />

      <v-textarea
        outlined
        v-model="formResponse.feedback"
        label="Do you have any concerns or other feedback for this study?"
        :rules="[(v) => v.length > 5 || 'Please answer this question.']"
      ></v-textarea>

      <v-textarea
        outlined
        v-model="formResponse.purpose"
        label="What do you think is the purpose of this study?"
        :rules="[(v) => v.length > 5 || 'Please answer this question.']"
      ></v-textarea
      ><br /><br />

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
      formResponse: {
        age: "",
        gender: "",
        edLev: "",
        purpose: "",
        feedback: "",
      },
      ageBracks: [
        {
          label: "18-25",
          value: 1,
        },
        {
          label: "26-35",
          value: 2,
        },
        {
          label: "36-45",
          value: 3,
        },
        {
          label: "46-55",
          value: 4,
        },
        {
          label: "56-65",
          value: 5,
        },
        {
          label: "Over 65",
          value: 6,
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
      edLev: [
        {
          label:
            "GCSE Level education (e.g., GCSE, O-Levels or Standards) or lower",
          value: 1,
        },
        {
          label: "A-Level education (e.g., A, AS, S-Levels, Highers)",
          value: 2,
        },
        {
          label: "Some undergraduate education (e.g., No completed degree)",
          value: 3,
        },
        {
          label: "Degree / Graduate education (e.g., BSc, BA)",
          value: 4,
        },
        {
          label: "Postgraduate education (e.g., MSc, MA, MBA, PhD)",
          value: 5,
        },
        {
          label: "Vocational education (e.g., NVQ, HNC, HND)",
          value: 6,
        },
        {
          label: "Prefer not to say",
          value: 7,
        },
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
