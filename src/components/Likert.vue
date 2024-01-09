<template>
  <div>
    <h2>{{ item }}</h2>

    <v-radio-group
      v-model="response"
      :rules="[(v) => !!v || 'Please answer this item.']"
    >
      <v-layout row wrap>
        <v-flex column> {{ leftExtreme }} </v-flex>
        <v-flex column>
          <v-radio
            value="1"
            :name="item"
            @click="$emit('answered', [item, response])"
          ></v-radio>
          <p>1</p>
        </v-flex>
        <v-flex column>
          <v-radio
            value="2"
            :name="item"
            @click="$emit('answered', [item, response])"
          ></v-radio>
          <p>2</p>
        </v-flex>
        <v-flex column>
          <v-radio
            value="3"
            :name="item"
            @click="$emit('answered', [item, response])"
          ></v-radio>
          <p>3</p>
        </v-flex>
        <v-flex column>
          <v-radio
            value="4"
            :name="item"
            @click="$emit('answered', [item, response])"
          ></v-radio>
          <p>4</p>
        </v-flex>
        <v-flex column>
          <v-radio
            value="5"
            :name="item"
            @click="$emit('answered', [item, response])"
          ></v-radio>
          <p>5</p>
        </v-flex>
        <v-flex column>{{ rightExtreme }}</v-flex>
      </v-layout>
    </v-radio-group><br/><br/>
  </div>
</template>

<script>
export default {
  props: ["item", "leftExtreme", "rightExtreme"],
  data() {
    return {
      response: null,
    };
  },
};
</script>

<style scoped>
p {
  margin-left: 7px;
}
</style>
