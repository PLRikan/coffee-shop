<template>
  <div>
    <div class="loading" v-if="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <v-simple-table fixed-header height="600">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="_text-left">#</th>
            <th class="_text-left">Name</th>
            <th class="_text-left">Price</th>

            <th class="_text-left"></th>
          </tr>
        </thead>

        <tbody v-if="allProducts.length">
          <tr v-for="(item, index) in allProducts" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price | numFormat }}</td>
            <td>
              <v-btn
                class="__btn"
                color="#43A047"
                dark
                small
                fab
                @click="onMore(item.id)"
              >
                <v-icon>create</v-icon>
              </v-btn>
              <v-btn
                color="#F44336"
                class="__btn"
                fab
                small
                dark
                @click="onDialog(item)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialog" persistent max-width="460">
          <v-card v-if="dialogDeleteData">
            <v-card-title class="headline"
              >Do you want to delete {{dialogDeleteData.name}}</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false"
                >Disagree</v-btn
              >
              <v-btn color="green darken-1" text @click="onDelete(dialogDeleteData.id)"
                >Agree</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.allProducts.length) {
      await this.$store.dispatch("product/fetchAllProduct");
    } else {
      this.loading = true;
      await this.$store.dispatch("product/fetchAllProduct");
      this.loading = false;
    }
  },
  computed: {
    allProducts() {
      return this.$store.getters["product/getAllProduct"];
    },
  },
  data() {
    return {
      loading: false,
      dialogDeleteData: null,
      dialog: false,
    };
  },
  methods: {
    async onDelete(data) {
      await this.$store.dispatch("product/onDeleteProduct", data);
      await alert("Xoá thành công");
      await this.$store.dispatch("product/fetchAllProduct");
      this.dialog = false;
    },
    async onMore(data) {
      await this.$router.push("/menu/" + data);
    },
    onDialog(data) {
      this.dialog = true
      this.dialogDeleteData = data
    }
  },
};
</script>

<style lang="scss" scoped>
._text-left {
  text-align: left;
}
.__btn {
  margin-left: 0.5rem;
}
.loading {
  text-align: center;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid black;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
