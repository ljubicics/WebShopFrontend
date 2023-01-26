<template>
  <div class="home">
    <HelloWorld msg="Zlatara Ljubicic" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },

  methods: {
    ...mapState(["setToken"]),
  },

  mounted() {
    this.setToken(localStorage.token);
  },
};
</script>
