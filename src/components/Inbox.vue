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
      <v-btn
          @click="
                  showCreated = !showCreated;
                  emlViewIndex = null;
          ">Create</v-btn>

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
      <!-- TODO: implement iv Btn funcionalities -->
      <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="labelEml('mali')"
        v-if="condition == 'ivBtn'"
        class="iv"
        id="iv_btn"
        ><v-icon>mdi-check</v-icon>&nbsp;Check for malice</v-btn
      >
      <v-spacer></v-spacer>
      <!-- <v-btn depressed color="secondary" @click="sendLabels()">DONE</v-btn> -->
    </v-toolbar>

    <v-dialog v-model="nudge" persistent max-width="860">
      <template v-slot:activator="{ on, attrs }">
        <v-alert
          outlined
          type="warning"
          dense
          border="left"
          dismissible
          v-if="condition == 'ivNudge'"
          v-bind="attrs"
          v-on="on"
          class="iv"
          id="iv_nudge"
        >
          {{ nudgeTxt }}
        </v-alert>
      </template>
      <v-card class="iv" id="iv_nudge_pop">
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
            e/li>
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
        <v-col cols="4" style="min-width:525px;">
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
                    :id="'eml_tn_' + index"
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
                          <v-list-item-title
                            style="line-height: 1.5em"
                            :id="'eml_tn_from_name_' + index"
                            >{{ eml.fromName }}</v-list-item-title
                          >

                          <v-list-item-subtitle>
                            <div
                              style="float: left; line-height: 1.5em;"
                              :id="'eml_tn_subj_' + index"
                            >
                              {{ eml.subject.substr(0, 57) }}
                            </div>
                            <div
                              style="float: right; line-height: 1.5em"
                              :id="'eml_tn_time_' + index"
                            >
                              {{ eml.date }}
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
              <div v-if="showReply" :id="'reply_' + index">
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
                v-if="(condition == 'ivScore') & (eml.junkScore > 0.5)"
                class="iv"
                :id="'iv_score_' + index"
              >
                <b>Are you sure you can trust this e-mail?</b><br />
                Junk filters rate this e-mail as <b>{{ eml.junkScore }}</b> on a
                scale of 0 (trustworthy) to 1 (highly suspicious).<br />
                Please double check the sender's e-mail address and any URLs in
                the e-mail before communicating further with them.
              </v-alert>

              <div class="initial" :id="'eml_head_initial_' + index">
                {{ eml.fromName.substr(0, 1) }}
              </div>
              <div style="margin-left: 65px">
                <div class="from-name" :id="'eml_head_from_name_' + index">
                  {{ eml.fromName }}&nbsp;&lt;{{ eml.fromEml }}&gt;
                </div>
                <div class="time" :id="'eml_head_time_' + index">
                  {{ eml.date }}&nbsp;{{ eml.time }}
                </div>
                <div class="to" :id="'eml_head_to_' + index">
                  To:&nbsp;&nbsp;{{ eml.toEml }}<br />
                  <p v-if="eml.CCeml.length > 0">CC: {{ eml.CCeml }}</p>
                </div>
              </div>

              <iframe
                :src="eml.bodyURL"
                :height="eml.height + 26"
                :id="'eml_body_' + index"
              />
            </div>
          </v-card>
          <div v-if="showCreated" >
            <div style="display: flex; align-items: center;">
              <label for="to" style="font-weight: bold; margin-right: 12px; margin-bottom: 4px">To:</label>
              <input type="text" id="to" v-model="createTo" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
            <div style="display: flex; align-items: center;">
              <label for="cc" style="margin-right: 12px; margin-bottom: 4px">Cc:</label>
              <input type="text" id="cc" v-model="createCc" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
            <div style="display: flex; align-items: center;">
              <label for="bcc" style="margin-right: 12px; margin-bottom: 4px">Bcc:</label>
              <input type="text" id="bcc" v-model="createBcc" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
             <div style="display: flex; align-items: center; margin-top:20px">
              <label for="subject" style="font-weight: bold; margin-right: 12px; margin-bottom: 4px">Subject:</label>
              <input type="text" id="subject" v-model="createSubject" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
            <vue-editor v-model="createTxt">
              </vue-editor>
             <v-btn
              type="submit" 
               color="primary"
               @click="
                  sendCreate();
                  snackbarTxt = 'Email sent';
                  snackbar = true;
                       "
               style="margin-top:1%"
                >Send</v-btn>
         </div>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import db from "../utils/firestore";
import tracking from "../utils/track_ui";
import InstructTxt from "./InstructTxt.vue";

export default {
  components: {
    VueEditor,
    InstructTxt
  },
  props: ["condition", "emls"],
  mixins: [db, tracking],
  data: () => ({
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    showHelp: false,
    labels: {},
    showReply: false,
    showCreated: false,
    replyTxt: null,
    createTxt: null,
    createTo: null,
    createCc: null,
    createBcc: null,
    createSubject: null,
    createShowed: false,
    replies: {},
    created: {},
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
      this.showCreated = false;
      this.emlViewSrc = src;
      try {
        document.getElementById("eml_body_" + this.emlViewIndex).src = src;
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
      this.showReply = false;
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
    sendCreate(){
      this.created[this.createTo] = [this.createCc, this.createBcc, this.createSubject, this.createTxt]
      // Backend functionality still has to be implemented
      console.log(this.created);
      this.showCreated = false;
      this.createTxt, this.createTo, this.createCc, this.createBcc, this.createSubject = null;
      this.createShowed = false;
    },
    mounted() {
      window.scrollTo(0, 0);

      // prevent participants from navigating back to the instructions page
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
        history.go(1);
      };
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
