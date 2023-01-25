<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-brand to="/">
          <img
            src="./assets/gem.png"
            class="d-inline-block align-top"
            alt="Diamond"
          />
          Zlatara Ljubicic
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item-dropdown text="Products">
              <b-dropdown-item> "ENGLESKI" </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/contact">Contact</b-nav-item>
            <b-nav-item to="/yourcart">Cart</b-nav-item>
            <b-nav-item to="/signin">Sign In</b-nav-item>
            <b-nav-item to="/signup">Sign Up</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      searchQuery: "",
    };
  },

  methods: {},
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
