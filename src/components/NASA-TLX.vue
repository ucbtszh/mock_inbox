<template>
  <div>
    <v-row>
      <v-col>
        We are not only interested in assessing your use of the inbox, but also
        the experiences you had during the task. Below we describe the technique
        that will be used to examine your experiences. In the most general
        sense, we are examining the "workload" you experienced. Workload is a
        difficult concept to define precisely, but a simple one to understand
        generally. The factors that influence your experience of workload may
        come from the task itself, your feelings about your own performance, how
        much effort you put in, or the stress and frustration you felt. Physical
        components of workload are relatively easy to conceptualize and
        evaluate. However, the mental components of workload may be more
        difficult to measure. Since workload is something that is experienced
        individually by each person, there are no effective "rulers" that can be
        used to estimate the workload of different activities.
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        One way to find out about workload is to ask people to describe the
        feelings they experienced. Because workload may be caused by many
        different factors, we would like you to evaluate several of them
        individually rather than lumping them into a single global evaluation of
        overall workload. This set of six rating scales was developed for you to
        use in evaluating your experiences during different tasks.
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <b>Please read the descriptions of the scales carefully.</b> It is
        extremely important that they are clear to you. Further below, please
        evaluate the e-mail processing task by indicating on each of the six
        scales at the point which matches your experience. Each line has two
        endpoint descriptors that describe the scale. Note that "performance"
        goes from "good" on the left to "poor" on the right. Please consider
        your responses carefully. Consider each scale individually. Your ratings
        will play an important role in the evaluation being conducted. Thus,
        your active participation is essential to the success of this experiment
        and is greatly appreciated by all of us.
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2"> MENTAL DEMAND </v-col>
      <v-col>
        How much mental and perceptual activity was required (e.g., thinking,
        deciding, calculating, remembering, looking, searching, etc.)? Was the
        task easy or demanding, simple or complex, exacting or forgiving?
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">PHYSICAL DEMAND</v-col>
      <v-col>
        How much physical activit,y was required (e.g.. pushing, pulling,
        turning, controlling, activating. etc.)? Was the task easy or demanding.
        slow or brisk. slack or strenuous, restful or laborious?
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">TEMPORAL DEMAND</v-col>
      <v-col>
        How much physical activity was required (e.g.. pushing, pulling,
        turning, controlling, activating. etc.)? Was the task easy or demanding.
        slow or brisk. slack or strenuous, restful or laborious?
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">PERFORMANCE</v-col>
      <v-col>
        How successful do you think you were in accomplishing the goals of the
        task set by the experimenter (or yourself)? How satisfied were you with
        your performance in accomplishing these goals?
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">EFFORT</v-col>
      <v-col>
        How hard did you have to work (mentally and physically) to accomplish
        your level of performance?
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">FRUSTRATION LEVEL</v-col>
      <v-col>
        How insecure, discouraged, irritated, stressed and annoyed versus
        secure, gratified, content, relaxed and complacent did you feel during
        the task?
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <b
          >PLACE A MARK ON EACH SCALE THAT REPRESENTS THE MAGNITUDE OF EACH
          FACTOR IN THE E-MAIL TASK YOU JUST PERFORMED:</b
        >
      </v-col>
    </v-row>

    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="2"> MENTAL DEMAND </v-col>
        <v-col>
          <v-slider
            v-model="MD"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Low </template>
            <template v-slot:append> High </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> PHYSICAL DEMAND </v-col>
        <v-col>
          <v-slider
            v-model="PD"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Low </template>
            <template v-slot:append> High </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> TEMPORAL DEMAND </v-col>
        <v-col>
          <v-slider
            v-model="TD"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Low </template>
            <template v-slot:append> High </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> PERFORMANCE </v-col>
        <v-col>
          <v-slider
            v-model="PE"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Good </template>
            <template v-slot:append> Poor </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> EFFORT </v-col>
        <v-col>
          <v-slider
            v-model="EF"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Low </template>
            <template v-slot:append> High </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> FRUSTRATION LEVEL </v-col>
        <v-col>
          <v-slider
            v-model="FL"
            step="5"
            min="0"
            max="100"
            ticks="always"
            :rules="[(v) => !!v || 'Please answer this question']"
          >
            <template v-slot:prepend> Low </template>
            <template v-slot:append> High </template>
          </v-slider>
        </v-col> </v-row
      ><br />
      <v-btn :disabled="!valid" @click="validate()" color="success"
        >Submit</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import db from "../utils/firestore";

export default {
  data() {
    return {
      valid: true,
      MD: null,
      PD: null,
      TD: null,
      PE: null,
      EF: null,
      FL: null,
    };
  },
  mixins: [db],
  methods: {
    validate() {
      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }
      if (this.$refs.form.validate()) {
        let formResponse = {
          "mental demand": this.MD,
          "physical demand": this.PD,
          "temporal demand": this.TD,
          performance: this.PE,
          effort: this.EF,
          frustration: this.FL,
        };
        this.writeResponseData(this.$user, "NASA-TLX", formResponse);
        this.$emit("done");
      } else {
        return;
      }
    },
  },
};
</script>
