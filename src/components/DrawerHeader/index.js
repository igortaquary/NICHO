import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import {MainContainer, Container, CustomText, IconContainer} from './styles';
import Icon from '../Icon';
import { Ionicons } from '@expo/vector-icons';

const DrawerHeader = ({scene}) => {
    return(
        <MainContainer>
            <Container>
                <IconContainer onPress={ () => scene.descriptor.navigation.toggleDrawer()}>
                    <Ionicons name="menu" size={25} color={'#707070'}/>
                </IconContainer>
                <CustomText onPress={ () => scene.descriptor.navigation.navigate('Home')}>
                    nicho
                </CustomText>
            </Container>
            <Container>
                <IconContainer onPress={ () => scene.descriptor.navigation.navigate('Messages')}>
                    <Icon name="busca" size={18} color={'#AEAEAE'}/>
                </IconContainer>
                <IconContainer onPress={ () => scene.descriptor.navigation.navigate('Mensagens')}>
                    <Icon name="chat" size={18} color={'#AEAEAE'}/>
                </IconContainer>
                <IconContainer onPress={ () => scene.descriptor.navigation.navigate('NewProduct')}>
                    <Icon name="plus" size={18} color={'#AEAEAE'}/>
                </IconContainer>
            </Container>
        </MainContainer>
    )
};

export default DrawerHeader;