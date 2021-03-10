import React from 'react';
import { Image } from 'react-native';
import { Container } from './styles';
import { use } from '@react-navigation/stack'


const PhotoCard = (dataItem, key, navigation) => {
    return (
        <Container key={key} style={{height: dataItem.height}} 
            onPress={ () => navigation.navigate('ProductPage') }>
            <Image 
                style={{flex: 1}}
                source={{uri: dataItem.image_url}}
            />
        </Container>
    );
}

export default PhotoCard;