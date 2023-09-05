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
      <v-btn depressed :disabled="!emlViewSrc" @click="showReply = true"
        ><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn
      >
     
       <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="showReply = true"><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
      >

      <!-- uncomment below if u wanna just forward to secretary upon clicking forward-->
      <!-- <v-btn
        depressed
        :disabled="!emlViewSrc"
        @click="
          labelEml('fw');
          snackbarTxt = 'E-mail forwarded to executive assistant';
          snackbar = true;
        "
        ><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
      > -->
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
      <v-spacer></v-spacer>
    </v-toolbar>

    <div v-for="(eml, index) in emls" :key="index">
      <v-dialog
        persistent
        v-model="showScanResult"
        hide-overlay
        width="600"
        v-if="index == emlViewIndex"
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <h3>Past correspondence</h3>
                <div v-if="eml.pastEmls.length == 0">
                  You have <b>not</b> received any e-mails from
                  {{ eml.fromEml }}
                  before. <br /><br />
                  <b>Did you expect anything from this sender?</b><br />
                  If not, do you recognise the sender's e-mail domain?<br /><br />
                  <a
                    :href="'https://www.google.com/search?q=' + eml.fromEml"
                    target="_blank"
                    >Search for {{ eml.fromEml }} on Google (click).</a
                  >
                </div>
                <div v-if="eml.pastEmls.length > 0">
                  You have received {{ eml.pastEmls.length }} e-mails before
                  from {{ eml.fromEml }}:<br />
                  <v-data-table
                    hide-default-footer
                    :headers="pastEmlHeaders"
                    :items="eml.pastEmls"
                  >
                  </v-data-table>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-card-actions>
                <v-btn text @click="showScanResult = false" color="primary">
                  <b>Close</b>
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </div>

    <v-main>
      <v-row>
        <v-col cols="4" style="min-width: 525px">
          <v-card style="height: 100vh; overflow: auto">
            <v-card-title>Inbox</v-card-title>

            <div v-if="condition == 'ivNudge'">
              <img
                v-if="loadNudge"
                src="../assets/ss_nudge_list.png"
                @click="nudge = true"
                style="cursor: pointer; width: 490px"
                id="nudgeEml"
              />
            </div>

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
                              style="float: left; line-height: 1.5em"
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
          <img src="../assets/ss_nudge_ex.png" v-if="nudge" /><br />
          <v-btn
            v-if="nudge"
            @click="
              nudge = false;
              loadNudge = false;
            "
            >Close</v-btn
          >

          <v-card
            v-for="(eml, index) in emls"
            :key="index"
            :id="'eml_' + index"
          >
          <div v-if="showReply" :id="'reply_' + index">
            <div v-if="index == emlViewIndex">
              
                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                  To: <input
                          type="email"
                          id="recipientEmails"
                          v-model="recipientEmails"
                          placeholder="Enter recipient's email"
                        />
                </p>
                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                CC: 
                  <input 
                    type="email"
                    id="ccEmails" 
                    v-model="ccEmails"
                    placeholder="CC"
                  />
                </p>
                <vue-editor
                  v-model="replyTxt"
                  :editor-toolbar="customToolbar"
                ></vue-editor>
                <p style="display: flex;">
                  <v-btn
                    :disabled="replyTxt == null"
                    type="submit"
                    color="primary"
                    style="margin-right: 2%;"
                    @click="
                      labelEml('re');
                      sendReply(eml.bodyURL);
                      snackbarTxt = 'Reply sent';
                      snackbar = true;
                    "
                    >Send</v-btn
                  >

                    <input
                      type="file"
                      ref="fileInput"
                      style="display: none;"
                      @change="handleFileUpload"
                    />
                    <v-btn @click="openFileInput">Add Attachment</v-btn>
                    <ul>
                      <li v-for="(attachment, index) in uploadedAttachments" :key="index">
                        {{ attachment.name }}
                      </li>
                    </ul>
                </p>
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
                scale of 0 (trustworthy) to 1 (highly suspicious).<br /><br />
                <b
                  >Double check the sender's e-mail address and any URLs in the
                  e-mail before communicating further with them.</b
                >
              </v-alert>

              <div>
                <v-row>
                  <v-col cols="11">
                    <div class="initial" :id="'eml_head_initial_' + index">
                      {{ eml.fromName.substr(0, 1) }}
                    </div>
                    <div style="margin-left: 65px">
                      <div
                        class="from-name"
                        :id="'eml_head_from_name_' + index"
                      >
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
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      v-if="condition == 'ivBtn'"
                      fab
                      x-small
                      color="orange"
                      @click="sendScanMsg()"
                    >
                      <v-icon>mdi-format-list-bulleted-square</v-icon>
                      <!-- &nbsp; See past correspondence -->
                    </v-btn>
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
import { VueEditor } from "vue2-editor";
import db from "../utils/firestore";
import tracking from "../utils/track_ui";
import InstructTxt from "./InstructTxt.vue";

