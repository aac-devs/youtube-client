import { firebase, googleAuthProvider } from '../firebase/firebase-config';

// AUTHENTICATION:
const authMethod = async (method, params) => {
  console.log('auth method');
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

// DATABASE:
// const FIREBASE_DOMAIN = 'https://client-37115-default-rtdb.firebaseio.com/favorites/';
// const FIREBASE_DOMAIN = 'http://localhost:9000/favorites/';
const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;

console.log('FIREBASE DOMAIN:', FIREBASE_DOMAIN);

const getAllFromFavorites = async (userId) => {
  try {
    const url = `${FIREBASE_DOMAIN}${userId}.json`;
    const resp = await fetch(url);
    const dataResp = await resp.json();
    if (dataResp) {
      const dataTransformed = Object.entries(dataResp).map((item) => {
        return { docId: item[0], ...item[1] };
      });
      return { ok: true, data: dataTransformed };
    }
    return { ok: false };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

const addFavoriteToFirebase = async (data) => {
  const { userId, ...rest } = data;
  const url = `${FIREBASE_DOMAIN}${userId}.json`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(rest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataResp = await resp.json();
    return { ok: true, docId: dataResp.name };
  } catch (error) {
    console.log(error.message);
    return { ok: false, error: error.message };
  }
};

const removeFavoriteFromFirebase = async (userId, docId) => {
  const url = `${FIREBASE_DOMAIN}${userId}/${docId}.json`;
  try {
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await resp.json();
    return { ok: true };
  } catch (error) {
    console.log(error.message);
    return { ok: false, error: error.message };
  }
};

export {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sighUpWithEmailAndPassword,
  addFavoriteToFirebase,
  removeFavoriteFromFirebase,
  getAllFromFavorites,
};
