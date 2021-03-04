import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainPages from './main';
import AuthPages from './auth';

const userLogged = true;

const Routes = () => {

    return(
        <NavigationContainer>
            { userLogged ? <MainPages /> : <AuthPages /> }
        </NavigationContainer>
    ) 

}

export default Routes;