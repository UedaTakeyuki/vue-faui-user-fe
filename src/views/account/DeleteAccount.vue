<template>
  <v-card>
    <v-card-title class="red--text">
      delete this account
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/account/deleteaccount"
      >
        guide
      </v-btn>
    </v-card-title>
    <v-card-text class="red--text">Once you delete this account, there is no going back. Please be certain.</v-card-text>
    <v-card-actions>
      <!-- Floating Action Button -->
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="red lighten-2"
        @click="delete_user"
      >
        <v-icon>mdi-delete-forever</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data: function () {
    return {
    }
  },
  methods: {
    delete_user: function() {
      let result = confirm('Are you sure to DELETE this account?');
      if (result){
        /* eslint-disable no-unused-vars */
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          /*
          var param = {idToken: idToken};
          $.post("postDeleteUser.php", param,
            function(data){

          });
          */
          firebase.auth().currentUser.delete().catch(function(error) {
            if (error.code == 'auth/requires-recent-login') {
              // The user's credential is too old. She needs to sign in again.
              firebase.auth().signOut().then(function() {
                // The timeout allows the message to be displayed after the UI has
                // changed to the signed out state.
                setTimeout(function() {
                  alert('Please sign in again to delete your account.');
                }, 1);
              });
            }
          });
        });
      }
    },
  },
}
</script>