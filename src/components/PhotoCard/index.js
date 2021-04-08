import React from 'react';
import { Image } from 'react-native';
import { Container, LabelsContainer } from './styles';
import Label from '../Label'


const PhotoCard = (source, style, navigation) => {
    return (
        <Container style={{height: style.height, width: style.width, margin: style.margin}} 
            onPress={ () => {}}>
            <Image 
                style={{flex: 1}}
                source={{uri: source }}
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