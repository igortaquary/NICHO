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
        await firebase
            .firestore()
            .collection('usuario')
            .doc(user.id)
            .collection('colecoes')
            .get()
            .then(res => {
              const docs = res.docs.map(doc => doc);
              setCollections(docs);
            })
    }

    const addProductToCollection = async (doc, product) => {
        await doc.ref.update({
            produtos: firebase.firestore.FieldValue.arrayUnion(product)
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
                produtos: [product]
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
