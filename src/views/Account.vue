<template>
  <div class="_account">
    <v-row>
      <v-col class="col1" xs="12" sm="4" md="3" lg="2" xl="2">
        <div class="sideBar" v-if="showSidebar">
          <v-list>
            <v-subheader>Menu Managent</v-subheader>
            <v-list-item router-link to="/account/">
              <v-list-item-content>
                <v-list-item-title>All Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router-link to="/add-acc">
              <v-list-item-content>
                <v-list-item-title>Add Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
      <v-col class="col2" xs="12" sm="8" md="9" lg="10" xl="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: true,
    };
  },
};
</script>

<style lang="scss" scoped>
._title {
  text-align: center;
  display: inline;
}
._account {
  margin-top: 0.5rem;
}
</style>
