import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDaDsRtFja34AnvKthjdbaMXwMWSZKXPTk',
  authDomain: 'client-37115.firebaseapp.com',
  databaseURL: 'https://client-37115-default-rtdb.firebaseio.com',
  projectId: 'client-37115',
  storageBucket: 'client-37115.appspot.com',
  messagingSenderId: '1013765138717',
  appId: '1:1013765138717:web:9736df80af44eda1a059f4',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyCoEw5vqHETOCypJ8XCJAGiZZQSG86Im1w',
//   authDomain: 'react-firechat-e5dfc.firebaseapp.com',
//   projectId: 'react-firechat-e5dfc',
//   storageBucket: 'react-firechat-e5dfc.appspot.com',
//   messagingSenderId: '198453081118',
//   appId: '1:198453081118:web:f19988688a2bad1400ea0f',
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
