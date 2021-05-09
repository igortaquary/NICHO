import React, { useEffect, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import * as firebase from "firebase";
import "firebase/firestore";
import { Feather } from '@expo/vector-icons';
import {
    SectionTitle,
    CollectionCard,
    CollectionImage,
    CollectionTitle,
    NewCollectionCard
} from './styles';

import { useUserContext } from '../../contexts/userContext';

const SaveProductModal = ({ modalizeRef, product }) => {

    const [toggleNewCollection, setToggleNewCollection] = useState(false);
    const [newCollectionTitle, setNewCollectionTitle] = useState('');
    const newCollectionInput = useRef(null);

    const { user, collections, addProductToCollection, addProductToNewCollection, loadCollections } = useUserContext();

    useEffect(() => {
        console.log('save modal')
    }, [collections])

    const addProductToNew = async () => {
        await addProductToNewCollection(product, newCollectionTitle);
        setToggleNewCollection(false);
    }

    return (
        <Modalize
            onClose={() => setToggleNewCollection(false)}
            ref={modalizeRef}
            snapPoint={450}
            handleStyle={{
                marginTop: '8%',
                backgroundColor: '#c4c4c4',
                width: '25%'
            }}
            scrollViewProps={{showsVerticalScrollIndicator: false}}
            modalStyle={{
                paddingTop: '9%',
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40
            }}
            HeaderComponent={() => (
                <Text style={{ fontSize: 15, textAlign: 'center', fontFamily: 'Raleway_600SemiBold' }}>Salvar Produto</Text>
            )}
        >
            <SectionTitle>Nova coleção</SectionTitle>
            <NewCollectionCard onPress={() => setToggleNewCollection(true)} >
                <Feather name="plus-square" style={{ marginRight: 5 }} size={24} color="#a1a1a1" />
                <CollectionTitle>Adicionar nova</CollectionTitle>
            </NewCollectionCard>
            {toggleNewCollection && 
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput autoFocus ref={newCollectionInput} style={{flex: 1}} placeholder="Nome da coleção" value={newCollectionTitle} onChangeText={(value) => setNewCollectionTitle(value)} />
                <TouchableOpacity style={{backgroundColor: '#019B92', padding: 5, borderRadius: 5}} onPress={addProductToNew}>
                    <Text style={{color: '#FFFFFF'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
            }
            <SectionTitle>Suas coleções</SectionTitle>
            {collections && collections.map(collection => (
                <CollectionCard key={collection.ref.id} onPress={() => addProductToCollection(collection, product)}>
                    <CollectionImage source={{ uri: collection?.produtos[0].uri }} />
                    <CollectionTitle>{collection.titulo}</CollectionTitle>
                </CollectionCard>
            ))}
        </Modalize>
    )
}

export default SaveProductModal
