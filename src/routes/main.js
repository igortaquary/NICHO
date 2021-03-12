import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home';
import Locations from './locations';
import NotFoundPage from '../pages/NotFoundPage';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomePages = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Locais" component={Locations} />
            <Tab.Screen name="Salvos" component={NotFoundPage} />
            <Tab.Screen name="Seguindo" component={NotFoundPage} />
            <Tab.Screen name="Mensagens" component={NotFoundPage} />
        </Tab.Navigator> 
    )
}

const MainPages = () => {
    return(
        <Drawer.Navigator screenOptions={{ headerShown: true }} >
            <Drawer.Screen name="Home" component={HomePages}/>
            <Drawer.Screen name="Alone Page" component={NotFoundPage}/>
        </Drawer.Navigator>
    )
};

export default MainPages;