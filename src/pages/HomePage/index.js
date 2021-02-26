import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

const HomePage = () => {
    return(
        <View>
            <Text>
                Home Page
            </Text>
        {/* <TopTab.Navigator>
            <TopTab.Screen name="Ragião" component={<View></View>}/>
            <TopTab.Screen name="Categoria" component={<View></View>}/>
        </TopTab.Navigator> */}
        </View>
    )
};

export default HomePage;