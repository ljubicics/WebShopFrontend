<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-brand to="/">
          <img src="./assets/gem.png" class="d-inline-block align-top" alt="Diamond" />
          Zlatara
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item-dropdown text="Products">
              <b-dropdown-item
                v-for="prodType in productTypes"
                :key="prodType.id"
                :to="`/prodType/${prodType.id}`"
              >
                >
                {{ prodType.typeName + "s" }}
              </b-dropdown-item>
              <b-dropdown-item to="/products">Show All Products</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/contact">Contact</b-nav-item>
            <b-nav-item v-if="token" to="/yourcart">Cart</b-nav-item>
            <b-nav-item v-if="token" to="/logout">Sign Out</b-nav-item>
            <b-nav-item v-if="!token" to="/signin">Sign In</b-nav-item>
            <b-nav-item v-if="!token" to="/signup">Sign Up</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "App",

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    ...mapState(["products", "productTypes", "token"]),
  },

  mounted() {
    this.fetchProducts();
    this.fetchProductTypes();
    //this.removeToken();
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapActions(["fetchProducts", "fetchProductTypes"]),
    ...mapMutations(["removeToken", "setToken"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav {
  padding: 30px;
  color: #000000;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #000000;
}

#nav-collapse {
  margin-right: 40px;
  color: #000000;
}
</style>
