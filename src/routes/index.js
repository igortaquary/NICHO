
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPages from './main';
import AuthPages from './auth';
import { StatusBar, Platform } from 'react-native';
import CreateProductPage from '../pages/CreateProductPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductPage from '../pages/ProductPage';
import { Feather } from '@expo/vector-icons';
import Filters from '../pages/HomePage/Filter/filters';


const Stack = createStackNavigator();

const headerStyle = {
    headerShown: true, 
    headerTintColor: "#505050",
    headerTitleAlign: "center",
    headerBackImage: () => <Feather name="chevron-left" size={30} color="#019B92"/> 
}

const Routes = () => {
    return(
        <NavigationContainer>
            <StatusBar barStyle='dark-content' backgroundColor='transparent'/>
            <Stack.Navigator headerMode='screen' >
                <Stack.Screen options={{headerShown: false, }} name='Auth' component={AuthPages} />
                <Stack.Screen options={{headerShown: false}} name='Main' component={MainPages} /> 
                <Stack.Screen options={{title: 'Produto', ...headerStyle}} name='ProductPage' component={ProductPage} />
                <Stack.Screen options={{title: 'Nova publicação', ...headerStyle}} name="NewProduct" component={CreateProductPage} /> 
                <Stack.Screen options={{title: 'Filtros', ...headerStyle}} name='Filters' component={Filters} /> 
                <Stack.Screen options={headerStyle} name='NotFound' component={NotFoundPage} />
            </Stack.Navigator>
        </NavigationContainer>
    ) 
}


export default Routes;
