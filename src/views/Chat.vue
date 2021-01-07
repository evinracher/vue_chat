<template>
  <v-layout>
    <v-flex>
      <v-card v-if="user">
        <v-card-text>Welcome {{ user.name }}</v-card-text>
        <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
          <div
            v-for="(item, index) in messages"
            :class="[item.userName === user.name ? 'text-right' : 'text-left']"
            :key="index"
          >
            <v-chip>
              <v-avatar left>
                <img :src="item.userPhoto" :alt="item.userName" /> </v-avatar
              >{{ item.message }}
            </v-chip>
            <p class="caption mx-2">{{ item.date }}</p>
          </div>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="sendMessage" v-model="valid">
            <v-text-field
              v-model="message"
              label="Enter your message"
              required
              :rules="rules"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";
import moment from "moment";
export default {
  data() {
    return {
      message: "",
      valid: false,
      rules: [(v) => !!v || "You must type a message..."],
      messages: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    sendMessage() {
      if (this.valid) {

        db.collection("messages")
          .add({
            message: this.message,
            userName: this.user.name,
            userPhoto: this.user.photo,
            date: Date.now(),
          })
          .catch(console.error);
        this.message = "";
      }
    },
  },
  created() {
    moment.locale("es");
    let ref = db.collection("messages").orderBy("date", "desc").limit(10);

    ref.onSnapshot((querySnapshot) => {
      this.messages = [];
      querySnapshot.forEach((doc) => {
        this.messages.unshift({
          ...doc.data(),
          date: moment(doc.data().date).format("lll"),
        });
      });
    });
  },
};
</script>