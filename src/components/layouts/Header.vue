<template>
<div>
  <nav>
    <v-toolbar dense fixed>
      <v-toolbar-title class="text-uppercase grey--text" @click="goHome">
        <span class="font-weight-light">Coffee</span>
        <span>Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-subheader>Menu</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item router-link to="/menu">
            <v-list-item-icon>
              <v-icon>library_add</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Menu management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router-link to="/account">
            <v-list-item-icon>
              <v-icon>group_add</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Account management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router-link to="/bill-manage">
            <v-list-item-icon>
              <v-icon>receipt_long</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Bill management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="dialog = true">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
  <v-dialog v-model="dialog" persistent max-width="460">
      <v-card>
        <v-card-title class="headline"
          >Do you want to Sign Out</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Disagree</v-btn
          >
          <v-btn
            color="green darken-1"
            text
            @click="onSignOut"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      dialog: false,
    };
  },
  methods: {
    onSignOut() {
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/home");
    }
  },
};
</script>

<style lang="scss" scoped></style>
