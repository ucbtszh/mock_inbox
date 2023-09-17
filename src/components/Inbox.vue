<template>
  <div id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)" >
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>
      
      <p id="time-remaining">Time Remaining: {{ remainingTimeDisplay }}</p>
      <v-spacer></v-spacer>
      
      <!---->

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

    <v-dialog
      v-model="nudge"
      persistent
      max-width="860"
      v-if="condition == 'ivNudge'"
    >
      <v-card class="iv" id="iv_nudge_pop">
        <v-card-title
          >This e-mail was reported as suspicious today by one of our
          colleagues:</v-card-title
        >
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

              <div id="userReply" v-if="labels[emlViewSrc] == 're'">
                <hr> <hr>
                <v-row style="margin-top: 2px;">
                  <v-col cols="11">
                    <div class="initial" :id="'eml_head_initial_' + index">
                       A
                    </div>
                    <div style="margin-left: 65px">
                      <div
                        class="from-name"
                        :id="'eml_head_from_name_' + index"
                      >
                        A. Durrani&nbsp;&lt;a.durrani@ptcl.com&gt;
                      </div>
                      <div class="time" :id="'eml_head_time_' + index">
                       Now
                      </div>
                      <div class="to" :id="'eml_head_to_' + index">
                        To:&nbsp;&nbsp;{{ replies[emlViewSrc].split(' ').slice(replies[emlViewSrc].split(' ').indexOf("RECIPIENT(S):") + 1, replies[emlViewSrc].split(' ').indexOf("")).filter(item => item.trim() !== '').join(', ') }}<br />
                        <p v-if="replies[emlViewSrc].split(' ').slice(replies[emlViewSrc].split(' ').indexOf('$$$EMAIL:') + 1) !== ''">CC: {{ replies[emlViewSrc].split(' ').slice(replies[emlViewSrc].split(' ').indexOf("$$$CCed:") + 1, replies[emlViewSrc].split(' ').indexOf("$$$EMAIL:") - 1).filter(item => item.trim() !== '').join(', ') }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <div v-html="replies[emlViewSrc].split(' ').slice(replies[emlViewSrc].split(' ').indexOf('$$$EMAIL:') + 1, replies[emlViewSrc].split(' ').indexOf('$$$ATTACHMENTS:') - 1).filter(item => item.trim() !== '').join(' ')">
                </div>

                <!-- TODO: add attachments if any  + fix style of reply's body-->
                
              </div>
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
// import tracking from "../utils/track_ui";
import InstructTxt from "./InstructTxt.vue";
// import firebase from "firebase/app";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import the Firebase Storage functions
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../main";

// use query selector all method and search for all the link attributes and then attach an 
// event listener to those elements and close the event listener when youre done with the exercise/email

// links are within email body, have to import script in the eml files.

export default {
  components: {
    VueEditor,
    InstructTxt,
  },
  props: ["emls", "UI"],
  mixins: [db], //, tracking],
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
    // handleIframeMssg(event) {
    //   // Check if the event comes from a trusted source (you can add more security checks if needed)
    //   console.log("d", event.data);

    //   // problem is this d is printed as soon as i click the email. and that the mssg doesnt contain the clickedUrl
    //   const data = event.data;

    //   // Check if the message contains clicked URL information
    //   if (data && data.clickedUrl) {
    //     // Do something with the clicked URL information
    //     console.log('Clicked URL:', data.clickedUrl);
        
    //     // You can perform further actions here, such as opening the URL or displaying a message.
    //   }
    // },
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
      this.showCreated = false;
      this.emlViewSrc = src;
      try {
        document.getElementById("eml_body_" + this.emlViewIndex).src = src;
        this.showReply = false;
      } catch (TypeError) {
        // console.log("iframe is null");
      }
      this.addUrlListeners();
      // this.sendScanMsg();
    },
    addUrlListeners() {
      console.log("hey i am here");
      document.getElementById("eml_body_" + this.emlViewIndex).contentWindow.postMessage("message", this.handleUrlClick);
    },
    handleUrlClick() {
      console.log('bruh');
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
      alert(
        "Time's up. Your responses are being stored and you will now be forwarded to a feedback form!"
      );
      this.sendLabels();
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
        this.replyTxt +
        "  \n\n\n $$$ATTACHMENTS: ";

      // add attachments
      if (this.uploadedAttachments.length > 0) {
        const attachmentText = this.uploadedAttachments.map(attachment => `Attachment URL: ${attachment.url}`).join('\n');
        this.replies[src] += `${attachmentText}`;
      }

      this.writeResponseData(this.$user, "replies", this.replies);
      this.showReply = false;
      this.replyTxt = null;
      this.recipientEmails = "";
      this.ccEmails = "";
      this.uploadedAttachments = [];
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

    // uncomment this if u wanna automatically submit after 7min
    // setTimeout(() => {
    //   this.sendLabels();
    // }, 420000); // automatically go to the next UI after 7 min = 420000ms
  },
  beforeDestroy() {
    window.removeEventListener("message", this.setScanRes);
    // window.removeEventListener("click", this.handleIframeMssg);
  },
};
</script>

<style scoped>
#inbox {
  background-color: rgb(248, 248, 248);
}

#outlook-sign, #time-remaining {
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
