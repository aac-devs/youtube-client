import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';

const authMethod = async (method, params) => {
  try {
    const { user } = params.email
      ? await firebase.auth()[method](params.email, params.password)
      : await firebase.auth()[method](params);
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

const sighUpWithEmailAndPassword = async ({ email, password }) => {
  return authMethod('createUserWithEmailAndPassword', { email, password });
};

const signInWithEmailAndPassword = async ({ email, password }) => {
  return authMethod('signInWithEmailAndPassword', { email, password });
};

const signInWithGoogle = async () => {
  return authMethod('signInWithPopup', googleAuthProvider);
};

const signOut = async () => {
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
