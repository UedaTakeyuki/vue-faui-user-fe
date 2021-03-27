const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
*  [Channge and deploy]
*
*  firebase deploy --only functions
*  
*  refer https://firebase.google.com/docs/functions/get-started
*
*
*  [Switch using project]
*  firebase use koshinto-3c4ff
*  firebase use koshinto-dev
*
*  [Update firebase cli]
*
*  firebase tools --version
*  curl -sL firebase.tools | upgrade=true bash
*/

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
let fireStore = admin.firestore();

// axios
const axios = require('axios');

// Hashid
const Hashids = require('hashids/cjs')
let hashids = new Hashids("For Internal ID of koshinto",
                          8,
                          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

exports.createUser = functions.auth.user().onCreate(async (user) => {
  // get and increment user counter
  let docRef = fireStore.collection('system').doc('uid_counter');
  let snapshot = await docRef.get();
  let counter = snapshot.get('counter');
  let id = hashids.encode(counter++);
  snapshot.ref.update({counter: counter}); 
  console.log(id)

  // create user document
  fireStore.collection("users").doc(user.uid).set({
    id: id
  });

  // call "cntl/adduser" on koshinto with created ID info
  docRef = fireStore.collection('system').doc('settings');
  snapshot = await docRef.get();
  let koshinto = snapshot.get('koshinto');
  const url = koshinto + "/cntl/adduser"
//  const url = "https://koshinto-sv.uedasoft.com/cntl/adduser"
  var params = new URLSearchParams();
  params.append('internalID', id);
  params.append('externalID', 'users.uid');
  const res2 = await axios.post(url, params);
  if (res2.status == 200) {
    console.log("Add User completed")
  } else {
    console.log("Add User fail!")
    console.log(res2.status)
    console.log(res2.data)
  }

});

exports.deleteUser = functions.auth.user().onDelete( (user) => {
  // delete user document
  fireStore.collection("users").doc(user.uid).delete()
});

/*
exports.createID = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
  // ... Your code here
  const newValue = snap.data();
  console.log(newValue)
  let citiesRef = fireStore.collection('system').doc('uid_counter');
  let snapshot = await citiesRef.get();
  let counter = snapshot.get('counter');
  let id = hashids.encode(counter++);
  console.log(id)
  snap.ref.update({id: id});
  snapshot.ref.update({counter: counter}); 
});
*/

