import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productTypes: [],
  },
  mutations: {
    addProducts(state, product) {
      state.products.push(product);
    },

    addProductType(state, productType) {
      state.productTypes = productType;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      fetch("localhost:8000/admin/products/", {
        method: "GET",
      })
        .then((obj) => obj.json())
        .then((res) => commit("addProducts", res.products));
    },
  },
});
