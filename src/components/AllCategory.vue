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

    <v-simple-table fixed-header height="672">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="_text-left">Id</th>
            <th class="_text-left">Name</th>
          </tr>
        </thead>
        <tbody v-if="$store.state.allGroup.length">
          <tr v-for="(item, index) in allGroups" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.allGroups.length) {
      await this.$store.dispatch("fecthAllGroup");
    } else {
      this.loading = true;
      await this.$store.dispatch("fecthAllGroup");
      this.loading = false;
    }
  },
  computed: {
    allGroups() {
      return this.$store.state.allGroup;
    },
  },
  data() {
    return {
      loading: false,
    };
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
