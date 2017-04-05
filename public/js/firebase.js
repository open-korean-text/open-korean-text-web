// Initialize Firebase
var config = {
  apiKey: "AIzaSyAqru-W24WUNZj8SuKnOnlUo3Pcuqme5jA",
  authDomain: "open-korean-text-web.firebaseapp.com",
  databaseURL: "https://open-korean-text-web.firebaseio.com",
  projectId: "open-korean-text-web",
  storageBucket: "open-korean-text-web.appspot.com",
  messagingSenderId: "1026312463332"
};
var defaultApp = firebase.initializeApp(config);

var defaultDatabase = defaultApp.database();

var ref = defaultDatabase.ref('/tokenization_examples/' + getRandomInt(1, 42301));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// var provider = new firebase.auth.GoogleAuthProvider();
//
// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

console.log(getRandomInt(1, 42301))