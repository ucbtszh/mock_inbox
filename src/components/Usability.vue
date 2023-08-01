<template>
  <div id="usability">
    <v-form v-model="isValid" ref="form">
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
        // "ease": "", TO DO: DEFINE WHAT USABILITY QUESTIONS TO ASK
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
