<template>
  <v-container>

    <div class="loading" v-if="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <v-row v-if="show">
      <v-col>
        <v-card>
          <v-card-title>Bill Detail</v-card-title>
          <v-card-subtitle></v-card-subtitle>
          <div class="__content">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in billById" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{item.product_name}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.price | numFormat }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div class="__textRight __textMargin">
            <h2 v-if="total_price">Tổng cộng: {{total_price | numFormat }} VNĐ</h2>
          </div>
          <div class="__btnConfirm">
            <v-btn dark class="__btn" color="#0277BD" @click="onBack">Back</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      show:true,
    };
  },
  async mounted() {
    this.loading = true;
    this.show = false
    await this.$store.dispatch("bill/getBillById", this.$route.params.id);
    await this.$store.dispatch("bill/getTotalPriceForBill", this.$route.params.id);
    this.loading = false;
    this.show = true
  },
  computed: {
    billById() {
      return this.$store.getters["bill/getBillById"]
    },
    total_price() {
      return this.$store.getters["bill/getTotalPriceForBill"]
    },
  },
  methods: {
    onBack(){
      this.$router.push('/bill')
    }
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
