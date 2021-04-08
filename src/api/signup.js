import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import {Alert} from "react-native";

export async function signUp(name, email, user, password, gender, region, newsletter, navigation, image) {
  try {
   await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const currentUser = firebase.auth().currentUser;
        const reference = firebase.storage().ref('user_photo/' + currentUser.uid);
        const response = await fetch(image)
        const blob = await response.blob();
        await reference.put(blob);
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
