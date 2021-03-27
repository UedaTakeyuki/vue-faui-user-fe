<template>
    <v-card>
    <v-card-title>
      change name
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/account/changename"
      >
        guide
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="displayName"
        label="First & last name"
        v-bind:error="displayNameError"
        v-bind:error-messages="displayNameErrorMessage"
        :rules="displayNameRules"
        required

      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="displayName=user.displayName">reset</v-btn><!-- Reset Button -->
      <!-- Floating Action Button -->
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="primary"
        @click="update_displayname"
      >
        <v-icon>done</v-icon>
      </v-btn>

    </v-card-actions>
  </v-card> 
</template>

<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

import User from "./User"

export default {
  mixins: [User],
  data: function () {
    return {
      user: null,

      displayName: "",
      displayNameError: false,
      displayNameErrorMessage: "",
      displayNameRules: [
        v => !!v || 'Name is required',
        //v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
    }
  },
  methods: {
    update_displayname: function(){
      let result = confirm('Are you sure to change name?');
      if (result){
        this.user.updateProfile({displayName: this.displayName}).then(() => {
          // Update successful.
          this.displayNameError = false
          this.displayNameErrorMessage = ""
        }).catch((error) => {
          // An error happened.
          this.displayNameError = true
          this.displayNameErrorMessage = error.message
        });
      }
    },
  },
}
</script>