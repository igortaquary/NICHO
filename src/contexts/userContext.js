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
    const [threads, setThreads] = useState([]);
    const [threads1, setThreads1] = useState([]);
    const [threads2, setThreads2] = useState([]);

    useEffect(() => {
        console.log('context effect')
        if(user){
            loadCollections();
        }
    }, [user])

    useEffect(() => {
        if(user){
            const unsubscribe1 = firebase.firestore()
            .collection('MESSAGE_THREADS')
            .where("uid1", "==", user.id)
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                setThreads1(threads);
            })

            const unsubscribe2 = firebase.firestore()
            .collection('MESSAGE_THREADS')
            .where("uid2", "==", user.id)
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                setThreads2(threads);
            })
            

            return () => (unsubscribe1(), unsubscribe2());
        }
    }, [user])

    useEffect(() => {
        setThreads([...threads1, ...threads2].sort((x, y) => (y.createdAt - x.createdAt)));
    }, [threads1, threads2]);

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
        <UserContext.Provider value={{ user: user, collections: collections, SignIn, loadCollections, SignUp, addProductToCollection, addProductToNewCollection, threads: threads }}>
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
