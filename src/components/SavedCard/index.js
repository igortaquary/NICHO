import React from 'react'
import { Text, View } from 'react-native';
import { Container, Images,LeftImage, TopRightImage, BottomRightImage } from './styles';

const SavedCard = ({label, labelStyle, images}) => {
    return (
        <Container >
            <Images>
                <LeftImage source={images[0]}/>
                <TopRightImage source={images[1]}/>
                <BottomRightImage source={images[2]}/>            
            </Images>
            <Text style={{marginTop: 5,...labelStyle}}>{label}</Text>
        </Container>
    )
}

export default SavedCard;
