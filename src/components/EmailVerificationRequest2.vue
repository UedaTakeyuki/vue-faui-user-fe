<template>
  <div id="actionElement">
    <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-success">
      <div class="firebaseui-card-header">
        <h1 class="firebaseui-title">Verification Your Email Address</h1>
      </div>
      <div class="firebaseui-card-content">
        <p class="firebaseui-text">We now need to verify your email address. We've sent an email to veryfiy your address. Please click the link in that email, then click "continue" button below. </p>
      </div>
      <div class="firebaseui-card-actions">
        <div class="firebaseui-form-actions">
          <button type="submit" id="next" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
//import firebase from "firebase/app";
//import "firebase/auth"

export default {
//  props: ['firebase'],
mounted() {
  
    let actionElement = document.getElementById('actionElement');
    actionElement.style.display = 'none'; // hide

    let next = document.getElementById('next');
    next.addEventListener('click', function() {
      //window.location.href = 'index.php';
      location.reload();
    });

    let actionCodeSettings = {
      url: location.href, // need to add this DOMAIN to whitelist of Firebase auth.
      /*  iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
      },*/
//      handleCodeInApp: true
    };
    this.$parent.$firebase.auth().onAuthStateChanged((user) => {
//    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
//        console.log("EVR firebase:", firebase)
//        console.log("EVR firebase:", this.firebase)
        if (user.emailVerified){
          this.$isEmailVerified = true;
          actionElement.style.display = 'none'; // hide
          // login completed!
        } else {
          actionElement.style.display = 'block'; // show
//          user.sendEmailVerification(); // send verification mail
          user.sendEmailVerification(actionCodeSettings); // send verification mail
        }
      } else {
        actionElement.style.display = 'none'; // hide
      }
    });
  },
}
</script>