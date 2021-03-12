import React from 'react';
import {
        StyleSheet,
        View,
        Image,
        Dimensions,
        Text
        } from 'react-native';
import Masonry from '../Masonry';
import PhotoCard from '../PhotoCard';
import { Container } from './styles';

const vpWidth = Dimensions.get('window').width;

const PhotosGrid = ({navigation}) => {
    return (
        <Container>
            <Masonry
                itemsProvider={dataItemProvider}
                renderItem={PhotoCard}
                pageSize={10}
                navigation={navigation}
             />
        </Container>
    );
}

// Card's data provider
function dataItemProvider(pageSize=2){
    
    return [...Array(pageSize).keys()].map((i) => {
        return {
            //image_url: `https://i.picsum.photos/id/${parseInt(Math.random() * 200)}/300/400.jpg`,
            image_url: 'https://source.unsplash.com/featured/?craft',
            height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
            key:i
          };
        });
}

export default PhotosGrid;