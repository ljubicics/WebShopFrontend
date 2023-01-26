<template>
  <div id="app">
    <Header :subtitle="subtitle" />
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { mapActions } from "vuex";

export default {
  name: "AllProductsView",

  components: {
    ProductList,
  },

  data() {
    return {
      subtitle: "",
    };
  },
};
</script>

<style scoped></style>
