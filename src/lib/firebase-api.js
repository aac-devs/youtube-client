import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';

const sighUpWithEmailAndPassword = async (enteredUser) => {
  try {
    const { email, password } = enteredUser;
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { uid, displayName, photoURL } = user;
    return {
      ok: true,
      user: { uid, displayName, photoURL },
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const signInWithEmailAndPassword = async (enteredUser) => {
  const { email, password } = enteredUser;
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const { uid, displayName, photoURL } = user;
    return {
      ok: true,
      user: { uid, displayName, photoURL },
    };

    // return { uid: '1234567890', displayName: 'Andrés', photoURL: null };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const signInWithGoogle = async () => {
  try {
    const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
    const { uid, displayName, photoURL } = user;
    return {
      ok: true,
      user: { uid, displayName, photoURL },
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const signOut = async () => {
  console.log('Sign Out');
  try {
    await firebase.auth().signOut();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sighUpWithEmailAndPassword,
};

/*
   const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log({ enteredEmail, enteredPassword });
    firebase
      .auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then(({ user }) => {
        const { uid, displayName, photoURL } = user;
        console.log({ uid, displayName, photoURL });
      })
      .catch((error) => {
        console.log(error.message);
      });
*/
