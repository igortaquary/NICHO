import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addProduct(productTitle, productDescription, selectedCategorys, selectedRegions, selectedPrimas, productPrice, images, navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    if(images[0].url != "https://source.unsplash.com/featured/?handmade"){
        const reference = firebase.storage().ref('user_products/' + currentUser.uid + '/' + productTitle);
        const response = await fetch(images[0].url)
        const blob = await response.blob();
        await reference.put(blob);
    }
    await firebase
        .firestore()
        .collection('produto')
        .add({
          anunciante: currentUser.uid,
          titulo: productTitle,
          descricao: productDescription,
          categorias: selectedCategorys,
          regioes: selectedRegions,
          materias: selectedPrimas,
          preco: productPrice
        })
        .then(() => {
          console.log('Product added!');
          navigation.navigate('Main')
        });
  } catch (err) {
    Alert.alert("Erro de autenticação!", err.message);
  }
}
