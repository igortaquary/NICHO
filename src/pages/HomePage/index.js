import React, { useState, useEffect} from 'react';
import PhotosGrid from '../../components/PhotosGrid';
import * as firebase from "firebase";

const HomePage = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    //const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(refreshing);
        if(refreshing === false){
            fetchProducts();
        }
    }, [])

    const fetchProducts = async () => {
        setRefreshing(true);
        //console.log('fetch products');
        const auxProducts = [];
        const auxImages = [];
        const querySnapshot = await firebase.firestore().collection('produto').get()
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

    return(
        <PhotosGrid products={products} refreshing={refreshing} navigation={navigation} />
    )
};

export default HomePage;