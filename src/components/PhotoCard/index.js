import React from 'react';
import { Image } from 'react-native';
import { Container, LabelsContainer } from './styles';
import Label from '../Label'


const PhotoCard = (dataItem, key, navigation) => {
    return (
        <Container key={key} style={{height: dataItem.height}} 
            onPress={ () => navigation.navigate('ProductPage') }>
            <Image 
                style={{flex: 1}}
                source={{uri: dataItem.image_url}}
            />
            <LabelsContainer>
                <Label icon='check' backgroundColor='white'/>
                <Label icon='ampulheta' backgroundColor='white'/>
                <Label icon='vegano' />
            </LabelsContainer>
        </Container>
    );
}

export default PhotoCard;