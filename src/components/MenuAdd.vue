<template>
  <v-card class="_formAdd" width="600">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-title>Add new item</v-card-title>
      <v-select
        class="__input"
        :items="allCategorys"
        item-text="name"
        item-value="id"
        v-model="product.groupcategory_id"
        label="Category"
        dense
        :rules="categoryRules"
        @change="getCategory"
      ></v-select>
      <v-select
        class="__input"
        :items="allfecthAllGroup"
        item-text="name"
        item-value="id"
        v-model="group"
        label="Group"
        dense
        :disabled="show"
        :rules="groupRules"
      ></v-select>
      <v-text-field
        class="__input"
        v-model="product.name"
        label="Name"
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        class="__input"
        v-model="product.description"
        label="Description"
      ></v-text-field>
      <v-text-field
        class="__input"
        v-model="product.price"
        label="Price"
        type="number"
        :rules="numberRules"
        suffix="VNĐ"
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
          v-if="tempImageUrl"
          :src="tempImageUrl"
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
    allfecthAllGroup() {
      return this.$store.getters["group/getGroupByCategory"];
    },
  },
  data() {
    return {
      tempImageUrl: "",
      product: {
        name: null,
        groupcategory_id: null,
        price: null,
        description: null,
        image: null,
      },
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
      imageError: ''
    };
  },
  methods: {
    validate() {
      if(!this.$refs.form.validate()){
        return false
      }
      return true
    },
    async getCategory() {
      await this.$store.dispatch("group/fecthGroupByCategoryId",this.product.groupcategory_id
      );
      this.show = false;
    },
    getImage(e) {
      this.imageError = ''
      this.product.image = e.target.files[0];
      const types = ["image/jpeg", "image/png", "image/gif"]

      if (!types.includes(e.target.files[0].type)) { 
        this.imageError = 'Extension must be an image'
        return this.valid = false
      }
      this.tempImageUrl = URL.createObjectURL(this.product.image)
    },
    validateImage() {
      this.imageError = ''
      if(!this.product.image) {
        this.imageError = 'image is required'
        return false
      }
      return true
    },
    async onCreate() {  
      if(!this.validate() && !this.validateImage()) {
       return
      } else if(!this.validateImage()) {
        return
      } else if(!this.validate()){
        return
      } else {
        const form = new FormData();
        form.append("name", this.product.name);
        form.append("groupcategory_id", this.group);
        form.append("price", this.product.price);
        form.append("image", this.product.image);
        await this.$store.dispatch("product/onCreateProduct", form);
        await alert("Thêm món thành công");
        this.$router.push("/menu");
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
  .__uploadImage {
    margin-left: 1.5rem;
  }
  .__image {
    height: 200px;
    width: 200px;
    border: 1px solid;
  }

}
</style>
