import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function signUp(name, email, user, password, gender, region, newsletter, navigation) {
  try {
   await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = firebase.auth().currentUser;
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
          navigation.navigate('Main')
        });
    })
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
  }
}
