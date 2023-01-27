import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productTypes: [],
    token: "",
    reviews: [],
    currCart: [],
  },
  mutations: {
    addProducts(state, product) {
      state.products = product;
    },
    addOndProduct(state, product) {
      state.products.push(product);
    },
    addProductTypes(state, productType) {
      state.productTypes.push(productType);
    },
    setProductTypes(state, productTypes) {
      state.productTypes = productTypes;
    },
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
    setCurrCart(state, cart) {
      state.currCart = cart;
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
    register: function ({ commit }, obj) {
      fetch("http://localhost:9000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((tkn) => {
          if (tkn.msg) {
            alert(tkn.msg);
            return;
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
          res.data.forEach((el) => {
            fetch(`http://localhost:8000/admin/reviews/${el.id}`)
              .then((obj2) => obj2.json())
              .then((res2) => {
                el["reviewsForProduct"] = res2.data;
              });
          });
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
    fetchReviews({ commit }) {
      fetch("http://localhost:8000/admin/reviews/", {
        method: "GET",
      })
        .then((obj) => obj.json())
        .then((res) => {
          commit("setReviews", res.data);
        });
    },
    getProduct({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        const product = state.products.filter((prod) => prod.id == id)[0];

        if (product) {
          resolve(product);
        } else {
          fetch(`https://localhost:8000/admin/products/${id}`)
            .then((obj) => obj.json())
            .then((res) => {
              commit("addProduct", res.data);
              resolve(res.data);
            });
        }
      });
    },
    addProductToCart: function ({ dispatch, state }, obj) {
      console.log(obj);
      const itemBody = {
        userID: obj.userID,
        productID: obj.productID,
        cart_item_quantity: obj.cart_item_quantity,
      };
      fetch("http://localhost:8000/admin/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(itemBody),
      })
        .then((res) => res.json())
        .then((data) => {});
      return;
    },
    getCart: function ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/admin/cart/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${state.token}` },
        })
          .then((obj) => obj.json())
          .then((res) => {
            //console.log(res);
            commit("setCurrCart", res);
            resolve(res);
          });
      });
    },
  },
});
