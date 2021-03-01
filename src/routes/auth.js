import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

const AuthPages = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='Login' 
                    component={LoginPage}
                    options={
                        {
                            headerShown: false,
                        }
                    }
                />
                <Stack.Screen 
                    name='SignUp'
                    component={SignUpPage}
                    options={({ navigation, route }) => ({
                        headerTitle: 'CRIAR CONTA',
                        headerLeft: () => (
                            <Feather onPress={() => navigation.goBack()} style={{marginLeft: 25}} name="chevron-left" size={24} color="#019B92" />
                        ),
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontFamily: 'Raleway_600SemiBold',
                            color: '#707070'
                        }                    
                    })}
                    
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AuthPages;