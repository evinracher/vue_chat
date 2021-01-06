<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-card class="text-center" v-if="user">
        <v-card-text>
          <v-avatar color="primary" size="56">
            <img :src="user.photo" :alt="user.name" />
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <h3>{{ user.name }}</h3>
        </v-card-text>
        <v-card-text>
          <input
            class="d-none"
            type="file"
            ref="button"
            @change="searchImage($event)"
          />
          <v-btn class="mx-2" color="primary" @click="$refs.button.click()"
            >Search image</v-btn
          >
          <v-btn
            class="mx-2"
            color="secondary"
            :disabled="!file"
            @click="loadImage()"
            :loading="loading"
            >Load image</v-btn
          >
        </v-card-text>
        <v-card-text v-if="file">
          <h4>{{ file.name }}</h4>
          <v-img :src="tempUrl" alt="loaded image"></v-img>
        </v-card-text>
        <v-card-text v-if="message">
          <h4>{{ message }}</h4>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { firebase, storage, db } from "../firebase";
export default {
  data() {
    return {
      file: null,
      tempUrl: "",
      loading: false,
      message: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // ...mapActions(["setLoading"]),
    searchImage(event) {
      const file = event.target.files[0];
      if (file.type.includes("image")) {
        this.file = file;
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          // console.log(e.target.result);
          this.tempUrl = e.target.result;
          this.message = null;
        };
      } else {
        this.message = "File type invalid. You must load an image file.";
      }
    },
    async loadImage() {
      try {
        const refImage = storage
          .ref()
          .child(this.user.email)
          .child("profile_photo");
        // this.setLoading("Loading image...", true);
        this.loading = true;
        const res = await refImage.put(this.file);
        console.log(res);
        const newUrl = await refImage.getDownloadURL();
        console.log(newUrl);
        this.user.photo = newUrl;
        await db.collection("users").doc(this.user.uid).update({
          photo: newUrl,
        });
        // this.setLoading("Loading image...", false);
        this.message = "Loaded image successfully.";
        this.file = null;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>