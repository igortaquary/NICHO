import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPages from './main';
import AuthPages from './auth';
import NewProduct from './newProduct';
import { StatusBar, Platform } from 'react-native';
import NotFoundPage from '../pages/NotFoundPage';
import ProductPage from '../pages/ProductPage';

const Stack = createStackNavigator();

const Routes = () => {

    return(
        <NavigationContainer>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' hidden={Platform.OS === 'ios'}/>
            <Stack.Navigator headerMode='screen' >
                <Stack.Screen options={{headerShown: false, }} name='Auth' component={AuthPages} />
                <Stack.Screen options={{headerShown: false}} name='Main' component={MainPages} /> 
                <Stack.Screen options={{headerShown: false}} name='NewProduct' component={NewProduct} /> 
                <Stack.Screen options={{headerShown: true}} name='NotFound' component={NotFoundPage} />
                <Stack.Screen options={{headerShown: true}} name='ProductPage' component={ProductPage} />
            </Stack.Navigator>
        </NavigationContainer>
    ) 

}

export default Routes;