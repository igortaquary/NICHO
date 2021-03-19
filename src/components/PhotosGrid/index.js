import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import PhotoCard from '../PhotoCard';
import { Container, LabelsContainer } from './styles';
import Masonry from 'react-native-masonry-list';
import Label from '../Label';

const categories = ['nature', 'handmade', 'craft', 'artesanato', 'brasil'];

const PhotosGrid = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        newImages();
    }, [])

    const addMoreImages = (len=10, clear) => {
        if(loading === false){
            setLoading(true);
            let aux = clear ? [] : images;
            aux = aux.concat( [...Array(len).keys()].map( (v, i) => {
                return {
                    uri: 'https://source.unsplash.com/featured/?' + categories[i%5],
                    id: i,
                    available: i%2 === 0,
                    sheduling: i%3 === 0,
                    green: i%2 === 1 || i%3 === 1,
                    // dimensions: { width: 1920, height: 1080 },
                } 
            }))
            setImages(aux);
            setLoading(false)
        }
    }

    const newImages = async () => {
        if(refreshing === false){
            setRefreshing(true);
            addMoreImages(20, true);
            setRefreshing(false);
        }
    }

    return(
        
            <Masonry
                images={images}
                onRefresh={newImages}
                refreshing={refreshing}
                rerender={refreshing}
                onEndReached={() => {
                    addMoreImages(10);
                }}
                initialNumInColsToRender={20}
                onPressImage={ (data) => { 
                    navigation.navigate('ProductPage', data)}}
                renderIndividualFooter={
                    (data) => 
                    <LabelsContainer>
                        { data.available && <Label icon='check' />}
                        { data.sheduling && <Label icon='hourglass'/> }
                        { data.green && <Label icon='leaf' /> }
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