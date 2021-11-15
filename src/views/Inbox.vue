<template>
  <div id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)">
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>

      <v-dialog v-model="showHelp" persistent max-width="860px">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" @click="showHelp = true" v-on="on" dark
            >mdi-help</v-icon
          >
        </template>
        <v-card>
          <v-card-title> Instructions </v-card-title>
          <v-card-text>
            <InstructTxt />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showHelp = false">
              <b>Close</b>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      &nbsp;&nbsp;

      <v-icon dark>mdi-account</v-icon>
    </v-toolbar>

    <v-toolbar dense color="rgb(240,240,240)" flat>
      <v-btn depressed :disabled="!emlViewSrc" @click="showReply = true"
        ><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn
      >
      <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="
          labelEml('fw');
          snackbarTxt = 'E-mail forwarded to executive assistant';
          snackbar = true;
        "
        ><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
      >
      <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="
          labelEml('del');
          snackbarTxt = 'Deleted e-mail';
          snackbar = true;
        "
        ><v-icon>mdi-delete</v-icon>&nbsp;Delete</v-btn
      >
      <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="
          labelEml('arch');
          snackbarTxt = 'E-mail moved to archive';
          snackbar = true;
        "
        ><v-icon>mdi-archive-outline</v-icon>&nbsp;Archive</v-btn
      >
      <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="
          labelEml('junk');
          snackbarTxt = 'E-mail reported as junk';
          snackbar = true;
        "
        ><v-icon>mdi-block-helper</v-icon>&nbsp;Junk</v-btn
      >
      <v-btn depressed :disabled="!emlViewSrc" @click="labelEml('mali')" v-if="$condition == 'ivBtn'"
        ><v-icon>mdi-check</v-icon>&nbsp;Check for malice</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn depressed color="secondary" @click="sendLabels()">DONE</v-btn>
    </v-toolbar>

    <v-dialog v-model="nudge" persistent max-width="860">
      <template v-slot:activator="{ on, attrs }">
        <v-alert
          outlined
          type="warning"
          dense
          border="left"
          dismissible
          v-if="$condition == 'ivNudge'"
          v-bind="attrs"
          v-on="on"
        >
          {{ nudgeTxt }}
        </v-alert>
      </template>
      <v-card>
        <img src="../assets/ss_nudge_ex.png" /><br /><br />
        <v-card-text>
          <b>Why it is suspicious:</b>
          <ul>
            <li>
              The e-mail claims to be from Zoom, but the e-mail domain is
              'formidable.it'.
            </li>
            <li>
              The link displayed in the e-mail is not the same as the actual
              destination when you hover over the link.
            </li>
            <li>The actual link is from a suspicious domain, 'ngrok.io'.</li>
          </ul>
          <br />
          <u>Do not interact with similar e-mails.</u>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="nudge = false">
            <b>Close</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <v-row>
        <v-col cols="4">
          <v-card style="height: 100vh; overflow: auto">
            <v-card-title>Inbox</v-card-title>

            <v-list>
              <v-list-item-group
                active-class="blue lighten-5"
                v-model="emlViewIndex"
              >
                <template v-for="(eml, index) in emls">
                  <v-list-item
                    :key="index"
                    @click="displayEml(eml.bodyURL)"
                    @pointerover="emlHoverIndex = index"
                    :id="eml.bodyURL"
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

                        <v-col style="margin-top: 5px; margin-bottom: 5px">
                          <v-list-item-title style="line-height: 1.5em">{{
                            eml.fromName
                          }}</v-list-item-title>

                          <v-list-item-subtitle>
                            <div style="float: left; line-height: 1.5em">
                              {{ eml.subject.substr(0, 57) }}
                            </div>
                            <div style="float: right; line-height: 1.5em">
                              {{ eml.date }}
                            </div>
                          </v-list-item-subtitle>

                          <div style="font-size: 14px; line-height: 1.5em">
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
          <v-card v-for="(eml, index) in emls" :key="index" :id="index">
            <div v-if="index == emlViewIndex">
              <div v-if="showReply">
                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                  To: {{ eml.fromEml }}
                </p>
                <vue-editor
                  v-model="replyTxt"
                  :editor-toolbar="customToolbar"
                ></vue-editor>
                <v-btn
                  :disabled="replyTxt == null"
                  type="submit"
                  color="primary"
                  @click="
                    labelEml('re');
                    sendReply();
                    snackbarTxt = 'Reply sent';
                    snackbar = true;
                  "
                  >Send</v-btn
                >
              </div>

              <v-card-title
                ><div class="subject">{{ eml.subject }}</div></v-card-title
              >
              <v-alert
                outlined
                type="warning"
                dense
                border="left"
                v-if="($condition == 'ivScore') & (eml.junkScore > 0.5)"
                class="iv"
              >
                <b>Are you sure you can trust this e-mail?</b><br />
                Junk filters rate this e-mail as <b>{{ eml.junkScore }}</b> on a
                scale of 0 (trustworthy) to 1 (highly suspicious).<br />
                Please double check the sender's e-mail address and any URLs in
                the e-mail before communicating further with them.
              </v-alert>

              <div class="initial">
                {{ eml.fromName.substr(0, 1) }}
              </div>
              <div id="header" style="margin-left: 65px">
                <div class="from-name" id="eml_from_name">
                  {{ eml.fromName }}&nbsp;&lt;{{ eml.fromEml }}&gt;
                </div>
                <div class="time" id="eml_timing">
                  {{ eml.date }}&nbsp;{{ eml.time }}
                </div>
                <div class="to" id="eml_to">
                  To:&nbsp;&nbsp;{{ eml.toEml }}<br />
                  <p v-if="eml.CCeml.length > 0">CC: {{ eml.CCeml }}</p>
                </div>
              </div>
              <iframe
                :src="eml.bodyURL"
                :height="eml.height + 26"
                id="eml-msg"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import emails from "../assets/stimuli_eml_full_shuffled.json";