export default {
  components: {
    VueEditor,
    InstructTxt,
  },
  props: ["condition", "emls", "UI"],
  mixins: [db, tracking],
  data: () => ({
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    showHelp: false,
    labels: {},
    showReply: false,
    recipientEmails: "",
    ccEmails: "",
    replyTxt: null,
    uploadedAttachments: [],
    replies: {},
    nudge: false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "" }, { align: "center" }, { align: "right" }],
    ],
    timeout: 2000,
    snackbar: false,
    snackbarTxt: "E-mail",
    closeOnContentClick: true,
    loadNudge: true,
    showScanResult: false,
    scanResult: { URLscan: 0, nameScan: 0 },
    headers: [
      { text: "Link text", value: "urlDisplayTxt" },
      { text: "Actual URL", value: "urlRaw" },
      { text: "Actual URL domain", value: "urlDomain" },
    ],
    pastEmlHeaders: [
      { text: "Date:", value: "date" },
      { text: "Subject:", value: "subject" },
    ],
  }),
  methods: {
    openFileInput() {
      // Trigger the file input field when the button is clicked
      this.$refs.fileInput[0].click();
    },
    handleFileUpload(event) {
      // Handle the selected file(s) here
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.uploadedAttachments.push(files[i]);
      }
      // You can now process the attachments as needed (e.g., send to a server)
    },
    displayEml(src) {
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
      if (this.labels.length < this.emls.length) {
        alert(
          "You have not processed all e-mails yet. All e-mails should have disappeared when you've processed everything."
        );
      } else {
        this.writeResponseData(this.$user, "emlLabels" + this.UI, this.labels);
        this.$emit("next");
      }
    },
    sendReply(src) {
      // SEND REPLY MESSAGE TO DB
      this.replies[src] = "RECIPIENT(S): " + this.recipientEmails + "  \n\n\n $$$CC'ed:" + this.ccEmails + "  \n\n\n $$$EMAIL:" + this.replyTxt;
      this.writeResponseData(this.$user, "replies" + this.UI, this.replies);
      this.showReply = false;
      this.replyTxt = null;
      this.recipientEmails = "";
      this.ccEmails = "";

    },
    sendScanMsg() {
      document
        .getElementById("eml_body_" + this.emlViewIndex)
        .contentWindow.postMessage("scan e-mail", "/");
      this.setScanRes = (obj) => {
        this.scanResult = obj.data;
      };
      window.addEventListener("message", this.setScanRes);
      this.showScanResult = true;
    },
    showSenderPrevEmls() {
      return null;
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    // prevent participants from navigating back to the instructions page
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    setTimeout(() => {
      this.sendLabels();
    }, 420000); // automatically go to the next UI after 7 min = 420000ms
  },
  beforeDestroy() {
    window.removeEventListener("message", this.setScanRes);
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


#tooltip {
  position: absolute;
  right: 1px;
}

</style>
