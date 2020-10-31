<template>
  <v-card class="_formAdd" width="600">
    <v-card-title>Add Group</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        class="__input"
        v-model="category.name"
        label="Name"
        :rules="nameRules"
      ></v-text-field>
      <v-select
        class="__input"
        :items="allCategorys"
        item-text="name"
        item-value="id"
        label="Category"
        v-model="category.category_id"
        dense
        :rules="categoryRules"
      ></v-select>
      <v-alert class="__input" type="error" v-if="errors.length">
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
        <v-btn class="__btn" large color="#43A047" @click="onCreate" :disabled="!valid"
          >Create</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("category/fecthAllCategory");
  },
  computed: {
    allCategorys() {
      return this.$store.getters["category/getAllCategory"];
    },
  },
  data() {
    return {
      category: {
        name: null,
        category_id: null,
      },
      errors: [],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length > 3) || "Name must be more than 3 characters",
        (v) =>
          (v && v.length <= 100) || "Name must be less than 100 characters",
      ],
      categoryRules: [(v) => !!v || "Category is required"],
      valid: true,
    };
  },
  methods: {
    validation() {
      if (this.category.name && this.category.category_id) {
        return true;
      }
      return false
    },
    validate() {
      if(!this.$refs.form.validate()){
        return false
      }
      return true
    },
    async onCreate() {
      this.errors = [];
      this.loading = true;
      if (!this.validation()) {
        this.loading = false;
        this.validate();
      } else {
        await this.$store.dispatch("group/onCreateGroup", this.category);
        this.loading = false;
      }
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
