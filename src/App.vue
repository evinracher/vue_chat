<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }" class="text-decoration-none">
          <h1>Vue app</h1>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Log out</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["logOut"]),
  },
};
</script>
