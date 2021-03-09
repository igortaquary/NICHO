import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPages from './main';
import AuthPages from './auth';
import { StatusBar } from 'react-native';
import NotFoundPage from '../pages/NotFoundPage';

const userLogged = false;
const Stack = createStackNavigator();

const Routes = () => {

    return(
        <NavigationContainer>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Stack.Navigator headerMode='screen' >
                <Stack.Screen options={{headerShown: false, }} name='Auth' component={AuthPages} />
                <Stack.Screen options={{headerShown: false}} name='Main' component={MainPages} /> 

                <Stack.Screen options={{headerShown: true}} name='NotFound' component={NotFoundPage} />
                
            </Stack.Navigator>
            {
            //userLogged ? <MainPages/> : <AuthPages/>
            }
        </NavigationContainer>
    ) 

}

export default Routes;