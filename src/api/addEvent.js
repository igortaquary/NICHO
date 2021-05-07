import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addEvent(event, navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    var i;
    for(i = 0; i < 4; i++){
      if(event.spacePhotos[i]){
        const reference = firebase.storage().ref('events/' + currentUser.uid + '/' + event.name + '/' + i);
        const response = await fetch(event.spacePhotos[i])
        const blob = await response.blob();
        await reference.put(blob);
      }
    }
    console.log(event.dates[0].date.from)
    await firebase
        .firestore()
        .collection('evento')
        .add({
          anunciante: currentUser.uid,
          organizador: event.organizers,
          titulo: event.name,
          descricao: event.details,
          categorias: event.categories,
          local: event.localization,
          ingresso: event.isFree,
        })
        .then(() => {
          console.log('Event added!');
          navigation.navigate('Main')
        });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
    console.log(err)
  }
}