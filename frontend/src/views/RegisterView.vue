<template>
  <div id="app">
    <b-container>
      <b-form @submit.stop.prevent @submit="onSubmit">
        <b-form-group label="First name:" label-for="first_name">
          <b-form-input
            :state="validatorFName"
            id="first_name"
            v-model="form.first_name"
            type="text"
            placeholder="First name"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorFName">
            First name must contain more than 1 character.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Last name:" label-for="last_name">
          <b-form-input
            :state="validatorLName"
            id="lastName"
            v-model="form.last_name"
            type="text"
            placeholder="Last name"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorLName">
            Last name must contain more than 1 character.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Email:" label-for="email">
          <b-form-input
            :state="validatorEmail"
            id="email"
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorEmail">
            That is not a valid email address.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Username:" label-for="username">
          <b-form-input
            :state="validatorUsername"
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorUsername">
            Username must be between 3 and 30 characters.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Street:" label-for="street">
          <b-form-input
            :state="validatorStreet"
            id="street"
            v-model="form.street"
            type="text"
            placeholder="Street"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorUsername">
            Username must be between 3 and 30 characters.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
          <b-form-input
            :state="validatorPassword"
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatorPassword">
            Password must be between 8 and 256 characters.
          </b-form-invalid-feedback>
          <b-form-valid-feedback
            :state="
              validatorUsername &&
              validatorPassword &&
              validatorEmail &&
              validatorFName &&
              validatorLName &&
              validatorStreet
            "
          >
          </b-form-valid-feedback>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="dark" id="submit">Sign Up</b-button>
          <b-button variant="dark" id="goToSignIn" to="/signin">Go to Sign In </b-button>
        </b-button-group>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",

  components: {},

  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        street: "",
      },
    };
  },

  methods: {
    ...mapActions(["register"]),
    onSubmit(e) {
      e.preventDefault();
      const data = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        username: this.form.username,
        password: this.form.password,
        street: this.form.street,
      };
      if (
        this.validatorEmail &&
        this.validatorFName &&
        this.validatorLName &&
        this.validatorPassword &&
        this.validatorUsername &&
        this.validatorStreet
      ) {
        this.register(data);
        this.$router.push({ name: "home" });
      }
    },
  },
  computed: {
    validatorUsername() {
      return this.form.username.length >= 3 && this.form.username.length <= 30;
    },
    validatorPassword() {
      return this.form.password.length >= 8 && this.form.password.length <= 256;
    },
    validatorEmail() {
      if (this.form.email.includes("@") && this.form.email.includes(".")) return true;
      return false;
    },
    validatorFName() {
      return this.form.first_name.length >= 1 && this.form.first_name.length <= 128;
    },
    validatorLName() {
      return this.form.last_name.length >= 1 && this.form.last_name.length <= 128;
    },
    validatorStreet() {
      return this.form.street.length >= 3 && this.form.street.length <= 30;
    },
  },
};
</script>
<style scoped>
#app {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
#submit {
  margin-top: 50px;
}
#goToSignIn {
  margin-top: 50px;
  margin-left: 5px;
}
</style>
