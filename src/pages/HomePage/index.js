import React, { useState, useEffect} from 'react';
import * as firebase from "firebase";
import PhotosGrid from '../../components/PhotosGrid';
import SearchBar from '../../components/SearchBar';
import { TouchableOpacity, Text, View } from 'react-native';
import { useFilterContext } from '../../contexts/filterContext';

const HomePage = ({navigation, route}) => {

    const { products, loading } = useFilterContext();

    return(
        <View style={{flex: 1}}>
            <View style={{marginTop: 10, marginTop: 10, marginLeft: 20, marginRight: 20,  }}>
                <SearchBar onPressFilter={() => navigation.navigate("Filters")}/>
            </View>
            <PhotosGrid products={products} refreshing={loading} navigation={navigation} />
        </View>
    )
};

export default HomePage;