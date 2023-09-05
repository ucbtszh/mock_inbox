<template>
  <div>
    In the e-mail interface you saw, we added the following funcionality:<br /><br />

    <img :src="ivScreenshotImg" /><br /><br />
    
    <v-form v-model="valid">
      <v-radio-group label="'Did you make use of it while processing the e-mails?'" :rules="[(v) => !!v || 'Please answer this question.']"><br/>
        <v-radio>Yes</v-radio>
        <v-radio>No</v-radio>
      </v-radio-group><br/>
      <Likert :item="'How easy or difficult did you find it to understand what this functionality was for?'" :leftExtreme="'Very easy'" :rightExtreme="'Very difficult'" /><br/>
      <Likert :item="'How useful did you find this functionality?'" :leftExtreme="'Very useful'" :rightExtreme="'Not useful at all'" /><br/>
      <v-radio-group label="'Would you use this functionality in your own e-mail?" :rules="[(v) => !!v || 'Please answer this question.']"><br/>
        <v-radio>Yes</v-radio>
        <v-radio>No</v-radio>
      </v-radio-group><br/>
      <v-textarea label="'What would you change about or add to this functionality?'"></v-textarea><br/>
      <Likert :item="'How would you rate its overall user-friendliness?'" :leftExtreme="'Very user-friendly'" :rightExtreme="'Not user-friendly at all'" />

    <v-btn :disabled="!valid" type="submit" @click="$router.push('surveys')">
      Next
    </v-btn>
</v-form>
  </div>
</template>

<script>
import Likert from "../components/Likert.vue";

export default {
  components: {
    Likert
  },
  data() {
    return {
      valid: false,
    };
  },
};
</script>
