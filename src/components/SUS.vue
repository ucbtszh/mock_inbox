<template>
  <div>
    We would like to know how you experienced using the inbox.<br />
    Please indicate how much you agree with each of the below statements.<br /><br />
    <v-form v-model="isValid" ref="form">
      <Scale
        v-for="(item, index) in items"
        :key="'item' + index"
        :item="item.item"
        :leftExtreme="'Strongly disagree'"
        :rightExtreme="'Strongly agree'"
        @answered="saveResponse"
      />
      <v-btn
        color="primary"
        elevation="3"
        :disabled="!isValid"
        @click="validate()"
      >
        NEXT
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import items from "../assets/SUS.json";
import Scale from "./Likert.vue";
import db from "../utils/firestore";

export default {
  components: {
    Scale,
  },
  mixins: [db],
  data() {
    return {
      items: items,
      responses: {},
      isValid: true,
    };
  },
  methods: {
    saveResponse(event) {
      this.responses[event[0]] = event[1];
    },
    validate() {
      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }
      
      if (this.$refs.form.validate()) {
        try {
          this.writeResponseData(this.$user, "SUS", this.responses);
          this.$emit("done");
        } catch (error) {
          alert("Could not submit data.", error);
        }
      } else return;
    },
  },
};
</script>
