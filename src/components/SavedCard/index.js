import React from 'react'
import { Text, View } from 'react-native';
import { Container, Images,LeftImage, TopRightImage, BottomRightImage } from './styles';

const SavedCard = ({label, labelStyle, images}) => {
    return (
        <Container >
            <Images>
                <LeftImage source={{uri: images[0]?.uri}}/>
                <TopRightImage source={{uri: images[1]?.uri}}/>
                <BottomRightImage source={{uri: images[2]?.uri}}/>            
            </Images>
            <Text style={{marginTop: 5,...labelStyle}}>{label}</Text>
        </Container>
    )
}

export default SavedCard;
