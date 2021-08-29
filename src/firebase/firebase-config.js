import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDaDsRtFja34AnvKthjdbaMXwMWSZKXPTk',
  authDomain: 'client-37115.firebaseapp.com',
  databaseURL: 'https://client-37115-default-rtdb.firebaseio.com',
  storageBucket: 'client-37115.appspot.com',
  // projectId: 'client-37115',
  // messagingSenderId: '1013765138717',
  // appId: '1:1013765138717:web:9736df80af44eda1a059f4',
};

// const db = firebase.initializeApp(firebaseConfig);
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// console.log({ firebaseConfig });

// export { db, googleAuthProvider, firebase };

// const db = firebase.initializeApp(firebaseConfig);
// db.database();

// // const db = firebase.database();

// // var db = firebase.database();
// // if (location.hostname === 'localhost') {
// // Point to the RTDB emulator running on localhost.
// db.auth().useEmulator('http://localhost:9099');
// db.database().useEmulator('localhost', 9000);
// // }

// console.log('Firebase configurado');

const db = firebase.initializeApp(firebaseConfig);

db.auth().useEmulator('http://localhost:9099');
// const db = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
