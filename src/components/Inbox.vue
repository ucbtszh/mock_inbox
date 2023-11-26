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
      <v-btn depressed color="secondary" @click="handleFinish">DONE</v-btn>
    </v-toolbar>

    <v-main>
      <v-row>
        <v-col cols="4" style="min-width: 525px">
          <v-card style="height: 100vh; overflow: auto;">
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
          <!-- /* style="margin-right: 50px;" */ -->
            <div v-if="index == emlViewIndex">
              <div v-if="showReply" :id="'reply_' + index">
                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                  To:
                  <input
                    type="email"
                    name="CC"
                    :id="'recipientEmails' + index"
                    v-model="recipientEmails"
                    placeholder="To"
                    @input="validateToEmail"
                    required
                  />
                </p>

                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                CC: 
                  <input 
                  title="do i work TODO: add , specification"
                    type="email"
                    id="ccEmails" 
                    v-model="ccEmails"
                    placeholder="CC"
                    @input="validateCCEmail"
                    @change="turnvalidatefalse"
                  /> 
                </p>

                <p style="height: 30px; padding-top: 10px; padding-left: 15px">
                Subject: 
                  <input 
                    type="text"
                    id="replySubject" 
                    v-model="replySubject"
                    placeholder="Subject"
                  /> 
                </p>

                <vue-editor
                  v-model="replyTxt"
                  :editor-toolbar="customToolbar"
                ></vue-editor>

                <p style="display: flex">
                  <v-btn
                    :disabled="replyTxt == null || !validToEmail"
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

                <!-- <iframe
                  :src="eml.bodyURL"
                  :height="eml.height + 50"
                  :id="'eml_body_' + index"
                  ref="iframe"
                /> -->
                <!-- make new component and pass body to it -->
                <div id="email-reply">
                  <l19 v-if="eml.bodyURL === '/l19.html'" :parentFunction="storeUrlClick" :height="eml.height + 250" :id="'eml_body_' + index"/>
                  <l26 v-if="eml.bodyURL === '/l26.html'" :parentFunction="storeUrlClick" :height="eml.height + 250" :id="'eml_body_' + index"/>
                  <l3 v-if="eml.bodyURL === '/l3.html'" :parentFunction="storeUrlClick" :height="eml.height + 250" :id="'eml_body_' + index"/>
                  <l30 v-if="eml.bodyURL === '/l30.html'" :parentFunction="storeUrlClick" :height="eml.height + 250" :id="'eml_body_' + index"/>
                
                </div>

              </div>

              <!-- maybe convert into component and load component for each reply and use props to pass in the email -->
              <div  v-if="labels[emlViewSrc] == 're'">
                    <div :key="idx" id="userReply" v-for="(reply, idx) in replies[emlViewSrc]">
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
                              To:&nbsp;&nbsp;{{ reply.split(' ').slice(reply.split(' ').indexOf("RECIPIENT(S):") + 1, reply.split(' ').indexOf("")).filter(item => item.trim() !== '').join(', ') }}<br />
                              <p v-if="reply.split(' ').slice(reply.split(' ').indexOf('$$$EMAIL:') + 1) !== ''">CC: {{ reply.split(' ').slice(reply.split(' ').indexOf("$$$CCed:") + 1, reply.split(' ').indexOf("$$$EMAIL:") - 1).filter(item => item.trim() !== '').join(', ') }}</p>
                            </div>
                          </div>
                        </v-col>
                      </v-row>

                      <div id="email-reply" v-html="reply.split(' ').slice(reply.split(' ').indexOf('$$$EMAIL:') + 1, reply.split(' ').indexOf('$$$ATTACHMENTS:') - 1).filter(item => item.trim() !== '').join(' ')">
                      </div>

                      <!-- TODO: add attachments if any-->
                      <div v-if="reply.split(' ').slice(reply.split(' ').indexOf('$$$ATTACHMENTS:') + 1).filter(element => element !== '').length > 0">
                        <div v-for="(item, inx) in reply.split(' ').slice(reply.split(' ').indexOf('$$$ATTACHMENTS:') + 1)" :key="inx">
                          <div class="email-attachment">
                              <div class="attachment-icon"></div>
                              <div class="attachment-details">
                                  <p class="attachment-filename">{{ item.match(/\/o\/([^?]+)/)[1] }}</p>
                              </div>
                              <a class="download-link" :href="item">Download</a>
                          </div>
                        </div>  
                      </div>  

                      
                    </div>
            </div>

            </div>
          </v-card>
            <div v-if="showCreated" >
            <div style="display: flex; align-items: center;">
              <label for="to" style="font-weight: bold; margin-right: 12px; margin-bottom: 4px">To:</label>
              <input required @input="validateToCreateEmail" type="email" id="to" v-model="createTo" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
            <div style="display: flex; align-items: center;">
              <label for="cc" style="font-weight: bold; margin-right: 12px; margin-bottom: 4px">Cc:</label>
              <input type="text" id="cc" v-model="createCc" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
             <div style="display: flex; align-items: center; margin-top:20px">
              <label for="subject" style="font-weight: bold; margin-right: 12px; margin-bottom: 4px">Subject:</label>
              <input type="text" id="subject" v-model="createSubject" style="border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; width: 100%; outline: none">
            </div>
            <vue-editor v-model="createTxt">
            </vue-editor>
            <p style="display: flex">
             <v-btn
              type="submit" 
              :disabled="createTxt == null || !validToCreateEmail"
               color="primary"
               @click="
                  sendCreate();
                  snackbarTxt = 'Email sent';
                  snackbar = true;
                       "
               style="margin-top:1%"
                >Send</v-btn>
  
                <input
                      type="file"
                      ref="fileInput1"
                      style="display: none; margin-top: 1%; margin-left: 1%;"
                      @change="handleFileUpload"
                    />
                    <v-btn style="margin-top: 1%; margin-left: 1%;" @click="openFileInput1">Add Attachment</v-btn>
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
        </v-col>
        <!-- <v-spacer></v-spacer> -->
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // uploadBytes
import { storage } from "../main";
import l19 from '../emls/l19.vue';
import l26 from '../emls/l26.vue';
import l3 from '../emls/l3.vue';
import l30 from '../emls/l30.vue';

