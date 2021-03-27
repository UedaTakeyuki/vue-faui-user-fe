import firebase from "firebase/app";
import "firebase/auth";

export default{
  methods: {
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
  }
}