import styled from "styled-components/native";

export const Container = styled.View`
  padding: 35% 0 30px 0;
  align-items: center;
  height: 100%;
`;

export const Avatar = styled.Image`
  width: 105px;
  height: 105px;
  border-radius: 54px;
`;

export const Welcome = styled.Text`
  color: #019b92;
  font-family: "Raleway_700Bold";
  font-size: 15px;
  margin-top: 8%;
`;

export const WelcomeSubTitle = styled.Text`
  color: #707070;
  font-family: "Raleway_400Regular";
  font-size: 13px;
  margin-top: 1.5%;
  margin-bottom: 18%;
`;

export const Links = styled.View`
  margin-top: auto;
`;

export const Link = styled.TouchableOpacity`
  align-items: center;
  margin-bottom: 1.5%;
`;

export const LinkText = styled.Text`
  color: #707070;
  font-family: "Raleway_400Regular";
  font-size: 13px;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  background-color: #019b92;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-radius: 20px;
  margin-top: 11%;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: "Raleway_600SemiBold";
`;
