<template>
<v-container
fluid
>
  <v-layout column align-center>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field 
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field :type="'password'"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
        ></v-text-field>
        <v-text-field :type="'password'"
            v-model="confirmPassword"
            :rules="[comparePasswords]"
            label="Password Confirmation"
            
        ></v-text-field>
        <v-btn type="submit" :class="{ red: !valid, green: valid }">Sign Up</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-layout>  
</v-container>
    
</template>

<script>
import { LOGIN_MUTATION } from "@/graphql/mutations";

export default {
  name: "LogIn",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => (v && v.length > 5) || "Password must be more than 5 characters"
    ],
    confirmPassword: ""
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    }
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            localStorage.setItem("USER_TOKEN", response.data.login.token);
            this.$router.replace("/");
          })
          .catch(error => console.error(error));
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
