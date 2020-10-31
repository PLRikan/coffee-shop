<template>
  <v-footer fixed padless centered>
    <v-bottom-navigation grow color="teal">
      <v-btn router-link to="/home">
        <span>Home</span>
        <v-icon>house</v-icon>
      </v-btn>

      <v-btn router-link to="/cart">
        <span>Cart</span>
        <v-icon>store</v-icon>
      </v-btn>

      <v-btn router-link to="/bill">
        <span>Bill</span>
        <v-icon>receipt_long</v-icon>
      </v-btn>

    </v-bottom-navigation>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.v-bottom-navigation {
  align-items: center;
}
</style>
