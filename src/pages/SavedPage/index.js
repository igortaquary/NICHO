import React from 'react'
import { FlatList, Text } from 'react-native';
import SavedCard from '../../components/SavedCard';
import SearchBar from '../../components/SearchBar';
import { Container, Line, PlacesAndEvents } from './styles';

// Static test data
const savedList = [
    {
        id: 1,
        label: 'Locais',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?italy'
            },
            {
                uri: 'https://source.unsplash.com/featured/?france'
            },
            {
                uri: 'https://source.unsplash.com/featured/?greece'
            },
        ]
    },
    {
        id: 2,
        label: 'Eventos',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?event'
            },
            {
                uri: 'https://source.unsplash.com/featured/?museum'
            },
            {
                uri: 'https://source.unsplash.com/featured/?temple'
            },
        ]
    },
    {
        id: 3,
        label: 'Para vestir',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?skirt'
            },
            {
                uri: 'https://source.unsplash.com/featured/?blouse'
            },
            {
                uri: 'https://source.unsplash.com/featured/?shoe'
            },
        ]
    },
    {
        id: 4,
        label: 'Inspiração',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?yoga'
            },
            {
                uri: 'https://source.unsplash.com/featured/?fitness'
            },
            {
                uri: 'https://source.unsplash.com/featured/?sports'
            },
        ]
    },
    {
        id: 5,
        label: 'Quadros',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?art'
            },
            {
                uri: 'https://source.unsplash.com/featured/?painting'
            },
            {
                uri: 'https://source.unsplash.com/featured/?drawing'
            },
        ]
    },
    {
        id: 6,
        label: 'Pinturas',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?illustration'
            },
            {
                uri: 'https://source.unsplash.com/featured/?sketch'
            },
            {
                uri: 'https://source.unsplash.com/featured/?frame'
            },
        ]
    },
    {
        id: 7,
        label: 'Quero comprar',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?landscape'
            },
            {
                uri: 'https://source.unsplash.com/featured/?fair'
            },
            {
                uri: 'https://source.unsplash.com/featured/?store'
            },
        ]
    },
    {
        id: 8,
        label: 'Casa',
        images: [
            {
                uri: 'https://source.unsplash.com/featured/?landscape'
            },
            {
                uri: 'https://source.unsplash.com/featured/?fair'
            },
            {
                uri: 'https://source.unsplash.com/featured/?store'
            },
        ]
    },
]

const SavedPage = () => {

    const renderItem = (item, index) => (
        <SavedCard
            images={item.item.images}
            label={item.item.label}
            labelStyle={{
                color: item.index > 1 ? "#707070" : "#019B92",
                fontFamily: item.index > 1 ? 'Raleway_600SemiBold' : 'Raleway_400Regular'
            }}
        />
    )

    return (
        <Container>
            <SearchBar />
            <FlatList
                style={{ flex: 1, marginTop: 25 }}
                data={savedList}
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
