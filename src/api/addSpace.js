import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addSpace(space, navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    var i;
    for(i = 0; i < 5; i++){
      if(space.images[i]){
        const reference = firebase.storage().ref('spaces/' + currentUser.uid + '/' + space.name + '/' + i);
        const response = await fetch(space.images[i])
        const blob = await response.blob();
        await reference.put(blob);
      }
    }
    await firebase
        .firestore()
        .collection('local')
        .add({
          anunciante: currentUser.uid,
          titulo: space.name,
          descricao: space.details,
          categorias: space.categories,
          local: space.locations,
          links: space.contacts,
        })
        .then(() => {
          console.log('space added!');
          navigation.navigate('Inicio')
        });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
    console.log(err)
  }
}