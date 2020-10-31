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
            <th class="_text-left">#</th>
            <th class="_text-left">Name</th>
            <th class="_text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allGroups" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-btn
                class="__btn"
                color="#43A047"
                dark
                small
                fab
                @click="onMore(item.id)"
              >
                <v-icon>create</v-icon>
              </v-btn>
              <v-btn
                color="#F44336"
                class="__btn"
                fab
                small
                dark
                @click="onDialog(item)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" persistent max-width="460">
      <v-card v-if="dialogDelete">
        <v-card-title class="headline"
          >Do you want to delete {{dialogDelete.name}}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Disagree</v-btn
          >
          <v-btn color="green darken-1" text @click="onDelete(dialogDelete.id)"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.allGroups.length) {
      await this.$store.dispatch("group/fecthAllGroup");
    } else {
      this.loading = true;
      await this.$store.dispatch("group/fecthAllGroup");
      this.loading = false;
    }
  },
  computed: {
    allGroups() {
      return this.$store.getters['group/getAllGroup'];
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      dialogDelete: null
    };
  },
  methods: {
    async onDelete(data) {
      await this.$store.dispatch("group/onDeleteCategory", data);
      await alert("Xoá thành công");
      await this.$store.dispatch("group/fecthAllGroup");
      this.dialog = false;
    },
    onDialog(data){
      this.dialog = true
      this.dialogDelete = data
    },
    onMore(data){
      this.$router.push("/group/" + data);
    }
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
