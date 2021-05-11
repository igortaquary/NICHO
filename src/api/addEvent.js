import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addEvent(event, navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    for (const date of event.dates){
      date.from = date.from.toDate()
      date.to = date.to.toDate()
    }
    for(let i = 0; i < 4; i++){
      if(event.spacePhotos[i]){
        const reference = firebase.storage().ref('events/' + currentUser.uid + '/' + event.name + '/' + i);
        const response = await fetch(event.spacePhotos[i])
        const blob = await response.blob();
        await reference.put(blob);
      }
    }
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
          datas: event.dates
        })
        .then(() => {
          console.log('Event added!');
          navigation.navigate('Inicio')
        });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
    console.log(err)
  }
}