<template>
  <v-card class="_formAdd" width="600">
    <v-card-title>Add Category</v-card-title>
    
    <v-text-field class="__input" label="Name" v-model="group.name" :loading="loading" :rules="[rules.required, rules.max]"></v-text-field>
    
    <v-alert class="__input" type="error" v-if="errors.length">
      <ul>
        <li
          style="list-style-type:none"
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error }}
        </li>
      </ul>
    </v-alert>

    <div class="__btnConfirm">
      <v-btn class="__btn" dark large color="#43A047" @click="onCreate">Create</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return{
      group:{
        name: null
      },
      errors: [],
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          max(v) {
            if(v) {
              return v.length <= 100 || 'Max 100 characters'
            }
            return true
          },
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }
  },
  methods:{
    validation() {
      if(this.group.name){
        return true
      }

      this.errors = [];

      if (!this.group.name) {
        this.errors.push("Name is required.");
      }
    },
    async onCreate() {
      this.errors = [];
      this.loading = true;
      if(!this.validation()) return this.loading = false;
      await this.$store.dispatch("createGroup", this.group);
      this.loading=false;
      this.$router.push("/group");
    }
  }
};
</script>

<style lang="scss" scoped>
._formAdd {
  margin: auto;
  .__input {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .__inputFile {
    margin-right: 1.5rem;
  }
  .__btnConfirm {
    text-align: right;
    .__btn {
      margin: 0.5rem;
    }
  }
}
</style>
