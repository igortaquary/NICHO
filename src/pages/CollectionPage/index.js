import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import PhotosGrid from '../../components/PhotosGrid';
import SearchBar from '../../components/SearchBar';
import { useUserContext } from '../../contexts/userContext';
import {
    Container,
    Description,
    Count,
    Button,
    ButtonText
} from './styles';

const CollectionPage = ({navigation, route}) => {

    const title = route.params.titulo;
    const colecao = route.params.colecao;
    const products = route.params.produtos;

    const {removeProductFromCollection}  = useUserContext()

    // const [searchText, setSearchText] = useState('');
    const [savedProducts, setSavedProducts] = useState(products);
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        navigation.setOptions({ title: title });

    }, []);

    const handleRemove = async (id) => {        
        setSavedProducts(savedProducts.filter(product => product.id != id))
        await removeProductFromCollection(id, colecao)
    }

    return (
        <>
            <Container>
                <Description>Explore seus produtos salvos :)</Description>
                <Count>{savedProducts ? savedProducts.length : 'X'} itens salvos</Count>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button onPress={() => navigation.navigate('Home')}>
                        <ButtonText>
                            Mais ideias
                        </ButtonText>
                    </Button>
                    <Button onPress={() => setEditable(!editable)}>
                        <ButtonText>
                            {editable ? 'Parar edição' : 'Editar items'}
                        </ButtonText>
                    </Button>
                </View>
                {/* <SearchBar onTextChange={(value) => setSearchText(value)} placeholder='Pesquise seus itens salvos' /> */}
            </Container>
            <View style={{flex: 1, paddingTop: '3%', backgroundColor: 'white'}}>
                <PhotosGrid deleteItem={handleRemove} editing={editable} navigation={navigation} products={savedProducts} />
            </View>
        </>
    )
}

export default CollectionPage
