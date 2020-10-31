<template>
  <v-container>
    <v-form ref="form" v-model="form">
      <v-row>
        <v-col>
          <v-card v-if="carts.length">
            <v-card-title>Invoice </v-card-title>
            <v-card-subtitle>Invoice code</v-card-subtitle>
            <div class="__content">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in carts" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>
                        <v-text-field
                          label="Quantity"
                          :rules="quantityRules"
                          v-model="item.quantity"
                          type="number"
                        ></v-text-field>
                      </td>
                      <td>{{ item.price | numFormat }}</td>
                      <td>
                        <v-btn
                          color="#F44336"
                          class="__btn"
                          fab
                          small
                          dark
                          @click="onDialogz(item)"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
            <div class="__textRight __textMargin">
              <h2 v-if="total_prices">
                Tổng cộng: {{ total_prices | numFormat }} VNĐ
              </h2>
            </div>
            <div class="__btnConfirm">
              <v-dialog v-model="dialog" persistent max-width="460">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="#F44336" v-bind="attrs" v-on="on">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="headline"
                    >Do you want to Delete all item in cart?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false"
                      >Disagree</v-btn
                    >
                    <v-btn color="green darken-1" text @click="onDelete"
                      >Agree</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <template
                v-if="form"
              >
                  <v-btn
                  class="__btn"
                  color="#0277BD"
                  @click="onOrder"
                  >Order</v-btn
                >
              </template>
              <template
                v-else
              >
                <v-btn
                :disabled="!form"
                class="__btn"
                color="#0277BD"
                >Order</v-btn
              >
              </template>
            </div>
          </v-card>
          <v-card v-if="!carts.length">
            <v-card-title>Giỏ hàng trống</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog v-model="dialogz" persistent max-width="460">
      <v-card v-if="dialogDeleteData">
        <v-card-text class="headline"
          >Do you want to delete  in cart?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogz = false"
            >Disagree</v-btn
          >
          <v-btn color="green darken-1" text @click="onDeleteCart()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      bill: {
        productArr: [],
        total_price: null,
      },
      dialog: false,
      dialogz: false,
      quantityRules: [
        (v) => !!v || "Quantity is required",
        (v) => (v && v <= 50) || "Quantity must be less than 50",
        (v) => (v && v > 0) || "Quantity must be more than 0",
      ],
      form: false,
      dialogDeleteData: null
    };
  },
  computed: {
    carts() {
      return this.$store.getters["cart/getCart"];
    },
    total_prices() {
      return this.carts.reduce((prev, cur) => {
        return prev + cur.price * cur.quantity;
      }, 0);
    },
  },
  methods: {
    onDialogz(data){
      this.dialogz = true;
      this.dialogDeleteData = data;
    },
    validation() {
      if (this.bill.productArr) {
        return true;
      }
    },
    async onOrder() {
      this.bill.productArr = [...this.carts];
      this.bill.total_price = this.total_prices;
      await this.$store.dispatch("bill/onCreateBill", this.bill);
      await this.$store.dispatch("cart/onDeleteCart");
      await alert("Order thành công");
      await this.$router.push("/home");
    },
    async onDelete() {
      await this.$store.dispatch("cart/onDeleteCart");
      await alert("Xoá thành công");
      await this.$router.push("/home");
    },
    async onDeleteCart() {
      await this.$store.dispatch("cart/onDeleteCartItem", this.dialogDeleteData);
      this.dialogz = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.__textCenter {
  text-align: center;
}
.__textRight {
  text-align: right;
}
.__textMargin {
  margin: 0 1rem 1rem 0;
}
.__btnConfirm {
  text-align: right;
  .__btn {
    margin: 0.5rem;
  }
}
</style>
