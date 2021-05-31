<template>
  <div>
  <EmailVerificationRequest/>
  <section id="firebaseui-auth-container"></section>
  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
  </div>
</template>

<script>
/* eslint-disable no-console */

//import firebase from "firebase";
//import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
//import firebase from "firebase/app";
//import firebase from "firebase";
//import "firebase/auth";
//import * as firebaseui from 'firebaseui';
import EmailVerificationRequest from '@/components/EmailVerificationRequest2.vue'

//import "firebase/firestore";
//import axios from 'axios';

export default {
//  props: ['firebase'],
  components: {
    EmailVerificationRequest
  },
  data: function () {
    return {
//      is_login: false,
    }
  },
  methods: {
    path_to_types_with_id: function(id){
      return "/types/" + id;
    },
  },
  mounted() {
    let ui = this.$parent.$firebaseui.auth.AuthUI.getInstance();
    let uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [this.$parent.$firebase.auth.EmailAuthProvider.PROVIDER_ID, 
                      /* firebase.auth.FacebookAuthProvider.PROVIDER_ID */
                     ],
//      signInOptions: [this.firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: this.$parent.$firebaseui.auth.CredentialHelper.NONE
    };
    this.$parent.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // set user globals
        this.$isLogin = true;
        this.$displayName = user.displayName
        this.$user_email  = user.email
        this.$user_id     = user.uid

        // set $internalUserId

      } else {
        if (!ui) {
          ui = new this.$parent.$firebaseui.auth.AuthUI(this.$parent.$firebase.auth());
          ui.start("#firebaseui-auth-container", uiConfig);
        }
      }
    });
  },
}
</script>
