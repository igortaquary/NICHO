import React, { useEffect, useState } from 'react';
import { Container, LabelsContainer } from './styles';
import Masonry from 'react-native-masonry-list';
import Label from '../Label';
import * as firebase from "firebase";

const PhotosGrid = ({navigation, refreshing, products}) => {

    const goToProductPage = (product) => {
        navigation.navigate('ProductPage', {product});
    }

    return(
        <Masonry
            images={products}
            refreshing={refreshing}
            rerender={refreshing}
            initialNumInColsToRender={10}
            onPressImage={ (item) => {goToProductPage(item)}}
            renderIndividualFooter={
                (item) => 
                <LabelsContainer>
                    { item.available && <Label icon='check' />}
                    { item.sheduling && <Label icon='ampulheta'/> }
                    { item.green && <Label icon='vegano' /> }
                </LabelsContainer>
            }
            spacing={2}
            imageContainerStyle={{
                borderRadius: 10,
            }}
        />
    )
}

export default PhotosGrid;