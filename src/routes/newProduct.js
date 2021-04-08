import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImagesPicker from '../pages/ImagesPicker';

const Stack = createStackNavigator();

const NewProduct = () => {
    return(
        <Stack.Navigator initialRouteName="ImagePicker">
            <Stack.Screen name="ImagePicker" component={ImagesPicker} />
        </Stack.Navigator>
    )
};

export default NewProduct;