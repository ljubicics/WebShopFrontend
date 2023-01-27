<template>
  <div>
    <h4>Your cart:</h4>
    <div id="cartDiv">
      <h3>Cart</h3>
      <b-card v-for="product in productsInCart" :key="product.id">
        <b-card-text>Name: {{ product.product_name }} Price: {{ product.product_price }} </b-card-text>
        <b-card-text class="ms-auto">
          <b-button
            v-if="product"
            pill
            class="ms-auto"
            id="refBtn"
            variant="danger"
            @click="removeFromCart(product.id)"
            >Remove</b-button
          >
        </b-card-text>
      </b-card>
      <div id="totalDiv">
        <br />
        <b> Total: {{ totalPrice }} </b>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Cart",

  props: {
    cart: Array,
  },
  data() {
    return {
      productsInCart: [],
      productIDs: [],
      currCart: null,
      totalPrice: 0,
      userID: null,
    };
  },
  computed: {
    ...mapState(["token", "products"]),
  },
  created() {
    this.currCart = this.cart;
  },
  methods: {
    ...mapActions(["getToken", "getCart", "removeProductFromCart", "getProduct"]),
    removeFromCart(productID, userID) {
      let token = localStorage.token;
      let payload = token.split(".")[1];
      let user = JSON.parse(atob(payload));
      const obj = {
        productID: productID,
        userID: user.id,
      };
      this.removeProductFromCart(obj);
    },
  },
  mounted() {
    let token = localStorage.token;
    let payload = token.split(".")[1];
    let user = JSON.parse(atob(payload));
    this.currCart.forEach((el) => {
      this.productIDs.push(el.productID);
    });
    this.productIDs.forEach((el2) => {
      this.products.forEach((prod) => {
        if (el2 == prod.id) {
          if (!this.productsInCart.includes(prod)) {
            this.productsInCart.push(prod);
            this.totalPrice += prod.product_price;
          }
        }
      });
    });
    this.userID = user.id;
  },
};
</script>
