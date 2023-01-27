import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/AllProductsView.vue";
import SingleTypeView from "../views/SingleTypeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import SingleProductView from "../views/SingleProductView.vue";
import CartView from "../views/CartView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: ProductView,
  },
  {
    path: "/prodType/:id",
    name: "Product type",
    component: SingleTypeView,
  },
  {
    path: "/signup",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: LoginView,
  },
  {
    path: "/single/:id",
    name: "SingleProductView",
    component: SingleProductView,
  },
  {
    path: "/yourcart",
    name: "CartView",
    component: CartView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
