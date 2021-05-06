import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import PhotosGrid from '../../components/PhotosGrid';
import SearchBar from '../../components/SearchBar';
import {
    Container,
    Description,
    Count,
    Button,
    ButtonText
} from './styles';

const CollectionPage = ({navigation, route}) => {

    const title = route.params.titulo;
    const products = route.params.produtos

    useEffect(() => {
        navigation.setOptions({ title: title });

    }, [])

    return (
        <>
            <Container>
                <Description>Explore seus produtos salvos :)</Description>
                <Count>{products.length} itens salvos</Count>
                <Button onPress={() => navigation.navigate('Home')}>
                    <ButtonText>
                        Mais ideias
                    </ButtonText>
                </Button>
                <SearchBar placeholder='Pesquise seus itens salvos' />
            </Container>
            <View style={{flex: 1, paddingTop: '3%', backgroundColor: 'white'}}>
                <PhotosGrid navigation={navigation} products={products} />
            </View>
        </>
    )
}

export default CollectionPage
