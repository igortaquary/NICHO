import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function signIn(email, password) {
  try {
   const loggedUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

   return loggedUser.user.uid;
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