import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function signIn(email, password, navigation) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        navigation.navigate('Main')
      });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("Erro no logout!", err.message);
  }
}