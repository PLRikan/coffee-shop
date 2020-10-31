<template>
  <v-card class="_formAdd" width="600">
    <v-card-title>Update item</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        class="__input"
        :items="allGroups"
        item-text="name"
        item-value="id"
        v-model="products.groupcategory_id"
        label="Group"
        dense
        :rules="groupRules"
      ></v-select>

      <v-text-field
        class="__input"
        v-model="products.name"
        label="Name"
        :rules="nameRules"
      ></v-text-field>

      <v-text-field
        class="__input"
        v-model="products.description"
        label="Description"
      ></v-text-field>

      <v-text-field
        class="__input"
        v-model="products.price"
        label="Price"
        :rules="numberRules"
      ></v-text-field>
      <div class="__formImage">
        <input
          class="__uploadImage"
          type="file"
          name="image"
          @change="getImage"
        />
        <img
          class="__image"
          :src="products.image"
          alt="Image"
        />
      </div>
      <v-alert class="__input" type="error" v-if="imageError">
        <span v-show="imageError">{{ imageError }}</span>
      </v-alert>
      <div class="__btnConfirm">
        <v-btn
          class="__btn"
          large
          color="#43A047"
          @click="onCreate"
          :disabled="!valid"
          >Update</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("product/fecthProductById", this.$route.params.id);
    await this.$store.dispatch("group/fecthGroupByCategoryId",this.products.groupcategory_id);
  },
  computed: {
    products() {
      return this.$store.getters["product/getProductById"];
    },
    allGroups() {
      return this.$store.getters["group/getGroupByCategory"];
    },
  },
  data() {
    return {
      errors: [],
      categoryRules: [(v) => !!v || "Category is required"],
      groupRules: [(v) => !!v || "Group is required"],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Name must be more than 3 characters",
        (v) =>
          (v && v.length <= 100) || "Name must be more less 100 characters",
      ],
      numberRules: [
        (v) => !!v || "Price is required",
        (v) => (v && v >= 1000) || "Price must be more than 1000",
        (v) => (v && v <= 10000000) || "Price must be less than 10000000",
      ],
      show: true,
      group: null,
      valid: true,
      imageError: "",
      tempImageUrl: "",
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      return true;
    },
    validateImage() {
      this.imageError = "";
      if (!this.product.image) {
        this.imageError = "image is required";
        return false;
      }
      return true;
    },
    getImage(e) {
      this.imageError = ''
      this.valid = true
      const types = ["image/jpeg", "image/png", "image/gif"]
      if (!types.includes(e.target.files[0].type)) { 
        this.imageError = 'Extension must be an image'
        this.valid = false
        return false
      }
      this.products.image = URL.createObjectURL(e.target.files[0])
    },

    async onCreate() {
      const form = new FormData();
      form.append("name", this.products.name);
      form.append("groupcategory_id", this.products.groupcategory_id);
      form.append("price", this.products.price);
      form.append("image", this.products.image);
      await this.$store.dispatch("product/onUpdateProduct", {
        id: this.products.id,
        form: form,
      });
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
  .__uploadImage {
    margin-left: 1.5rem;
  }
  .__image {
    height: 200px;
    width: 200px;
    border: 1px solid;
  }
  .__formImage {
    height: 200px;
  }
}
</style>
