<template>
  <v-card>
    <v-card-title>
      change email
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/account/changeemail"
      >
        guide
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="email"
        label="Email"
        prepend-icon="mdi-email"
        v-bind:error="emailError"
        v-bind:error-messages="emailErrorMessage"
        :rules="emailRules"
        required
      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="email=user.email">reset</v-btn><!-- Reset Button -->
      <v-btn v-if="showLoginAgain" @click="logout">logout</v-btn>
      <!-- Floating Action Button -->
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="primary"
        @click="update_email"
      >
        <v-icon>done</v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

import Logout from "./Logout"
import User from "./User"

export default {
  mixins: [Logout, User],
  data: function () {
    return {
      user: null,

      email: "",
      emailError: false,
      emailErrorMessage: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],

      showLoginAgain: false,
    }
  },
  methods: {
    update_email: function(){
      let result = confirm('Are you sure to change email?');
      if (result){
        this.user.updateEmail(this.email).then(() => {
          // Update successful.
          this.emailError = false
          this.emailErrorMessage = ""
          this.logout()
        }).catch((error) => {
          // An error happened.
          if (error.code == "auth/requires-recent-login"){
            this.showLoginAgain = true
          }
          this.emailError = true
          this.emailErrorMessage = error.message
        });
      }
    },
  },
}
</script>