export default {
  components: {
    VueEditor,
    InstructTxt,
    l19, l26, l3, l30
  },
  props: ["emls", "UI"],
  mixins: [db], //, tracking],
  data: () => ({
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    showHelp: false,
    labels: {},
    urlClicks: {},
    showReply: false,
    showCreated: false,
    recipientEmails: null,
    replySubject: null,
    ccEmails: "",
    validToEmail: false,
    validToCreateEmail: false,
    validCCEmail: true,
    remainingTime: 2400,
    replyTxt: null,
    createTxt: null,
    createTo: null,
    createCc: null,
    createBcc: null,
    createSubject: null,
    createShowed: false,
    created: {},
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
    turnvalidatefalse() {
      this.validCCEmail = false;
    },
    storeUrlClick(url) {
      if (this.urlClicks[this.emlViewSrc]) {
        this.urlClicks[this.emlViewSrc].push(url);
      }
      else {
        this.urlClicks[this.emlViewSrc] = [url];  
      }
    },
    validateToCreateEmail() {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check if the entered email is valid
      // this.validToEmail = emailRegex.test(this.recipientEmails);
      const emailAddresses = this.createTo.split(',');
      this.validToCreateEmail = emailAddresses.every(email => emailRegex.test(email.trim()));
    },
    validateToEmail() {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check if the entered email is valid
      // this.validToEmail = emailRegex.test(this.recipientEmails);
      const emailAddresses = this.recipientEmails.split(',');
      this.validToEmail = emailAddresses.every(email => emailRegex.test(email.trim()));
    },
    validateCCEmail() {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check if the entered email is valid
      this.validCCEmail = emailRegex.test(this.ccEmails);
    },
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
    openFileInput1() {
      // Trigger the file input field when the button is clicked
      this.$refs.fileInput1.click();
    },
    async handleFileUpload(event) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        const allowedExtensions = ['.pdf', '.docx', '.jpg', '.jpeg', '.png', '.gif'];
        const maxFileSize = 100 * 1024 * 1024; // 100 MB in bytes

        const fileExtension = file.name.toLowerCase().substr(file.name.lastIndexOf('.'));
        if (!allowedExtensions.includes(fileExtension)) {
          alert('Invalid file type. Please upload a .pdf, .docx, or image file.');
          continue; // Skip this file
        }

        if (file.size > maxFileSize) {
          alert('File size exceeds the maximum allowed (100 MB).');
          continue; // Skip this file
        }

        const fileName = this.emlViewSrc.slice(1, this.emlViewSrc.indexOf('.')) + '_' + file.name;
        
        try {
          // upload the file to Firebase Cloud Storage
          const storageRef = ref(storage, fileName);
          const uploadTask = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(uploadTask.ref);
          this.uploadedAttachments.push({ 'url': downloadURL, 'name': file.name });
          
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    displayEml(src) {
      this.emlViewSrc = src;
      this.showCreated = false;
      try {
        document.getElementById("eml_body_" + this.emlViewIndex).src = src;
        this.showReply = false;
      } catch (TypeError) {
        // console.log("iframe is null");
      }
      // this.urlClickListener();
    },
    urlClickListener() {
      setTimeout(() => {
        document.getElementById("eml_body_" + this.emlViewIndex).contentWindow.postMessage("track URL clicks", "/")  
      }, 750); // TODO: this is not an ideal solution; better would be to find a way to check if the iframe content is loaded, then execute the postmessage func

      this.handleUrlClick = (obj) => { // helper func to get details on clicked URL
        this.urlClicks.push(obj.data);
        console.log(this.urlClicks)
      };
      window.addEventListener("message", this.handleUrlClick); // when receiving message back from child (e-mail html file), call helper func to set urlClicks data
    },
    labelEml(label) {
      this.labels[this.emlViewSrc] = label;
      console.log(this.urlClicks);
      if (label !== "re") {
        document.getElementById("eml_" + this.emlViewIndex).style.display =
          "none";
        document.getElementById("eml_tn_" + this.emlViewIndex).style.display =
          "none";
      }
      else {
      // TODO? do something here to show the email reply 
      }
      this.emlViewSrc = null;
      this.emlViewIndex = null;
      this.showReply = false;
      // console.log(this.labels);
    },
    handleAutomaticFinish() {
      alert(
        "Time's up. Your responses are being stored and you will now be forwarded to a feedback form."
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
        // console.log('hey');
      }
    },
    sendLabels() {
      // SEND EML LABELS TO DB
      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }
      
      this.writeResponseData(this.$user, "emlLabels" + this.UI, this.labels);
      this.writeResponseData(this.$user, "urlClicks", this.urlClicks);
    
      this.$emit("next");
    },
    sendReply(src) {
      // SEND REPLY MESSAGE TO DB
      console.log('sending?')
      let reply =
        "RECIPIENT(S): " +
        this.recipientEmails +
        "  \n\n\n $$$CCed: " +
        this.ccEmails +
        "  \n\n\n $$$SUBJECT: " +
        this.replySubject +
        "  \n\n\n $$$EMAIL: " +
        this.replyTxt +
        "  \n\n\n $$$ATTACHMENTS: ";
        
        
      // add attachments
      if (this.uploadedAttachments.length > 0) {
        // console.log('i am here\n');
        const attachmentText = this.uploadedAttachments.map(attachment => `${attachment.url}`).join('\n');
        reply += `${attachmentText}`;
      }

      if (!this.replies[src]) {
        this.replies[src] = [];
      }

      // Push the reply to the array
      this.replies[src].push(reply);
      
      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }
      

      this.writeResponseData(this.$user, "replies", this.replies);
      this.showReply = false;
      this.replyTxt = null;
      this.recipientEmails = null;
      this.validToEmail = false;
      this.ccEmails = ""
      this.uploadedAttachments = [];
    },
     sendCreate(){
      // SEND REPLY MESSAGE TO DB
      console.log('sending?')
      let create =
        "RECIPIENT(S): " +
        this.createTo +
        "  \n\n\n $$$CCed: " +
        this.createCc +
        "  \n\n\n $$$SUBJECT: " +
        this.createSubject +
        "  \n\n\n $$$EMAIL: " +
        this.createTxt +
        "  \n\n\n $$$ATTACHMENTS: ";
        
        
      // add attachments
      if (this.uploadedAttachments.length > 0) {
        // console.log('i am here\n');
        const attachmentText = this.uploadedAttachments.map(attachment => `${attachment.url}`).join('\n');
        create += `${attachmentText}`;
      }

      if (!this.created[this.createTo]) {
        this.created[this.createTo] = [];
      }

      // Push the reply to the array
      this.created[this.createTo].push(create);

      if(!this.$user) {
        this.$user = localStorage.getItem('userUUID');
      }

      this.writeResponseData(this.$user, "create", this.created);

      this.showReply = false;
      this.createTxt = null;
      this.createTo = null;
      this.validToEmail = false;
      this.createCc = null;
      this.createSubject = null;
      this.uploadedAttachments = [];
      this.createShowed = false;
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
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleUrlClick);
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

iframe, #email-reply {
  width: 95%;
  border: 0;
  display: block;
  margin-left: 65px;
  padding: 0;
}

#tooltip {
  position: absolute;
  right: 1px;
}


/* Styles for the attachment filename */
.attachment-filename {
    font-weight: bold;
    margin: 0;
    color: #333;
}

/* Styles for the attachment size */
.attachment-size {
    font-size: 12px;
    margin: 0;
    color: #666;
}

/* Styles for the download link */
.download-link {
    background-color: #0072C6;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
    display: inline-block;
}

.download-link:hover {
    background-color: #005ea6;
}

email-attachment-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 100% viewport height */
    overflow: hidden;
    background-color: #f0f0f0; /* Background color for the entire viewport */
}

/* Styles for the email attachment */
.email-attachment {
    background-color: #f9f9f9;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    display: flex;
    padding: 10px;
    align-items: center;
}


</style>
