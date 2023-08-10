<template>
  <div id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)">
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>
      <v-dialog v-model="showHelp" persistent max-width="860px">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            @click="showHelp = true"
            v-on="on"
            dark
            id="help_icon"
            >mdi-help</v-icon
          >
        </template>
        <v-card>
          <v-card-title> Instructions </v-card-title>
          <v-card-text>
            <InstructTxt />
          </v-card-text>
          <v-card-actions>
            &nbsp;
            <v-btn color="success" text @click="showHelp = false">
              <b>Close</b>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      &nbsp;&nbsp;

      <v-icon dark>mdi-account</v-icon>
    </v-toolbar>

    <v-toolbar dense color="rgb(240,240,240)" flat>
      <v-btn depressed :disabled="!emlViewSrc" @click="secondBar = 're'"
        ><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn
      >
      <v-btn depressed :disabled="!emlViewSrc" @click="secondBar = 'fw'"
        ><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
      >
      <v-btn depressed :disabled="!emlViewSrc" @click="secondBar = 'del'"
        ><v-icon>mdi-delete</v-icon>&nbsp;Delete</v-btn
      >
      <v-btn depressed :disabled="!emlViewSrc" @click="secondBar = 'keep'"
        ><v-icon>mdi-archive-outline</v-icon>&nbsp;Keep in inbox</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn depressed @click="sendLabels()" color="secondary"> DONE </v-btn>
    </v-toolbar>

    <v-toolbar v-show="secondBar === 're'">
      <b>Tell us why you would reply to this e-mail:</b>&nbsp;&nbsp;
      <v-btn
        depressed
        @click="
          labelEml('re_request');
          snackbarTxt = 'E-mail labelled as replied to.';
          snackbar = true;
        "
        >Perform or answer request</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('re_urgent');
          snackbarTxt = 'E-mail labelled as replied to.';
          snackbar = true;
        "
        >Needs attention now</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('re_knowmore');
          snackbarTxt = 'E-mail labelled as replied to.';
          snackbar = true;
        "
        >Want to know more</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('re_other');
          snackbarTxt = 'E-mail labelled as replied to.';
          snackbar = true;
        "
        >Other</v-btn
      >
    </v-toolbar>

    <v-toolbar v-show="secondBar === 'fw'">
      <b>Tell us why you would forward this e-mail:</b>&nbsp;&nbsp;
      <v-btn
        depressed
        @click="
          labelEml('fw_dissem');
          snackbarTxt = 'E-mail labelled as forwarded.';
          snackbar = true;
        "
        >Disseminate message</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('fw_outsource');
          snackbarTxt = 'E-mail labelled as forwarded.';
          snackbar = true;
        "
        >Give task to someone else</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('fw_other');
          snackbarTxt = 'E-mail labelled as forwarded.';
          snackbar = true;
        "
        >Other
      </v-btn>
    </v-toolbar>

    <v-toolbar v-show="secondBar === 'del'">
      <b>Tell us why you would delete this e-mail:</b>&nbsp;&nbsp;
      <v-btn
        depressed
        @click="
          labelEml('del_irrel');
          snackbarTxt = 'E-mail labelled as deleted.';
          snackbar = true;
        "
        >Uninteresting or irrelevant</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('del_noact');
          snackbarTxt = 'E-mail labelled as deleted.';
          snackbar = true;
        "
        >No action required</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('del_spam');
          snackbarTxt = 'E-mail labelled as deleted.';
          snackbar = true;
        "
        >Spam</v-btn
      >
      <v-btn
        depressed
        @click="
          labelEml('del_phish');
          snackbarTxt = 'E-mail labelled as deleted.';
          snackbar = true;
        "
        >Phishing</v-btn
      >
      &nbsp;
      <v-btn
        depressed
        @click="
          labelEml('del_other');
          snackbarTxt = 'E-mail labelled as deleted.';
          snackbar = true;
        "
        >Other</v-btn
      >
    </v-toolbar>

    <div v-show="secondBar === 'keep'">
      <v-toolbar>
        <b>Tell us why you would keep this e-mail in the inbox:</b>&nbsp;&nbsp;
        <v-btn
          depressed
          @click="
            keepEml('keep_later');
            snackbarTxt = 'E-mail labelled as kept in inbox.';
            snackbar = true;
          "
          >Deal with it later</v-btn
        >&nbsp;
        <v-btn
          depressed
          @click="
            keepEml('keep_ref');
            snackbarTxt = 'E-mail labelled as kept in inbox.';
            snackbar = true;
          "
          >For future reference</v-btn
        >
        &nbsp;
        <v-btn
          depressed
          @click="
            keepEml('keep_other');
            snackbarTxt = 'E-mail labelled as kept in inbox.';
            snackbar = true;
          "
          >Other
        </v-btn>
      </v-toolbar>
    </div>

    <v-main>
      <v-row>
        <v-col cols="4" style="min-width: 525px">
          <v-card style="height: 100vh; overflow: auto">
            <v-card-title>Inbox</v-card-title>

            <v-list>
              <v-list-item-group
                active-class="blue lighten-5"
                v-model="emlViewIndex"
              >
                <template v-for="(eml, index) in emls">
                  <v-list-item
                    @click="displayEml(eml.bodyURL)"
                    @pointerover="emlHoverIndex = index"
                    :id="'eml_tn_' + index"
                    :key="index"
                  >
                    <template v-slot:default="{ active }">
                      <v-row>
                        <v-col
                          cols="1"
                          style="margin-top: 23px; margin-left: 5px"
                        >
                          <v-icon v-show="active | (emlHoverIndex == index)">
                            {{
                              !active
                                ? "mdi-checkbox-blank-circle-outline"
                                : "mdi-check-circle"
                            }}
                          </v-icon>
                        </v-col>

                        <v-col
                          style="
                            margin-top: 5px;
                            margin-bottom: 5px;
                            width: 400px;
                          "
                        >
                          <v-list-item-title
                            style="line-height: 1.5em"
                            :id="'eml_tn_from_name_' + index"
                            >{{ eml.fromName }}</v-list-item-title
                          >

                          <v-list-item-subtitle>
                            <div
                              style="float: left; line-height: 1.5em"
                              :id="'eml_tn_subj_' + index"
                            >
                              {{ eml.subject.substr(0, 57) }}
                            </div>
                            <div
                              style="float: right; line-height: 1.5em"
                              :id="'eml_tn_time_' + index"
                            >
                              Wed
                              {{ eml.time }}
                            </div>
                          </v-list-item-subtitle>

                          <div
                            style="
                              font-size: 14px;
                              line-height: 1.5em;
                              width: 400px;
                              display: inline-block;
                              text-overflow: ellipsis;
                              overflow: hidden;
                              white-space: nowrap;
                            "
                            :id="'eml_tn_preview_' + index"
                          >
                            {{ eml.previewTxt }}
                          </div>
                        </v-col>
                      </v-row>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ snackbarTxt }}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>

        <v-col style="height: 100vh; overflow: auto">
          <v-card
            v-for="(eml, index) in emls"
            :key="index"
            :id="'eml_' + index"
          >
            <div v-if="index == emlViewIndex">
              <v-card-title :id="'eml_head_subj_' + index"
                ><div class="subject">
                  {{ eml.subject }}
                </div></v-card-title
              >

              <v-alert
                outlined
                type="warning"
                dense
                border="left"
                v-if="($cond == 't') & (eml.score > scoreThreshold)"
                class="iv"
                :id="'iv_score_' + index"
              >
                <b>Are you sure you can trust this e-mail?</b><br />
                <!-- TODO: DETERMINE TEXT TO DISPLAY -->
                Double check the sender's e-mail address and any URLs in the
                e-mail before communicating further with them.
              </v-alert>

              <div>
                <v-row>
                  <v-col cols="11">
                    <div class="initial" :id="'eml_head_initial_' + index">
                      {{ eml.fromName.substr(0, 1).toUpperCase() }}
                    </div>
                    <div style="margin-left: 65px">
                      <div
                        class="from-name"
                        :id="'eml_head_from_name_' + index"
                      >
                        {{ eml.fromName }}&nbsp;&lt;{{ eml.fromEml }}&gt;
                      </div>
                      <div class="time" :id="'eml_head_time_' + index">
                        Wed 12 Oct, {{ eml.time }}
                      </div>
                      <div class="to" :id="'eml_head_to_' + index">
                        To:&nbsp;&nbsp;{{ eml.toEml }}<br />
                        <p v-if="eml.CCeml.length > 0">CC: {{ eml.CCeml }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <iframe
                  :src="eml.bodyURL"
                  :height="eml.height + 26"
                  :id="'eml_body_' + index"
                  ref="iframe"
                />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import db from "../utils/firestore";
// import tracking from "../utils/track_ui";
import InstructTxt from "./InstructTxt.vue";

export default {
  components: {
    InstructTxt,
  },
  props: ["emls", "UI"],
  mixins: [db],
  data: () => ({
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    secondBar: "",
    showHelp: false,
    labels: {},
    timeout: 3000,
    snackbar: false,
    snackbarTxt: "",
    scoreThreshold: 0.5, // TODO: DOUBLE CHECK ACCORDING TO EXPERIMENTS WHAT VALUE TO USE
  }),
  methods: {
    displayEml(src) {
      this.emlViewSrc = src;
      try {
        document.getElementById("eml_body_" + this.emlViewIndex).src = src;
        this.secondBar = "";
      } catch (TypeError) {
        // console.log("iframe is null");
      }
    },
    labelEml(label) {
      this.labels[this.emlViewSrc] = label;
      document.getElementById("eml_" + this.emlViewIndex).style.display =
        "none";
      document.getElementById("eml_tn_" + this.emlViewIndex).style.display =
        "none";
      this.emlViewSrc = null;
      this.emlViewIndex = null;
      this.secondBar = "";
    },
    keepEml(label) {
      this.labels[this.emlViewSrc] = label;
      this.secondBar = "";
    },
    sendLabels() {
      // SEND EML LABELS TO DB
      var n_labelled = Object.keys(this.labels).length;

      if (n_labelled < this.emls.length) {
        alert("You have not processed all e-mails yet.");
      } else {
        this.writeResponseData(this.$user, "emlLabels" + this.UI, this.labels);
        this.$router.push("surveys");
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    // prevent participants from navigating back to the instructions page
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  },
};
</script>

<style scoped>
#inbox {
  background-color: rgb(248, 248, 248);
}

#outlook-sign {
  font-size: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
}

.v-btn {
  text-transform: none !important;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
}

.subject {
  font-size: 16pt;
  font-weight: bold;
}

.initial {
  height: 40px;
  width: 40px;
  background-color: indigo;
  border-radius: 50%;
  float: left;
  font-size: 12pt;
  color: white;
  text-align: center;
  line-height: 2.5em;
  margin-top: 5px;
  margin-left: 15px;
}

.from-name {
  margin-right: 5px;
}

.from-eml {
  line-height: 1.8em;
}

.time {
  font-size: 9pt;
  color: gray;
  line-height: 1.8em;
  margin-bottom: 3px;
}

.to {
  font-size: 11pt;
}

iframe {
  width: 95%;
  border: 0;
  display: block;
  margin-left: 58px;
  padding: 0;
}
</style>
