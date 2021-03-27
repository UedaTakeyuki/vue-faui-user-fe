import firebase from "firebase/app";
import "firebase/auth";

export default{
  data: function () {
    return {
      user: null,
    }
  },
  created: function(){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.email = user.email;
      this.displayName = user.displayName;
    });  
  }
}