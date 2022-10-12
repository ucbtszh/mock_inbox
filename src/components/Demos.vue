<template>
  <div id="demographics">
    <v-form v-model="isValid" ref="form">
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
        ></v-radio> </v-radio-group
      >

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

      <v-text-field
        outlined
        v-model="formResponse.age"
        style="width: 200px"
        label="What is your age?"
        :rules="[(v) => (v >= 18 && v < 100) || 'You entered an invalid age.']"
      ></v-text-field
      >

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
        ></v-radio>
      </v-radio-group>

      <v-select
        label="What industry is your current study/primary working experience in?"
        outlined
        :items="industry"
      >
      </v-select>

      <v-text-field
        v-model="formResponse.workExp"
        label="'How many years of professional working experience do you have?'"
        type="number"
        :rules="[(v) => !!v || 'Please answer this question']"
      ></v-text-field>
      <v-radio-group
        v-model="formResponse.orgSize"
        :rules="[(v) => !!v || 'Orgnisational size is required']"
      >
        <div class="statement">
          How many employees does the organisation you work in have?
        </div>
        <v-radio
          v-for="(o, index) in orgSize"
          :key="index"
          :label="o.label"
          :value="o.value"
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
        ></v-radio>
      </v-radio-group>

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
        occStatus: "",
        industry: "",
        workExp: "",
        orgSize: "",
        income: "",
        edLev: "",
        purpose: "",
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
      orgSize: [
        { label: "Less than 50 employees", value: "1" },
        { label: "50-250 employees", value: "2" },
        { label: "More than 250 employees", value: "3" },
        { label: "I currently do not work", value: "4" },
      ],
      industry: [
        // based on https://www.ilo.org/global/industries-and-sectors/lang--en/index.htm
        "Agriculture",
        "Basic metal production",
        "Chemical industries",
        "Commerce",
        "Construction",
        "Education",
        "Financial services",
        "Food, drink or tobacco",
        "Forestry",
        "Health services",
        "Hotels, tourism or catering",
        "Mining",
        "Mechanical and electrical engineering",
        "Media, culture",
        "Oil and gas production",
        "Postal and telecommunication services",
        "Public service",
        "Shipping",
        "Textiles",
        "Transport",
        "Utilities (water, gas, electricity)",
      ],
      income: [
        {
          label: "Under £20,000",
          value: 1,
        },
        {
          label: "£20,001 – £40,000",
          value: 2,
        },
        {
          label: "£40,001 – £60,000",
          value: 3,
        },
        {
          label: "£60,001 – £80,000",
          value: 4,
        },
        {
          label: "£80,001 – £100,000",
          value: 5,
        },
        {
          label: "£100,001 or over",
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
