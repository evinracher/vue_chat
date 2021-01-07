<template>
  <nav>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="user"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }" class="text-decoration-none">
          <h1>Vue app</h1>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text v-if="user">
        <span class="mr-2" @click="logOut">Log out</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary app v-if="user">
      <v-row class="mt-3">
        <v-col class="text-center">
          <v-avatar color="primary" size="56">
            <img :src="user.photo" :alt="user.name" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center mt-3">
          <p>{{ user.name }}</p>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["logOut"]),
  },
  data() {
    return {
      group: null,
      items: [
        { title: "Home", icon: "fas fa-home", to: { name: "Home" } },
        { title: "Admin", icon: "fas fa-user-cog", to: { name: "Admin" } },
        { title: "Chat", icon: "fas fa-comments", to: { name: "Chat" } },
      ],
      drawer: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>