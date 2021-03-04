import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';

const Stack = createStackNavigator();

const AuthPages = () => {
    return(

            <Stack.Navigator>
                <Stack.Screen 
                    name='Tela de login' 
                    component={LoginPage}
                    options={
                        {
                            headerShown: false,
                        }
                    }
                />
            </Stack.Navigator>

    )
};

export default AuthPages;