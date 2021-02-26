import React from 'react';
import MainPages from './main';
import AuthPages from './auth';

const userLogged = false;

const Routes = () => {

    return userLogged ? <MainPages /> : <AuthPages /> 

}

export default Routes;