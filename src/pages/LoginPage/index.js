import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, ImageBackground, Platform, StatusBar } from 'react-native';
import {
    Container,
    ScrollContainer,
    Line,
    Logo,
    TitleText,
    MainContainer,
    MainContainerTitle,
    MainContainerSubTitle,
    InputContainer,
    Input,
    LoginButton,
    LoginButtonText,
    RegisterLink,
    RegisterLinkText,
    ChangePasswordLink,
    ChangePasswordLinkText,
    ExploreButton,
    ExploreButtonText
} from './styles';
import LoginBg from '../../assets/login-bg.jpg';
import LogoImg from '../../assets/nicho-logo.png';
import {signIn} from '../../api/auth';

const LoginPage = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        }

        if (!password) {
            Alert.alert('Password field is required.');
        }

        signIn(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled style={{ flex: 1 }}>
            <StatusBar translucent />
            <ImageBackground source={LoginBg} style={{ flex: 1 }} >
                <ScrollContainer>
                    <Container>

                        <Line />
                        <Logo source={LogoImg} />
                        <TitleText>
                            Até onde sua criatividade pode te levar?
                            </TitleText>
                        <MainContainer>
                            <MainContainerTitle>ENTRAR</MainContainerTitle>
                            <MainContainerSubTitle>Estamos muito felizes em te ver novamente!</MainContainerSubTitle>
                            <InputContainer>
                                <Input
                                    placeholder='E-mail'
                                    value={email}
                                    onChangeText={(email) => setEmail(email)}
                                />
                            </InputContainer>
                            <InputContainer>
                                <Input 
                                    placeholder='Senha'
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                    secureTextEntry={true}
                                />
                            </InputContainer>
                            <LoginButton onPress={handlePress}>
                                <LoginButtonText>
                                    Fazer login
                                    </LoginButtonText>
                            </LoginButton>
                            <RegisterLink onPress={() => navigation.navigate('SignUp')}>
                                <RegisterLinkText>Ainda não possui cadastro?</RegisterLinkText>
                            </RegisterLink>
                            <ChangePasswordLink>
                                <ChangePasswordLinkText>Esqueceu sua senha?</ChangePasswordLinkText>
                            </ChangePasswordLink>
                        </MainContainer>
                        <Text
                            style={{ marginTop: 24, marginBottom: 24, fontSize: 16, color: 'white', fontFamily: 'Raleway_400Regular' }}>
                            OU
                            </Text>
                        <ExploreButton onPress={() => navigation.navigate('Main')}>
                            <ExploreButtonText>
                                Explore o app sem se conectar
                            </ExploreButtonText>
                        </ExploreButton>
                    </Container>
                </ScrollContainer>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

export default LoginPage;