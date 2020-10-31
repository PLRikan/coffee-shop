<template>
  <div>
    <div class="_order" v-if="allProducts.length > 0">
      <v-card
        class="_product"
        width="300"
        v-for="(item, index) in allProducts"
        :key="index"
      >
        <v-img :src="item.image" width="300" height="200"></v-img>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.price | numFormat }} VNĐ</v-card-subtitle>
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
    <div class="loading" v-if="loading">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      quantity: null,
      loading: false,
      page: 2,
    };
  },
  async mounted() {
    if (this.allProducts.length) {
      await this.$store.dispatch("product/onLoadMoreFirst");
    } else {
      this.loading = true;
      await this.$store.dispatch("product/onLoadMoreFirst");
      this.loading = false;
    }
    this.scroll();
  },
  computed: {
    allProducts() {
      return this.$store.getters["product/getLoadMoreProduct"];
    },
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true;
          this.$store.dispatch("product/onLoadMore", this.page);
          this.loading = false;
          this.page += 1;
        }
      };
    },
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
.loading {
  text-align: center;
  margin-bottom: 100px;
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
