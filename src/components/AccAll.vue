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
            <th class="_text-left">Email</th>
            <th class="_text-left">Name</th>
            <th class="_text-left">More</th>
          </tr>
        </thead>
        <tbody v-if="allAccounts.length">
          <tr v-for="(item, index) in allAccounts" :key="index">
            <td>{{ item.email }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-dialog v-model="dialog" persistent max-width="460">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#F44336" class="__btn" fab small dark v-bind="attrs" v-on="on">
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"
                  >Do you want to delete {{item.name}}</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false"
                    >Disagree</v-btn
                  >
                  <v-btn color="green darken-1" text @click="onDelete(item)"
                    >Agree</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.allAccounts.length) {
      await this.$store.dispatch("account/fecthAllAccount");
    } else { 
      this.loading = true;
      await this.$store.dispatch("account/fecthAllAccount");
      this.loading = false;
    }
  },
  data(){
    return {
      loading: false,
      dialog: false
    }
  },
  computed: {
    allAccounts() {
      return this.$store.getters["account/getAllAccount"];
    },
  },
  methods:{
    async onDelete(data){
      await this.$store.dispatch("account/onDeleteAccount", data);
      await alert('Xoá thành công')
      await this.$store.dispatch("account/fecthAllAccount");
      this.dialog = false
    }
  }
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
