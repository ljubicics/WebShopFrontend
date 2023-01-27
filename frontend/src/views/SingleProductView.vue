<template>
  <div v-if="product">
    <SingleProduct :product="product" />
  </div>
</template>

<script>
import SingleProduct from "@/components/SingleProduct.vue";
//import Reviews from '@/components/Reviews.vue';
import { mapActions, mapState } from "vuex";

export default {
  name: "SingleProductView",

  components: {
    SingleProduct,
    //Reviews
  },

  data() {
    return {
      product: null,
    };
  },
  computed: {
    ...mapState(["products"]),
  },

  methods: {
    ...mapActions(["getProduct"]),
  },

  mounted() {
    console.log("poziva se mounted.");
    this.getProduct(this.$route.params.id).then((res) => {
      this.product = res;
      console.log(res.data);
    });
  },
};
</script>
