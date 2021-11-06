<template>
  <v-app id="inbox">
    <v-toolbar height="50" color="rgb(0,120,212)" app>
      <p id="outlook-sign">Outlook</p>
      <v-spacer></v-spacer>
      <v-icon dark>mdi-account</v-icon>
    </v-toolbar>

    <v-toolbar dense color="rgb(240,240,240)" flat>
      <v-btn depressed><v-icon>mdi-reply</v-icon>&nbsp;Reply</v-btn>
      <v-btn depressed><v-icon>mdi-arrow-right</v-icon>&nbsp;Forward</v-btn>
      <v-btn depressed><v-icon>mdi-delete</v-icon>&nbsp;Delete</v-btn>
      <v-btn depressed><v-icon>mdi-archive-outline</v-icon>&nbsp;Archive</v-btn>
      <v-btn depressed><v-icon>mdi-block-helper</v-icon>&nbsp;Junk</v-btn>
      <v-spacer></v-spacer>
      <v-btn depressed color="secondary">DONE</v-btn>
    </v-toolbar>

    <v-main>
      <v-row>
        <v-col cols="4">
          <v-card style="height: 100vh; overflow: auto">
            <v-card-title>Inbox</v-card-title>

            <v-list>
              <template v-for="(eml, index) in emls">
                <v-list-item
                  :key="eml.bodyURL"
                  @click="displayEml(index, eml.bodyURL)"
                  @pointerover="displayRadioBtn(index)"
                >
                  <v-row>
                    <v-col cols="1" style="margin-top:30px;">
                      <v-radio v-show="index === emlHoverIndex" :name="index"></v-radio>
                    </v-col>

                    <v-col>
                      <v-list-item-content>
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
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col style="height: 100vh; overflow: auto">
          <v-card v-for="(eml, index) in emls" :key="index">
            <div v-if="index === emlClickIndex">
              <v-card-title
                ><div class="subject">{{ eml.subject }}</div></v-card-title
              >
              <div class="initial">
                {{ eml.fromName.substr(0, 1) }}
              </div>
              <div
                id="header"
                style="background-color: 'yellow'; margin-left: 65px"
              >
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
                name="eml-msg"
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

export default {
  data: () => ({
    emls: emails,
    emlClickIndex: "",
    emlHoverIndex: ""
  }),
  methods: {
    displayEml(index, src) {
      this.emlClickIndex = index;
      document.getElementById("eml-msg").src = src;
    },
    displayRadioBtn(index) {
      this.emlHoverIndex = index;

    }
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
