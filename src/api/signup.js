import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import {Alert} from "react-native";

export async function signUp(name, email, user, password, gender, region, newsletter, image) {
  try {
   await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const currentUser = firebase.auth().currentUser;
        if(image){
          const reference = firebase.storage().ref('user_photo/' + currentUser.uid);
          const response = await fetch(image)
          const blob = await response.blob();
          await reference.put(blob);
        }
        firebase.firestore()
        .collection('usuario')
        .doc(currentUser.uid)
        .set({
          nome: name,
          email: email,
          usuario: user,
          genero: gender,
          regiao: region,
        })
        .then(() => {
          console.log('User added!');
        });
    })
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
  }
}

export async function updateUser(id, name, email, user, password, gender, region, newsletter, image) {
  console.log("id: " + id);

  if(image){
    const reference = firebase.storage().ref('user_photo/' + id);
    const response = await fetch(image)
    const blob = await response.blob();
    await reference.put(blob);
  }

  if(password !== 'placeholder') {
    const user = firebase.auth().currentUser;
    await user.updatePassword(password);
  }
  
  const userRef = firebase.firestore().collection('usuario').doc(id);
  return await userRef.update({
    nome: name,
    email: email,
    usuario: user,
    genero: gender,
    regiao: region,
  });
}