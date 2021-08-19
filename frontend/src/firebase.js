import firebase from 'firebase'

const config={
    apiKey: "AIzaSyDM0rPv-5dxhaQgaQ3uRi5OIyIYPDoldpU",
    authDomain: "lmsavatar.firebaseapp.com",
    projectId: "lmsavatar",
    storageBucket: "lmsavatar.appspot.com",
    messagingSenderId: "454341094787",
    appId: "1:454341094787:web:8a83bc85841a508dd2dab6"
}

firebase.initializeApp(config);
export default firebase;