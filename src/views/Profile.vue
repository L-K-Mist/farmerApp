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
      <br>
        <v-text-field v-if="!$apollo.loading"
            :rules="nameRules"
            :counter="10"
            label="First Name"
            :value="me.name"
            required
        ></v-text-field>
        <v-text-field v-if="!$apollo.loading"
            :rules="emailRules"
            :label="me.email"
            :value="me.email"
            required
        ></v-text-field>
        <v-text-field
            label="Last Name"
            v-model="person.lastName"
            required
        ></v-text-field>
        <v-text-field
            label="Cell Number"
            v-model="person.cellNo"
        ></v-text-field>
        <v-text-field
            label="Land Line"
            v-model="person.landLine"
        ></v-text-field>
        <v-text-field
            label="ID Number"
            hint="Required of you want to sell through us"
            v-model="person.idSA"
        ></v-text-field>
        <v-flex xs12>
          <h3>Address</h3>
        <v-text-field
            label="Address Line 1"
            hint="Required of you want to sell through us"
            v-model="person.address.line1"
        ></v-text-field>   
        <v-text-field
            label="Address Line 2"
            hint="Required of you want to sell through us"
            v-model="person.address.line2"
        ></v-text-field>     
        <v-text-field
            label="Address Line 3"
            v-model="person.address.line3"
        ></v-text-field>
        <v-text-field
            label="Area"
            v-model="person.address.area"
        ></v-text-field>   
        <v-text-field
            label="Postal Code"
            v-model="person.address.postalCode"
        ></v-text-field>
        <v-select
          :items="items.provinces"
          v-model="person.address.province"
          label="Select your province"
          single-line
        ></v-select>                
        </v-flex>        
        <v-select
            label="Farming Activities"
            :items="items.activities"
            v-model="activities"
            multiple
            chips
            hint="You can pick more than one"
            persistent-hint
        ></v-select>
        <v-text-field
            v-model="shortDescription"
            label="Short Description - What is your PASSION?"
            required
        ></v-text-field>
        <v-textarea
            v-model="longDescription"
            label="Care to go into more detail?"
        ></v-textarea>        
        <v-text-field v-if="!$apollo.loading"
            v-model="shortDescription"
            label="Short Description - What is your PASSION?"
            required
        ></v-text-field>
                <v-textarea v-if="!$apollo.loading"
            v-model="longDescription"
            label="Care to go into more detail?"
        ></v-textarea>

        <v-btn
            :disabled="!valid"
            href="https://welink.netlify.com/"
            target="blank"
        >
            submit
        </v-btn>
        <v-btn @click="clear"><a  ></a>clear</v-btn>
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
    shortDescription: "",
    longDescription: "",
    person: {
      lastName: "",
      cellNo: null,
      landLine: null,
      idSA: null,
      address: {
        line1: "",
        line2: "",
        line3: "",
        area: "",
        postalCode: "",
        province: ""
      },
      enterprise: "",
      activity: "",
      practice: "",
      association: "",
      profilePic: null
    },
    items: {
      activities: ["Commercial", "Semi-Commercial", "Market-Grower"],
      provinces: ["Kwazulu-Natal", "Cape Province", "..or BUST", "Elsewhere"]
    },
    activities: [],
    shortDescription: "",
    longDescription: ""
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
    submit() {},
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
