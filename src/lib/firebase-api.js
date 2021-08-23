import { db, firebase, googleAuthProvider } from '../firebase/firebase-config';

// AUTHENTICATION:
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

// DATABASE:
const getDocuments = (snapshot) => {
  const documents = [];
  snapshot.forEach((item) => {
    documents.push({
      docId: item.id,
      ...item.data(),
    });
  });
  return documents;
};

const addFavoriteToFirebase = async (data) => {
  return db
    .collection('favorites')
    .add(data)
    .then((docRef) => {
      return docRef.id;
    });
};

const removeFavoriteFromFirebase = async (docId) => {
  db.collection('favorites').doc(docId).delete();
};

export {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sighUpWithEmailAndPassword,
  addFavoriteToFirebase,
  removeFavoriteFromFirebase,
  getDocuments,
};
