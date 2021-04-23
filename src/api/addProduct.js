import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addProduct(productTitle, productDescription, selectedCategories, selectedDelivery, selectedRegions, selectedPrimas, productPrice, images, navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    var i;
    for(i = 0; i < 3; i++){
      if(images[i].url){
        const reference = firebase.storage().ref('user_products/' + currentUser.uid + '/' + productTitle + '/' + i);
        const response = await fetch(images[i].url)
        const blob = await response.blob();
        await reference.put(blob);
      }
    }
    await firebase
        .firestore()
        .collection('produto')
        .add({
          anunciante: currentUser.uid,
          titulo: productTitle,
          descricao: productDescription,
          categorias: selectedCategories,
          regioes: selectedRegions,
          materias: selectedPrimas,
          preco: productPrice,
          entrega: selectedDelivery
        })
        .then(() => {
          console.log('Product added!');
          navigation.navigate('Main')
        });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
  }
}
