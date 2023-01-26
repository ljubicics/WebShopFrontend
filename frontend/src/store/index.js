import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productTypes: [],
    token: "",
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
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = "";
      localStorage.token = "";
    },
    getToken() {
      return localStorage.token;
    },
  },
  actions: {
    login: function ({ commit }, obj) {
      fetch("http://localhost:9000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((tkn) => {
          console.log(tkn.token);
          if (tkn.msg) {
            alert(tkn.msg);
            return tkn.msg;
          } else {
            commit("setToken", tkn.token);
          }
        });
    },
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
