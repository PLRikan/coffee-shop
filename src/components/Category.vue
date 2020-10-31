<template>
  <div>
    <v-row no-gutters>
      <v-col class="col1" xs="12" sm="4" md="3" lg="2" xl="2">
        <div class="sideBar">
          <v-list>
        
            <v-list-item-group color="primary">
              <v-list-item router-link to="/home">
              <v-list-item-content>
                <v-list-item-title>All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
              <v-list-item v-for="(item, index) in allGroups" :key="index" @click="onClick(item.id)">
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
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
  async mounted() {
    if (this.allGroups && this.allGroups.length) {
      await this.$store.dispatch("group/fecthAllGroup");
    } else {
      this.loading = true;
      await this.$store.dispatch("group/fecthAllGroup");
      this.loading = false;
    }
  },
  computed: {
    allGroups() {
      return this.$store.getters["group/getAllGroup"]
    }
  },
  methods:{
    onClick(name){
      this.$router.push('/orders/'+name).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.sideBar {
  .btnItem {
    margin-bottom: 0.25rem;
  }
}
</style>
