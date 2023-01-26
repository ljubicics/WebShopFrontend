<template>
  <div id="app">
    <SingleType :type="type" />
  </div>
</template>

<script>
import SingleType from "@/components/SingleType.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SingleTypeView",

  components: {
    SingleType,
  },

  data() {
    return {
      // niz sa vrednostima stvari za izabranu kategoriju
      type: null,
    };
  },

  methods: {
    ...mapActions(["fetchProductTypes"]),
  },

  computed: {
    ...mapState(["productTypes"]),
  },

  watch: {
    "$route.params.id": function () {
      this.productTypes.forEach((el) => {
        if (el.id == this.$route.params.id) {
          this.type = el.productsForType.data;
        }
      });
    },
  },

  mounted() {
    this.productTypes.forEach((el) => {
      if (el.id == this.$route.params.id) {
        this.type = el.productsForType.data;
      }
    });
  },
};
</script>

<style scoped></style>
