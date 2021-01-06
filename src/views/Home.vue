<template>
  <div class="home">
    <h1 class="text-center" v-if="user">Welcome {{ user.name }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState(["user"]),
  },
};
</script>
