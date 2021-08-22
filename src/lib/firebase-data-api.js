import { db } from '../firebase/firebaseConfig';

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

export { addFavoriteToFirebase, removeFavoriteFromFirebase, getDocuments };
