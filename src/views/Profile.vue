<template>
<v-container
fluid
>
  <v-layout column align-center>
    <v-form ref="form" v-model="valid" lazy-validation>
      <template v-if="me.name !== null">
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>Hi {{ me.name }}, please share a bit more about yourself for us...</div>

      </template>
        <v-text-field v-if="!$apollo.loading"
            
            :rules="nameRules"
            :counter="10"
            :label="me.name"
            :value="me.name"
            required
        ></v-text-field>
        <v-text-field v-if="!$apollo.loading"

            :rules="emailRules"
            :label="me.email"
            :value="me.email"
            required
        ></v-text-field>
        <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
        ></v-select>

        <v-btn
            :disabled="!valid"
            @click="submit"
        >
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-layout>  
</v-container>
    
</template>

<script>
import gql from "graphql-tag";
export default {
  data: () => ({
    valid: true,
    me: "",
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  apollo: {
    me: gql`
      query me {
        me {
          name
          email
        }
      }
    `
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
