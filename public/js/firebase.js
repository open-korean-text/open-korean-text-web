// Initialize Firebase
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

var questionNumber = getRandomInt(1, 3000)

var ref = defaultDatabase.ref('/tokenization_examples/' + questionNumber);
