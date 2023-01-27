<template>
  <div class="singleproduct">
    <h3>{{ currProduct.product_name }}</h3>
    <div v-if="product.image_url == 'slika'" id="image">IMAGE NOT AVALIABLE</div>
    <ul>
      <li>PRICE: {{ product.product_price }}</li>
      <li>DESCRIPTION: {{ product.product_description }}</li>
      <li>AVERAGE SCORE: {{ this.averageScore }}</li>
      <li>
        Reviews:
        <ul v-for="rev in reviews">
          <li>Review Title: {{ rev.review_title }}</li>
          <li>Review Text: {{ rev.review_text }}</li>
          <li>Review Rating: {{ rev.review_rating }}</li>
        </ul>
      </li>
    </ul>
    <div id="buttons">
      <b-button-group>
        <b-button variant="dark" id="addToCart" @click="addToCart(currProduct)">Add to cart</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SingleProduct",
  props: {
    product: Object,
  },
  data() {
    return {
      currProduct: null,
      reviews: null,
      averageScore: 0,
    };
  },
  created() {
    this.currProduct = this.product;
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapActions(["getProduct", "addProductToCart"]),
    addToCart(product) {
      let token = localStorage.token;
      let payload = token.split(".")[1];
      let user = JSON.parse(atob(payload));
      const obj = {
        userID: user.id,
        productID: this.currProduct.id,
        cart_item_quantity: 1,
      };
      this.addProductToCart(obj);
    },
  },
  mounted() {
    let token = localStorage.token;
    console.log(this.currProduct);
    if (token === "") {
      alert("NOT SIGNED IN");
      this.$router.push({ name: "products" });
      return;
    } else {
      this.reviews = this.currProduct.reviewsForProduct;
      let counter = 0;
      let avg = 0;
      this.reviews.forEach((el) => {
        counter++;
        avg += el.review_rating;
      });
      this.averageScore = avg / counter;
    }
  },
};
</script>
