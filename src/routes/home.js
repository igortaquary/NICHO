import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native';
import CategoryPage from '../pages/CategoryPage';
import RegionPage from '../pages/RegionPage';

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
    return(
         <TopTab.Navigator>
            <TopTab.Screen name="Região" component={RegionPage}/>
            <TopTab.Screen name="Categoria" component={CategoryPage}/>
        </TopTab.Navigator> 
    )
};

export default Home;