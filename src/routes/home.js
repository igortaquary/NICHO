import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native';
import CategoryPage from '../pages/CategoryPage';

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
    return(
         <TopTab.Navigator>
            <TopTab.Screen name="Região" component={CategoryPage}/>
            <TopTab.Screen name="Categoria" component={CategoryPage}/>
        </TopTab.Navigator> 
    )
};

export default Home;