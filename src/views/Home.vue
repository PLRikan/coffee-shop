<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "../components/layouts/Header.vue";
import Footer from "../components/layouts/Footer.vue";

export default {
  data(){
    return{
      
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
};
</script>

<style lang="scss" scoped></style>
