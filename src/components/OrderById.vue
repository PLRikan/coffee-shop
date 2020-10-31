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

    <div class="_order" v-if="orderById.length > 0">
      <v-card
        class="_product"
        width="300"
        v-for="(item, index) in orderById"
        :key="index"
      >
        <v-img :src="item.image" width="300" height="200"></v-img>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.price | numFormat}} VNĐ</v-card-subtitle>
        <div class="_rowQuatity">
          <v-text-field
            class="_Quantity"
            label="Quantity"
            v-model="item.quantity"
          ></v-text-field>
          <v-btn class="_btn" @click="onOrder(item)">Order</v-btn>
        </div>
      </v-card>
    </div>
    <div class="__arlet">
      <h3 v-if="!orderById.length">Không có sản phẩm</h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orderById() {
      return this.$store.getters["product/getGroupById"];
    },
  },
  watch: {
    $route: async function() {
      this.loading = true;
      await this.$store.dispatch("product/fecthOrderById", this.$route.params.id);
      this.loading = false;
    },
  },
  data() {
    return {
      product: null,
      quantity: null,
      loading: false,
    };
  },
  methods: {
    onOrder(data) {
      if (data.quantity > 50) {
        alert("Tối đa 50 sản phẩm");
      } else if (data.quantity > 0) {
        const product = {
          product_id: data.id,
          name: data.name,
          price: data.price,
          quantity: Number(data.quantity),
        };
        this.$store.dispatch("cart/onCreateCart", {
          product: product,
        });
      } else if (data.quantity < 1) {
        alert("Số lượng phải lớn hơn 0");
      } else {
        alert("Vui lòng nhập số lượng");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
._order {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 100px;
  ._product {
    margin: 0.5rem;
    ._rowQuatity {
      display: flex;
      ._Quantity {
        margin-left: 1rem;
        margin-right: 1rem;
      }
      ._btn {
        margin-top: 1rem;
        margin-right: 1rem;
        background-color: #53a653;
      }
    }
  }
}
.__arlet{
  text-align: center;
  margin-top: 20px;
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
