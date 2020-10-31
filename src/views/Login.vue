<template>
  <v-app>
    <v-card class="_loginForm" width="400">
      <v-card-title>Sign in</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          class="_inputForm"
          label="Account*"
          v-model="signin.email"
          :rules="emailRules"
          :loading="loading"
          required
        ></v-text-field>
        <v-text-field
          class="_inputForm"
          label="Password*"
          type="password"
          v-model="signin.password"
          :loading="loading"
          :rules="passwordRules"
          required
          @keyup.enter.native="onSignIn"
        ></v-text-field>
      </v-form>
      <v-alert class="_inputForm" type="error" v-if="errors.length">
        <ul>
          <li
            style="list-style-type:none"
            v-for="(error, index) in errors"
            :key="index"
          >
            {{ error }}
          </li>
        </ul>
      </v-alert>
      <v-btn class="_btn-SignIn" color="primary" right @click="onSignIn" :disabled="!valid"
        >Sign in</v-btn
      >
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      signin: {
        email: null,
        password: null,
      },
      emailRules: [
          v => !!v || "E-mail is required",
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "E-mail must be valid",
      ],
      passwordRules:[
          v => !!v || 'Password is required',
          v => ( v && v.length <= 100) || 'Password must be less than 100 characters',
          v => ( v && v.length > 7) || 'Password must be more than 8 characters'
      ],
      errors: [],
      loading: false,
      valid: true,
    };
  },
  async created() {
    await localStorage.removeItem("token");
  },
  methods: {
    validation() {
      if (this.signin.email && this.signin.password) {
        return true;
      }
      
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validate() {
      this.$refs.form.validate()
    },
    async onSignIn() {
      this.errors = [];
      this.loading = true;
      if (!this.validation()) {
        this.loading = false;
        this.validate()
      } else if (!this.validEmail(this.signin.email)) {
        this.loading = false;
      } else if (this.signin.password.length < 8) {
        this.loading = false;
      } else {
        await this.$store.dispatch("account/signin", this.signin);
        if (localStorage.getItem("token") != null) {
          this.loading = false;
          this.$router.push("home");
        } else {
          this.errors = [];
          this.loading = false;
          this.errors.push("email or password is incorrect");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
._loginForm {
  margin: auto;
  ._inputForm {
    margin: 0rem 2rem 0rem 2rem;
  }
  ._btn-SignIn {
    float: right;
    margin: 1rem 2rem 1rem 0;
  }
}
</style>
