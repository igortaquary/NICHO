import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Locations from './locations';

const Tab = createBottomTabNavigator();

const MainPages = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Locais" component={Locations} />
            <Tab.Screen name="Salvos" component={Home} />
            <Tab.Screen name="Seguindo" component={Home} />
        </Tab.Navigator>
    )
};

export default MainPages;