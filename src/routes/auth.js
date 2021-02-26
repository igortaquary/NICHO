import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';

const Stack = createStackNavigator();

const AuthPages = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Tela de login' component={LoginPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AuthPages;