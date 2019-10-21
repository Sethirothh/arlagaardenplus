var firebaseConfig = {
  apiKey: "AIzaSyDKpCwJmVR-Cocdk8YfK29BmKY3ra37yic",
  authDomain: "arlagarden-plus.firebaseapp.com",
  databaseURL: "https://arlagarden-plus.firebaseio.com",
  projectId: "arlagarden-plus",
  storageBucket: "arlagarden-plus.appspot.com",
  messagingSenderId: "767790512730",
  appId: "1:767790512730:web:856aae4e1bce6c2913f663",
  measurementId: "G-PQ6HTJ1NCV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const questionRef = db.collection("questions");
const userRef = db.collection("users");
let currentUser;

// Firebase UI configuration
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '#home',
};

// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

function logout() {
  firebase.auth().signOut();
  showPage("home");
  activateMenu();
}

function showLoader(show) {
  let loader = document.querySelector("#loader");
  // if show == true , remove hide class from #loader
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}
