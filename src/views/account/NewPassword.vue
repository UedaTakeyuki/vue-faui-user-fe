<template>
  <v-card>
    <v-card-title>
      new password
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/account/newpassword"
      >
        guide
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="password"
        :type="show_password ? 'text' : 'password'"
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show_password = !show_password"
        label="Password"
        prepend-icon="mdi-lock"
        v-bind:error="passwordError"
        v-bind:error-messages="passwordErrorMessage"
        :rules="passwordRules"
        required
      />
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="showLoginAgain" @click="logout">logout</v-btn>
      <!-- Floating Action Button -->
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="primary"
        @click="update_password"
      >
        <v-icon>done</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

//import firebase from "firebase/app";
//import "firebase/auth";
import Logout from "./Logout"
import User from "./User"

export default {
  mixins: [Logout, User],
  data: function () {
    return {
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be longer than 6 characters'
      ],
      show_password: false,

      showLoginAgain: false,
    }
  },
  methods: {
    update_password: function(){
      let result = confirm('Are you sure to change password?');
      if (result){
        this.user.updatePassword(this.password).then(() => {
          // Update successful.
          this.passwordError = false
          this.passwordErrorMessage = ""
        }).catch((error) => {
          if (error.code == "auth/requires-recent-login"){
            this.showLoginAgain = true
          }
          // An error happened.
          console.log("error", error)
          this.passwordError = true
          this.passwordErrorMessage = error.message
//          console.log(this)
//          console.log(error.message)
//          console.log(error);
        });
      }
    },
    /*
    logout: function(){
      let result = confirm('Are you sure to Sign Out from this account?');
      if (result){
        this.logout_soon();
      }
    },
    logout_soon: function() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = 'index.html';
      }).catch(function(error) {
        console.log(error)
        // An error happened.
      });
      console.log("logout")
      return;
    },
    */
  },
  /*
  created: function(){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.email = user.email;
      this.displayName = user.displayName;
    });  
  },
  */
}
</script>