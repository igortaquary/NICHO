import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainPages from './main';
import AuthPages from './auth';
import { StatusBar } from 'react-native';

const userLogged = false;

const Routes = () => {

    return(
        <NavigationContainer>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            { userLogged ? <MainPages /> : <AuthPages /> }
        </NavigationContainer>
    ) 

}

export default Routes;