import { VueEditor } from "vue2-editor";
import db from "../utils/firestore";
import InstructTxt from "../components/InstructTxt.vue";

export default {
  components: {
    VueEditor,
    InstructTxt,
  },
  mixins: [db],
  data: () => ({
    emls: emails,
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    showHelp: false,
    labels: {},
    showReply: false,
    replyTxt: null,
    replies: {},
    nudge: false,
    nudgeTxt:
      "This e-mail was reported as suspicious today by one of our colleagues (click to show):",
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "" }, { align: "center" }, { align: "right" }],
    ],
    timeout: 2000,
    snackbar: false,
    snackbarTxt: "E-mail",
  }),
  methods: {
    displayEml(src) {
      this.emlViewSrc = src;
      try {
        document.getElementById("eml-msg").src = src;
      } catch (TypeError) {
        // console.log("iframe is null");
      }
    },
    labelEml(label) {
      this.labels[this.emlViewSrc] = label;
      document.getElementById(this.emlViewSrc).style.display = "none";
      document.getElementById(this.emlViewIndex).style.display = "none";
      this.emlViewSrc = null;
      this.emlViewIndex = null;
      // console.log(this.labels);
    },
    sendLabels() {
      // SEND EML LABELS TO DB
      if ((this.labels.length < 47) | (this.labels.length == null)) {
        alert(
          "You have not processed all e-mails yet. All e-mails should have disappeared when you've processed everything."
        );
      } else {
        this.writeResponseData(this.$user, "emlLabels", this.labels);
        this.writeResponseData(this.$user, "replyMsg", this.replies);
        this.$router.push("surveys");
      }
    },
    sendReply() {
      // SEND REPLY MESSAGE TO DB
      this.replies[this.emlViewSrc] = this.replyTxt;
      // console.log(this.replies);
      this.writeResponseData(this.$user, "replyMsg", this.replies);
      this.showReply = false;
      this.replyTxt = null;
    },
    addEventListeners() {
      // TODO: WRITE TO REAL-TIME DATABASE

      let ivs = document.getElementsByClassName("iv"); // we know what IV these events relate to because we know the conditional display of each user
      let events = [
        "click",
        "dblclick",
        "pointerover",
        "pointerout",
        "selectionchange",
        "pointermove",
      ];
      for (let iv in ivs) {
        events.forEach(
          iv.addEventListener((event) => {
            this.writeResponseData(this.$user, event, { ts: event.timeStamp });
          })
        );
      }
    },
    mounted() {
      window.scrollTo(0, 0);
    },
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
