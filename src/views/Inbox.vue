<template>
  <v-app id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)">
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>
      <v-icon dark>mdi-account</v-icon>
    </v-toolbar>

    <v-toolbar dense color="rgb(240,240,240)" flat>
      <v-btn depressed @click="showReply = true"
        ><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn
      >
      <v-btn depressed @click="labelEml('fw')"
        ><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn
      >
      <v-btn depressed @click="labelEml('del')"
        ><v-icon>mdi-delete</v-icon>&nbsp;Delete</v-btn
      >
      <v-btn depressed @click="labelEml('arch')"
        ><v-icon>mdi-archive-outline</v-icon>&nbsp;Archive</v-btn
      >
      <v-btn depressed @click="labelEml('junk')"
        ><v-icon>mdi-block-helper</v-icon>&nbsp;Junk</v-btn
      >
      <v-btn depressed @click="labelEml('mali')" v-if="ivBtn"
        ><v-icon>mdi-block-helper</v-icon>&nbsp;Check for malice</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn depressed color="secondary" @click="sendLabels()">DONE</v-btn>
    </v-toolbar>

    <v-alert
      outlined
      type="warning"
      dense
      border="left"
      dismissible
      v-if="ivNudge"
    >
      {{ eml.nudgeTxt }}
    </v-alert>

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
                v-if="ivScore"
              >
                {{ eml.junkScore }}
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
  </v-app>
</template>

<script>
import emails from "../assets/stimuli_eml_full_shuffled.json";
import { VueEditor } from "vue2-editor";
import db from "../utils/db_firestore";

export default {
  components: {
    VueEditor,
  },
  data: () => ({
    emls: emails,
    emlViewSrc: "",
    emlViewIndex: null,
    emlHoverIndex: null,
    labels: {},
    showReply: false,
    replyTxt: null,
    ivBtn: this.$condition === "ivBtn" ? true : false,
    ivScore:  this.$condition === "ivScore" ? true : false,
    ivNudge:  this.$condition === "ivNudge" ? true : false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "" }, { align: "center" }, { align: "right" }],
    ],
  }),
  mixins: [db],
  methods: {
    displayEml(src) {
      this.emlViewSrc = src;
      try {
        document.getElementById("eml-msg").src = src;
      } catch (TypeError) {
        console.log("iframe is null");
      }
    },
    labelEml(label) {
      this.labels[this.emlViewSrc] = label;
      document.getElementById(this.emlViewSrc).style.display = "none";
      document.getElementById(this.emlViewIndex).style.display = "none";
      // console.log(this.labels);
    },
    // writeResponseData() {
    //   console.log()
    // },
    sendLabels() {
      // SEND EML LABELS TO DB
      if (this.labels.length < 47 | this.labels.length == null) {
        alert(
          "You have not processed all e-mails yet. All e-mails should have disappeared when you've processed everything."
        );
      } else {
        this.writeResponseData("testuser", "emlLabels", this.labels);
      }
      
    },
    sendReply() {
      // SEND REPLY MESSAGE TO DB
      let reply = {};
      reply[this.emlViewSrc] = this.replyTxt;
      // console.log(reply);
      this.writeResponseData("testuser", "replyMsg", reply);
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
