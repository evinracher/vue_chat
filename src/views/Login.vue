<template>
  <div>
    <v-row justify="center" class="mt-10">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text
            class="display-1 text-uppercase primary white--text text-center"
            :class="register ? 'accent' : 'primary'"
          >
            <span>{{ register ? "Register" : "Login" }}</span>
          </v-card-text>

          <v-card-text>
            <v-btn block color="error" class="my-2" @click="selectGoogle">
              <v-icon left dark>fab fa-google</v-icon>
              Google
            </v-btn>
            <!-- <v-btn block color="info" class="my-2" @click="selectFacebook">
              <v-icon left dark>fab fa-facebook-f</v-icon>
              Facebook
            </v-btn> -->
          </v-card-text>

          <v-card-text>
            <v-btn block @click="newAccount">
              {{
                register
                  ? "Already have an account? Log in"
                  : "Don't have an account? Create one"
              }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { firebase, auth, db } from "../firebase";
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      register: false,
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    newAccount() {
      this.register = !this.register;
    },
    selectGoogle() {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      this.authenticate(googleProvider);
    },
    selectFacebook() {
      alert("Te lo quedo debiendo :v");
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      this.authenticate(facebookProvider);
    },
    async authenticate(provider) {
      firebase.auth().languageCode = "es";
      try {
        const res = await firebase.auth().signInWithPopup(provider);
        const user = {
          name: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
          photo: res.user.photoURL,
        };

        await db.collection("users").doc(user.uid).set(user);
        console.log("User on db");
        this.setUser(user);
        // router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
