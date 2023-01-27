<template>
  <div>
    <b-table
      id="product-table"
      hover
      fixed
      :items="type"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="products.length"
      :per-page="perPage"
      aria-controls="products-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SingleType",

  props: {
    type: Array,
  },

  data() {
    return {
      fields: ["product_name", "product_material", "product_price"],
      items: [],
      currentPage: 1,
      perPage: 10,
    };
  },

  computed: {
    ...mapState(["products", "productTypes"]),
  },

  mounted() {},

  methods: {
    rowClicked(product, index) {
      this.$router.push({ name: "SingleProductView", params: { id: product.id } });
      console.log(product.id);
    },
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
}

.table {
  width: 80%;
  margin-left: 10%;
}
</style>
