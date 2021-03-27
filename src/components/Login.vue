<template>
  <div>
  <EmailVerificationRequest/>
  <section id="firebaseui-auth-container"></section>
  </div>
</template>

<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

//import firebase from "firebase";
//import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from 'firebaseui';
import EmailVerificationRequest from '@/components/EmailVerificationRequest.vue'

import "firebase/firestore";
//import axios from 'axios';

export default {
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
    let ui = firebaseui.auth.AuthUI.getInstance();
    let uiConfig = {
      signInSuccessUrl: "/",
//      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID]
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$isLogin = true;
        this.$displayName = user.displayName
        this.$user_email  = user.email
        this.$user_id     = user.uid

        let db = firebase.firestore();
        db.collection("users").doc(user.uid).get().then(docSnapshot =>{
          if (docSnapshot.exists){
            this.$internalUserId = docSnapshot.get("id");
            console.log(this)
            console.log(docSnapshot.get("id"))
            console.log(this.$internalUserId)
          }
        }).catch(err => alert(err))
      } else {
        if (!ui) {
          ui = new firebaseui.auth.AuthUI(firebase.auth());
          ui.start("#firebaseui-auth-container", uiConfig);
        }
      }
    });
  },
}
</script>
