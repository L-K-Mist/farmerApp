<template>
<v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4  offset-xl2>
  <v-container>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4  offset-xl2>
      <v-flex xs12>
        <template v-if="me.name !== null">
          <div v-if="$apollo.loading">Loading...</div>
          <div v-else>Hi {{ me.name }}, please share a bit more about yourself for us...</div>

        </template>
        
      </v-flex>
    </v-flex>
  </v-container>
  <br>
  <v-form ref="form" v-model="valid" lazy-validation>
<v-container fluid grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Who You Are</div>
        </v-card-title>
        <v-card-text>
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
              :counter="10"
              mask="phone"
          ></v-text-field>
          <v-text-field
              label="Land Line"
              v-model="person.landLine"
              mask="(###) ### ####"
          ></v-text-field>
          <v-text-field
              label="ID Number"
              persistent-hint=""
              hint="Required of you want to sell through us"
              v-model="person.idSA"
              :rules="isNumberRule"
              :counter="13"
              mask="###### #### ###"
          ></v-text-field>         
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Where You Are</div>
        </v-card-title>
        <v-card-text>
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
              :rules="isNumberRule"
              :counter="4"
              mask="####"
          ></v-text-field>
          <v-select
            :items="items.provinces"
            v-model="person.address.province"
            label="Select your province"
            single-line
          ></v-select>                
          
        </v-card-text>
      </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <div class="headline">What You Do</div>
            </v-card-title>
            <v-card-text>
              <v-select
                  label="Farming Activities"
                  :items="items.activities"
                  v-model="activities"

                  hint="Whichever best describes your operation"
                  persistent-hint
              ></v-select>
              <v-textarea
                  v-model="longDescription"
                  label="Care to go into more detail?"
              ></v-textarea>        
              
            </v-card-text>
     
          </v-card>     
        </v-flex>
        <br>
        <v-flex xs12>
          
        <v-flex xs8>
          For now, click "SUBMIT" to see something completely different.
        </v-flex>
        <br>
        </v-flex>
  


        <v-btn
            :disabled="!valid"
            href="https://welink.netlify.com/"
            target="blank"
        >
            submit
        </v-btn>
        <v-btn @click="clear"><a  ></a>clear</v-btn>
      </v-layout>  
    </v-container> 
  </v-form>

</v-flex>
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
      v => (v && v.length <= 15) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    isNumberRule: [v => /^[0-9]*$/.test(v) || "Numbers only please"],
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
