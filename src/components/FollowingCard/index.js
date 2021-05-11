import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import {
    Container,
    ArtistInfo,
    ArtistAvatar,
    ArtistName,
    NameAndCategories,
    DisplayImage,
    Categories,
    Category
} from './styles'
import * as firebase from "firebase";
import "firebase/firestore";

const FollowingCard = ({ artistId, navigation }) => {

    const [anunciante, setAnunciante] = useState({});
    const [anuncianteProfile, setAnuncianteProfile] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
    const [firstProduct, setFirstProduct] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
    const getAnuncianteData = async () => {
        const userDocument = await firebase.firestore()
            .collection('usuario')
            .doc(artistId)
            .get()
            .then((doc) => {
                setAnunciante(doc.data());
            })
        const profile = await firebase.storage().ref('user_photo/' + artistId).getDownloadURL();
        setAnuncianteProfile(profile);
        const querySnapshot = await firebase
            .firestore()
            .collection('produto')
            .where('anunciante', '==', artistId)
            .limit(1)
            .get()
        let titulo;
        querySnapshot.forEach(doc => titulo = doc.data().titulo)

        const uri = await firebase.storage().ref('user_products/' + artistId + '/' + titulo + '/0').getDownloadURL();
        setFirstProduct(uri);
    }

    useEffect(() => {
        getAnuncianteData();
    }, [])

    return (
        <>
            {anunciante &&
                <Container onPress={() => navigation.navigate('Página do Artista', {anunciante: {...anunciante, id: artistId}})} >
                    <>
                        <ArtistInfo>
                            <ArtistAvatar source={{ uri: anuncianteProfile }} />
                            <NameAndCategories>
                                <ArtistName>{anunciante.nome}</ArtistName>
                                <Categories>
                                    <Category>Pintura</Category>
                                    <Category>Papel</Category>
                                    <Category>Criativo</Category>
                                </Categories>
                            </NameAndCategories>
                        </ArtistInfo>

                        <DisplayImage source={{ uri: firstProduct }} />
                    </>

                </Container>
            }
        </>
    )
}

export default FollowingCard
