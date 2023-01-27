<template>
  <div v-if="cart" id="pub">
    <Cart :cart="cart" />
  </div>
  <div v-else>
    <h4>Empty cart</h4>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartView",

  components: {
    Cart,
  },
  data() {
    return {
      cart: null,
    };
  },
  methods: {
    ...mapActions(["getCart"]),
  },
  computed: {
    ...mapState(["products", "currCart"]),
  },
  mounted() {
    let token = localStorage.token;
    let payload = token.split(".")[1];
    let user = JSON.parse(atob(payload));
    this.getCart(user.id).then((res) => {
      console.log(res.data);
      this.cart = res.data;
    });
  },
  computed: {},
};
</script>

<style>
#footer {
  bottom: 0;
  left: 0;
  margin-top: auto;
}
#pub {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
