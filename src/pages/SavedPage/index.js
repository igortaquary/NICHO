import React, { useState } from 'react'
import { FlatList, Text } from 'react-native';
import SavedCard from '../../components/SavedCard';
import SearchBar from '../../components/SearchBar';
import { useUserContext } from '../../contexts/userContext';
import { Container, Line, PlacesAndEvents } from './styles';

const SavedPage = ({navigation}) => {

    const {collections} = useUserContext();
    const [searchText, setSeachText] = useState('');

    const renderItem = (item, index) => {
    return (
        <SavedCard
            onPress={() => navigation.navigate('Collection', {titulo: item.item.titulo, produtos: item.item.produtos})}
            images={item.item.produtos}
            label={item.item.titulo}
            labelStyle={{
                color: item.index > 1 ? "#707070" : "#019B92",
                fontFamily: item.index > 1 ? 'Raleway_600SemiBold' : 'Raleway_400Regular'
            }}
        />
    )}

    return (
        <Container>
            <SearchBar onTextChange={(value) => setSeachText(value)} placeholder='Pesquise seus itens salvos' />
            <FlatList
                style={{ flex: 1, marginTop: 25 }}
                data={collections.filter(collection => {
                    const haystack = collection.titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    const needle = searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return (haystack.indexOf(needle) !== -1);
                })}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            {/* <Line /> */}
        </Container >
    )
}

export default SavedPage;
