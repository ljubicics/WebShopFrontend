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
      state.products = product;
    },
    addProductTypes(state, productType) {
      state.productTypes.push(productType);
    },
    setProductTypes(state, productTypes) {
      state.productTypes = productTypes;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      fetch("http://localhost:8000/admin/products/", {
        method: "GET",
      })
        .then((obj) => obj.json())
        .then((res) => {
          commit("addProducts", res.data);
        });
    },

    fetchProductTypes({ commit }) {
      fetch("http://localhost:8000/admin/productTypes/", {
        method: "GET",
      })
        .then((obj) => obj.json())
        .then((res) => {
          res.data.forEach((el) => {
            fetch(`http://localhost:8000/admin/products/byType/${el.id}`)
              .then((obj2) => obj2.json())
              .then((data) => {
                el["productsForType"] = data;
              });
          });
          commit("setProductTypes", res.data);
        });
    },
  },
});
