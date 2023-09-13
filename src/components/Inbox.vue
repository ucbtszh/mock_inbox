<template>
  <div id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)" >
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>

      <v-card>Time Remaining: {{ remainingTimeDisplay }}</v-card>


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


      <v-card>
        <v-card-actions>
          <v-btn class="primary" @click="handleFinish">Finish</v-btn>
        </v-card-actions>
      </v-card>
    </v-toolbar>

    <v-toolbar dense color="rgb(240,240,240)" flat>
      <v-btn depressed :disabled="!emlViewSrc" @click="showReply = true"
        ><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn
      >

      <v-btn depressed :disabled="!emlViewSrc" @click="showReply = true"
        ><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
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
          <v-card
            v-for="(eml, index) in emls"
            :key="index"
            :id="'eml_' + index"
          >
            <div v-if="index == emlViewIndex">
              <div v-if="showReply" :id="'reply_' + index">
                <!-- TODO? ADD VALIDATION LOGIC TO ONLY ALLOW SUBMITTING THE MESSAGE IF THE 'TO' FIELD CONTAINS AT LEAST ONE E-MAIL ADDRESS -->
                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                  To:
                  <input
                    type="text"
                    name="CC"
                    :id="'recipientEmails' + index"
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

                <p style="display: flex">
                  <v-btn
                    :disabled="replyTxt == null"
                    type="submit"
                    color="primary"
                    style="margin-right: 2%"
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
                      <!-- TODO? REFACTOR UploadAttachments TO ONLY DISPLAY CURRENTLY UPLOADED FILE, NOT PAST FILES; 
                        suggest to do so by adding key-value pair of {'attachment': [list of file names]} to this.replies @click Add Attachment -->
                      <li v-for="(attachment, index) in uploadedAttachments" :key="index">
                        <!-- <a href={{attachment}}>{{ x }}</a> -->
                        <a :href="attachment.url" target="_blank">{{ attachment.name }}</a>
                      </li>
                    </ul>
                </p>
              </div>

              <v-card-title :id="'eml_head_subj_' + index"
                ><div class="subject">
                  {{ eml.subject }}
                </div></v-card-title
              >
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
                </v-row>

                <iframe
                  :src="eml.bodyURL"
                  :height="eml.height + 50"
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
// import firebase from "firebase/app";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import the Firebase Storage functions
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../main";


export default {
  components: {
    VueEditor,
    InstructTxt,
  },
  props: ["emls", "UI"],
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
    remainingTime: 2400,
    replyTxt: null,
    uploadedAttachments: [],
    replies: {},
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "" }, { align: "center" }, { align: "right" }],
      [{ 'link': 'link' }] 
    ],
    timeout: 2000,
    snackbar: false,
    snackbarTxt: "E-mail",
  }),
  computed: {
    remainingTimeDisplay() {
      const minutes = Math.floor(this.remainingTime / 60);
      const seconds = this.remainingTime % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
  methods: {
    startTimer() {
      // this function is called every second. and since remainingtime is 2400, it is called for 2400seconds
      const timerInterval = setInterval(() => {
        if (this.remainingTime <= 0) {
          clearInterval(timerInterval); 
          this.handleAutomaticFinish(); 
        } else {
          this.remainingTime -= 1; 
        }
      }, 1000); 
    },
    openFileInput() {
      // Trigger the file input field when the button is clicked
      this.$refs.fileInput[0].click();
    },
    async handleFileUpload(event) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = Date.now() + '_' + file.name;
        
        try {
          // upload the file to Firebase Cloud Storage
          const storageRef = ref(storage, fileName);

          const snapshot = await uploadBytes(storageRef, file);

          const downloadURL = await getDownloadURL(storageRef);
          console.log('downloadurl:', downloadURL);
          this.uploadedAttachments.push({'url': downloadURL, 'name': file.name});
          console.log(snapshot)
          
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    displayEml(src) {
      this.emlViewSrc = src;
      try {
        document.getElementById("eml_body_" + this.emlViewIndex).src = src;
        this.showReply = false;
      } catch (TypeError) {
        // console.log("iframe is null");
      }
    },
    labelEml(label) {
      // console.log(this.)
      this.labels[this.emlViewSrc] = label;
      if (label !== "re") {
        document.getElementById("eml_" + this.emlViewIndex).style.display =
          "none";
        document.getElementById("eml_tn_" + this.emlViewIndex).style.display =
          "none";
      }
      else {
      // do something here to show the email reply 
      }
      this.emlViewSrc = null;
      this.emlViewIndex = null;
      this.showReply = false;
      // this.uploadedAttachments = [];
      // console.log(this.labels);
    },
    handleAutomaticFinish() {
      if (Object.values(this.labels).length < this.emls.length) {
        alert(
          "Time's up."
        );
      } else {
        this.sendLabels();
      }
    },
    handleFinish() {
      if (Object.values(this.labels).length < this.emls.length) {
        alert(
          "You have not processed all e-mails yet. All e-mails should have disappeared when you've processed everything."
        );
      } else {
        this.sendLabels();
      }
    },
    sendLabels() {
      // SEND EML LABELS TO DB
      // if (this.labels.length < this.emls.length) {
      //   alert(
      //     "You have not processed all e-mails yet. All e-mails should have disappeared when you've processed everything."
      //   );
      // } else {
        this.writeResponseData(this.$user, "emlLabels" + this.UI, this.labels);
        this.$emit("next");
      // }
    },
    sendReply(src) {
      // SEND REPLY MESSAGE TO DB
      this.replies[src] =
        "RECIPIENT(S): " +
        this.recipientEmails +
        "  \n\n\n $$$CCed: " +
        this.ccEmails +
        "  \n\n\n $$$EMAIL: " +
        this.replyTxt;

      // add attachments
      if (this.uploadedAttachments.length > 0) {
        const attachmentText = this.uploadedAttachments.map(attachment => `Attachment URL: ${attachment.url}`).join('\n');
        this.replies[src] += `    \n\n\n $$$ATTACHMENTS: ${attachmentText}`;
      }

      this.writeResponseData(this.$user, "replies", this.replies);
      this.showReply = false;
      this.replyTxt = null;
      this.recipientEmails = "";
      this.ccEmails = "";
      this.uploadedAttachments = [];
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
    this.startTimer();


    // prevent participants from navigating back to the instructions page
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    // uncomment this if u wanna automatically submit after 7min
    // setTimeout(() => {
    //   this.sendLabels();
    // }, 420000); // automatically go to the next UI after 7 min = 420000ms
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
