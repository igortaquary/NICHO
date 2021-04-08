import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImagesPicker from '../pages/ImagesPicker';
import CreateProductPage from '../pages/CreateProductPage';

const Stack = createStackNavigator();

const NewProduct = () => {
    return(
        <Stack.Navigator initialRouteName="CreateProduct">
            <Stack.Screen name="CreateProduct" component={CreateProductPage} />
        </Stack.Navigator>
    )
};

export default NewProduct;