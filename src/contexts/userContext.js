import React, { useContext, createContext, useEffect, useState } from 'react';
import { signIn } from '../api/auth';
import fetchUser from '../api/fetchUser';
import { signUp } from '../api/signup';
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from 'react-native';

const UserContext = createContext({});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [collections, setCollections] = useState([])

    useEffect(() => {
        console.log('context effect')
        if(user){
            loadCollections();
        }
    }, [user])

    const loadCollections = async () => {
        console.log('loadCollections');
        console.log(user);
        const auxCollections = []
        const res = await firebase
            .firestore()
            .collection('usuario')
            .doc(user.id)
            .collection('colecoes')
            .get();
        for(const doc of res.docs) {
            let auxProdutos = []
            for(const product of doc.data().produtos){
                const produto = await firebase.firestore().collection('produto').doc(product.id).get();
                const firstImage = await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/0').getDownloadURL();
                auxProdutos.push({...produto.data(), uri: firstImage});
            }
            auxCollections.push({titulo: doc.data().titulo, produtos: auxProdutos, ref: doc.ref})
        }
        setCollections(auxCollections);
    }

    const addProductToCollection = async (doc, product) => {
        await doc.ref.update({
            produtos: firebase.firestore.FieldValue.arrayUnion({
                id: product.id,
                anunciante: product.anunciante,
                titulo: product.titulo
            })
        })
        Alert.alert('Produto adicionado!')
        loadCollections();
    }

    const addProductToNewCollection = async (product, newCollectionTitle) => {
        await firebase
            .firestore()
            .collection('usuario')
            .doc(user.id)
            .collection('colecoes')
            .add({
                titulo: newCollectionTitle,
                produtos: [{
                    id: product.id,
                    anunciante: product.anunciante,
                    titulo: product.titulo
                }]
            });
        loadCollections();
        Alert.alert('Produto adicionado!')
    }

    const SignIn = async (email, password, navigation) => {
        const loggedUid = await signIn(email, password);
        const currentUser = await fetchUser(loggedUid);
        setUser(currentUser);
        navigation.navigate('Main');
    }

    const SignUp = async (name, email, user, password, gender, region, newsletter, navigation, image) => {
        await signUp(name, email, user, password, gender, region, newsletter, image);
        await SignIn(email, password, navigation);
    }

    return (
        <UserContext.Provider value={{ user: user, collections: collections,SignIn, loadCollections, SignUp, addProductToCollection, addProductToNewCollection }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { UserProvider, useUserContext }
