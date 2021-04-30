import React from 'react'
import { Text, View } from 'react-native';
import { Container, Images,LeftImage, TopRightImage, BottomRightImage } from './styles';

const SavedCard = ({label, labelStyle, images}) => {
    return (
        <Container >
            <Images>
                <LeftImage source={{uri: images[0].imagens[0].url}}/>
                <TopRightImage source={{uri: images[1]?.imagens[0].url}}/>
                <BottomRightImage source={{uri: images[2]?.imagens[0].url}}/>            
            </Images>
            <Text style={{marginTop: 5,...labelStyle}}>{label}</Text>
        </Container>
    )
}

export default SavedCard;
