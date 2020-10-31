<template>
  <v-card class="_formAdd" width="600">
    <v-card-title>Add user</v-card-title>
    <v-text-field
      class="__input"
      label="Email"
      v-model="register.email"
      :loading="loading"
      :rules="[rules.required, rules.max, rules.email]"
    ></v-text-field>
    <v-text-field
      class="__input"
      label="Name"
      v-model="register.name"
      :loading="loading"
      :rules="[rules.required, rules.max]"
    ></v-text-field>
    <v-text-field
      class="__input"
      label="Password"
      type="password"
      v-model="register.password"
      :loading="loading"
      :rules="[rules.required, rules.min, rules.max]"
    ></v-text-field>
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
    <div class="__btnConfirm">
      <v-btn class="__btn" dark large color="#43A047" @click="onRegister()"
        >Create</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      register: {
        email: null,
        name: null,
        password: null,
      },
      errors: [],
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          max(v) {
            if(v) {
              return v.length <= 100 || 'Max 100 characters'
            }
            return true
          },
        email: (value) => {
          if (value.length > 0) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          }
        },
        },
    };
  },
  methods: {
    validation() {
      if (this.register.email && this.register.name && this.register.password) {
        return true;
      }

      this.errors = [];

      if (!this.signin.email) {
        this.errors.push("Email is required.");
      } else if (!this.validEmail(this.signin.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.register.name) {
        this.errors.push("Name is required.");
      }

      if (!this.signin.password) {
        this.errors.push("Password is required.");
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async onRegister() {
      this.errors = [];
      this.loading = true;
      if (!this.validation()) return (this.loading = false);
      await this.$store.dispatch("account/register", this.register);
      this.loading=false;
      this.$router.push("account");
    },
  },
};
</script>

<style lang="scss" scoped>
._formAdd {
  margin: auto;
  .__input {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .__inputFile {
    margin-right: 1.5rem;
  }
  .__btnConfirm {
    text-align: right;
    .__btn {
      margin: 0.5rem;
    }
  }
}
</style>
