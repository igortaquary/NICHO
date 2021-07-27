import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export default async function fetchUser(uid) {
  const userDocument = await firebase.firestore()
    .collection('usuario')
    .doc(uid)
    .get()
    .then((documentSnapshot) => {
      return {...documentSnapshot.data(), id: documentSnapshot.id};
    });
  try {
    if (userDocument.nome) {
      const url = await firebase.storage().ref("user_photo/" + userDocument.id).getDownloadURL();
      userDocument.foto = url;
    }
  } catch (e) {
    console.log(e);
  }
  return userDocument;
}