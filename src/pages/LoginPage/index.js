import React from 'react';
import { Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
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

const LoginPage = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled style={{ flex: 1 }}>
            <ImageBackground source={LoginBg} style={{flex: 1}} >
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
                                <Input placeholder='Email' />
                            </InputContainer>
                            <InputContainer>
                                <Input placeholder='Senha' />
                            </InputContainer>
                            <LoginButton>
                                <LoginButtonText>
                                    Fazer login
                                    </LoginButtonText>
                            </LoginButton>
                            <RegisterLink>
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
                        <ExploreButton>
                            <ExploreButtonText>Explore o app sem se conectar</ExploreButtonText>
                        </ExploreButton>
                    </Container>
                </ScrollContainer>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

export default LoginPage;