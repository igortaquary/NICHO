import React, { useEffect, useState } from 'react';
import { Container, LabelsContainer } from './styles';
import { View, Text } from 'react-native';
import Masonry from 'react-native-masonry-list';
import Label from '../Label';

const PhotosGrid = ({navigation, refreshing, products, addMore}) => {

    const goToProductPage = (product) => {
        console.log(product);
        navigation.navigate('ProductPage', {product});
    }

    return(
        products.length > 0 ?
        <Masonry
            images={products}
            refreshing={refreshing}
            onEndReached={addMore ? addMore : () => {}} //addMore = function
            onEndReachedThreshold={5}
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
        :
        <Text style={{color: '#aaa', marginLeft: 'auto', marginRight: 'auto', marginTop: '40%'}}>
            Nenhum produto foi encontrado.
        </Text>
    )
}

export default PhotosGrid;