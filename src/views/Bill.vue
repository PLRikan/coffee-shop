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

    <v-simple-table v-if="bills.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Total price</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bills" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.created_at | moment("DD-MM-YYYY hh:mm") }}</td>
            <td>{{ item.total_price | numFormat }} VNĐ</td>
            <td>
              <v-btn
                class="__btn"
                color="#43A047"
                dark
                small
                fab
                depressed
                @click="onMore(item.id)"
              >
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center">
    <v-pagination
    class="__pagination"
      v-model="page"
      :length="pagePagination"
      @input="changePages"
    ></v-pagination>
  </div>
  </v-container>
</template>

<script>
export default {
  async mounted() {
    if (this.bills.length) {
      await this.$store.dispatch("bill/getBillFirstPagination");
    } else {
      this.loading = true;
      await this.$store.dispatch("bill/getBillFirstPagination");
      this.loading = false;
    }
  },
  computed: {
    bills() {
      return this.$store.getters['bill/getFirstBillPagination'];
    },
    pagePagination() {
      return this.$store.getters['bill/getBillPagePagination'];
    }
  },
  data() {
    return {
      loading: false,
      page: 1
    };
  },
  methods: {
    onMore(data) {
      this.$router.push("/bill/" + data);
    },
    async changePages() {
      await this.$store.dispatch("bill/getBillPagination", this.page);
    }
  },
};
</script>

<style lang="scss" scoped>
.__btn {
  margin-left: 0.5rem;
  color: white;
}
.__textCenter {
  text-align: center;
}
.__pagination{
  margin-bottom: 3rem ;
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
