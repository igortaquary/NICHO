import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function addProduct(product, images, navigation, setLoading) {
  setLoading(true);
  try {
    const currentUser = firebase.auth().currentUser;
    let i = 0;
    for (const image of images) {
      const reference = firebase.storage().ref('/user_products/' + currentUser.uid + '/' + product.titulo + '/' + i);
      const response = await fetch(image)
      const blob = await response.blob();
      await reference.put(blob);
      i++;
    }
    await firebase
        .firestore()
        .collection('produto')
        .add({
          anunciante: currentUser.uid,
          ...product
        })
        .then(() => {
          console.log('Product added!');
          navigation.navigate('Main')
        });
  } catch (err) {
    Alert.alert("Erro criando o produto!", err.message);
  }
  setLoading(false);
}
