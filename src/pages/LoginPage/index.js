import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
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
  ExploreButtonText,
} from "./styles";
import LoginBg from "../../assets/login-bg.jpg";
import LogoImg from "../../assets/nicho-logo.png";
import { signIn } from "../../api/auth";
import { Alert } from "react-native";
import { useUserContext } from "../../contexts/userContext";
import { AntDesign } from "@expo/vector-icons";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scrollIndicator, setScrollIndicator] = useState(false);

  const { SignIn } = useUserContext();

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      SignIn(email, password, navigation);
    }

    setEmail("");
    setPassword("");
  };

  const handleLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    const ScreenHeight = Dimensions.get("window").height;
    if (height - ScreenHeight > 50) {
      setScrollIndicator(true);
    }
  };

  const handleScroll = (nativeEvent) => {
    const isClose = isCloseToBottom(nativeEvent);
    if (isClose) {
      setScrollIndicator(false);
    } else {
      setScrollIndicator(true);
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <StatusBar translucent />
      <ImageBackground source={LoginBg} style={{ flex: 1 }}>
        <ScrollContainer
          onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
          scrollEventThrottle={400}
        >
          <Container onLayout={handleLayout}>
            <Line />
            <Logo source={LogoImg} />
            <TitleText>Até onde sua criatividade pode te levar?</TitleText>
            <MainContainer>
              <MainContainerTitle>ENTRAR</MainContainerTitle>
              <MainContainerSubTitle>
                Estamos muito felizes em te ver novamente!
              </MainContainerSubTitle>
              <InputContainer>
                <Input
                  placeholder="E-mail"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  placeholder="Senha"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                />
              </InputContainer>
              <LoginButton onPress={handlePress}>
                <LoginButtonText>Fazer login</LoginButtonText>
              </LoginButton>
              <RegisterLink onPress={() => navigation.navigate("SignUp")}>
                <RegisterLinkText>Ainda não possui cadastro?</RegisterLinkText>
              </RegisterLink>
              <ChangePasswordLink>
                <ChangePasswordLinkText>
                  Esqueceu sua senha?
                </ChangePasswordLinkText>
              </ChangePasswordLink>
            </MainContainer>
            {scrollIndicator && (
              <AntDesign
                style={{ position: "absolute", bottom: 100 }}
                name="downcircleo"
                size={24}
                color="white"
              />
            )}
            <Text
              style={{
                opacity: scrollIndicator ? 0 : 1,
                marginTop: 24,
                marginBottom: 24,
                fontSize: 16,
                color: "white",
                fontFamily: "Raleway_400Regular",
              }}
            >
              OU
            </Text>
            <ExploreButton onPress={() => navigation.navigate("Main")}>
              <ExploreButtonText>
                Explore o app sem se conectar
              </ExploreButtonText>
            </ExploreButton>
          </Container>
        </ScrollContainer>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
