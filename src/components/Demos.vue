<template>
  <div id="demographics">
    <v-form v-model="isValid">
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
          @click="
            trackResponse({
              name: 'gender',
              ts: Date.now(),
              response: formResponse.gender,
            })
          "
        ></v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="formResponse.occ_status"
        :rules="[(v) => !!v || 'Occupational status is required']"
      >
        <div class="statement">What is your occupational status?</div>
        <v-radio
          v-for="(s, index) in occStatus"
          :key="index"
          :label="s.label"
          :value="s.value"
          @click="
            trackResponse({
              name: 'occupation',
              ts: Date.now(),
              response: formResponse.occ_status,
            })
          "
        ></v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="formResponse.income"
        :rules="[(v) => !!v || 'Annual income is required']"
      >
        <div class="statement">What is your annual income?</div>
        <v-radio
          v-for="(i, index) in income"
          :key="index"
          :label="i.label"
          :value="i.value"
          @click="
            trackResponse({
              name: 'income',
              ts: Date.now(),
              response: formResponse.income,
            })
          "
        ></v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="formResponse.edLev"
        persistent-hint
        hint="If you are currently studying, select your current level of studies."
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
          @click="
            trackResponse({
              name: 'edlev',
              ts: Date.now(),
              response: formResponse.edLev,
            })
          "
        ></v-radio> </v-radio-group
      ><br /><br />
      <v-text-field
        outlined
        v-model="formResponse.age"
        style="width: 200px"
        label="What is your age?"
        :rules="[(v) => (v >= 18 && v < 100) || 'You entered an invalid age.']"
        @change="
          trackResponse({
            name: 'age',
            ts: Date.now(),
            response: formResponse.age,
          })
        "
      ></v-text-field>
      <v-btn
        color="primary"
        :disabled="!isValid"
        @click="
          $router.push('end');
          saveResponses();
        "
      >
        NEXT
      </v-btn>
    </v-form>
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
      isValid: false,
      formResponse: {
        age: "",
        gender: "",
        occ_status: "",
        income: "",
        edLev: "",
      },
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
      ],
      occStatus: [
        {
          label: "student",
          value: 1,
        },
        {
          label: "(self-)employed",
          value: 2,
        },
        {
          label: "unemployed",
          value: 3,
        },
        {
          label: "retired",
          value: 4,
        },
      ],
      income: [
        {
          label: "Under $20,000",
          value: 1,
        },
        {
          label: "$20,001 – $40,000",
          value: 2,
        },
        {
          label: "$40,001 – $60,000",
          value: 3,
        },
        {
          label: "$60,001 – $80,000",
          value: 4,
        },
        {
          label: "$80,001 – $100,000",
          value: 5,
        },
        {
          label: "$100,001 or over",
          value: 6,
        },
        {
          label: "Prefer not to say",
          value: 100,
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
    saveResponses() {
      this.writeResponseData(this.$user, "demos", this.formResponse);
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
