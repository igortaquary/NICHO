import React, { useEffect, useState } from 'react';
import { Container, LabelsContainer, LabelsHeader } from './styles';
import { View, Text, ActivityIndicator } from 'react-native';
import Masonry from 'react-native-masonry-list';
import Label from '../Label';

const PhotosGrid = ({navigation, refreshFunction, refreshing, products, addMore, editing, deleteItem}) => {

    const goToProductPage = (product) => {
        navigation.navigate('ProductPage', {product});
    }

    return(
        !refreshing ? 
        products.length > 0 ?
        <Masonry
            onRefresh={refreshFunction ? refreshFunction : null}
            images={products}
            refreshing={refreshing}
            onEndReached={addMore ? addMore : () => {}} //addMore = function
            onEndReachedThreshold={5}
            initialNumInColsToRender={20}
            onPressImage={ (item) => {goToProductPage(item)}}
            renderIndividualFooter={
                (item) => 
                <LabelsContainer>
                    { item.entrega?.includes("Pronta-entrega") && <Label icon='check' />}
                    { item.entrega?.includes("Encomendas") && <Label icon='ampulheta'/> }
                    { item.green && <Label icon='vegano' /> }
                </LabelsContainer>
            }
            renderIndividualHeader = {
                (item) => 
                <LabelsHeader onPress={() => deleteItem(item.id)}>
                    {editing && <Label icon='x' />}
                </LabelsHeader>
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
        :
        <ActivityIndicator style={{marginTop: 5}} color='green' />
    )
}

export default PhotosGrid;