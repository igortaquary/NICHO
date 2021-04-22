import React, { useEffect, useState } from 'react';
import { Container, LabelsContainer } from './styles';
import Masonry from 'react-native-masonry-list';
import Label from '../Label';
import * as firebase from "firebase";

const PhotosGrid = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [images, setImages] = useState([]);

    const fetchProducts = async (products) => {
        const snapshot = await firebase.firestore().collection('produto').get()
        .then((querrySnapshot) => {
            querrySnapshot.forEach((documentSnapshot) => {
                products.push(documentSnapshot.data());
              });
        });
    }

    const fetchImages = async (products, imgs) => {
        for (const item of products) {
          if (item.anunciante) {
              item.imagens = [];
              item.imagens.push({url: await firebase.storage().ref('user_products/' + item.anunciante + '/' + item.titulo + '/0').getDownloadURL(), id: 1, color: 'blue'});
              imgs.push({uri: item.imagens[0].url, product: item})
          }
        }
    };
      
    useEffect(() => {
        if(refreshing === false){
            setRefreshing(true);
            const products = [];
            const imgs = [];
            setImages([]);
            fetchProducts(products).then(() =>{
                fetchImages(products, imgs).then(() => {
                    setImages(imgs);
                });
            });
            setRefreshing(false);
        }
    }, [])

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
    return(
        
            <Masonry
                images={images}
                refreshing={refreshing}
                rerender={refreshing}
                initialNumInColsToRender={10}
                onPressImage={ (data) => {nextPage(data)}}
                renderIndividualFooter={
                    (data) => 
                    <LabelsContainer>
                        { data.available && <Label icon='check' />}
                        { data.sheduling && <Label icon='ampulheta'/> }
                        { data.green && <Label icon='vegano' /> }
                    </LabelsContainer>
                }
                spacing={2}
                imageContainerStyle={{
                    borderRadius: 10,
                }}
            />
        
    )
}

export default PhotosGrid;