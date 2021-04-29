import React, { useState, useEffect} from 'react';
import PhotosGrid from '../../components/PhotosGrid';
import * as firebase from "firebase";

const HomePage = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(refreshing);
        if(refreshing === false){
            fetchProducts();
        }
        /* if(refreshing === false){
            setRefreshing(true);
            const products = [];
            const imgs = [];
            setImages([]);
            fetchProducts();
            fetchProducts(products).then(() =>{
                fetchImages(products, imgs).then(() => {
                    setImages(imgs);
                });
            });
            setRefreshing(false);
        } */
    }, [])

    const fetchProducts = async () => {
        setRefreshing(true);
        console.log('fetch products');
        const auxProducts = [];
        const auxImages = [];
        const querySnapshot = await firebase.firestore().collection('produto').get()
        //console.log(querySnapshot);
        querySnapshot.forEach( documentSnapshot => {
            const data = documentSnapshot.data();
            auxProducts.push(data);
        });
        for(const product of auxProducts){
            const uri = await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/0').getDownloadURL();
            auxImages.push({...product, uri});
        }
        setProducts(auxImages);
        setRefreshing(false);
    }

   /*  const fetchImages = async (products, imgs) => {
        for (const item of products) {
          if (item.anunciante) {
              item.imagens = [];
              item.imagens.push({url: await firebase.storage().ref('user_products/' + item.anunciante + '/' + item.titulo + '/0').getDownloadURL(), id: 1, color: 'blue'});
              imgs.push({uri: item.imagens[0].url, product: item})
          }
        }
    };

    const nextPage = async (data) => {
        const userDocument = await firebase.firestore()
        .collection('usuario')
        .doc(data.product.anunciante)
        .get()
        .then((doc) => {
            data.product.nome = doc.data().nome;
        })
        try{
            data.product.imagens.push({url: await firebase.storage().ref('user_products/' + data.product.anunciante + '/' + data.product.titulo + '/1').getDownloadURL(), id: 2, color: 'yellow'});
            data.product.imagens.push({url: await firebase.storage().ref('user_products/' + data.product.anunciante + '/' + data.product.titulo + '/2').getDownloadURL(), id: 3, color: 'red'});
        } catch(error){
            console.log(error)
        } finally{
            navigation.navigate('ProductPage', {images:data.product.imagens, product:data.product})
        }
    }
 */
    return(
        <PhotosGrid products={products} refreshing={refreshing} navigation={navigation} />
    )
};

export default HomePage;