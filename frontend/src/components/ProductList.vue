<template>
  <div>
    <b-table
      id="product-table"
      hover
      fixed
      :items="productsTable"
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
  name: "ProductList",

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
    productsTable: function () {
      return this.products;
    },
  },

  mounted() {},

  methods: {
    rowClicked(record, index) {
      this.$router.push({ name: "Single", params: { id: record.objectID } });
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
