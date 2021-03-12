import styled from 'styled-components/native';
import {View, SafeAreaView, Image, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import LoginBg from '../../assets/login-bg.jpg';


export const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

export const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

export const Line = styled(View)`
  width: 8px;
  height: 137px;
  background-color: white;
  margin-bottom: 42px;
`;

export const Logo = styled(Image)`
  margin-bottom: 12px;
`;

export const TitleText = styled(Text)`
  font-family: 'Raleway_600SemiBold';
  color: rgba(255,255,255,1);
  margin-bottom: 38px;
`;

export const MainContainer = styled(View)`
  width: 283px;
  height: 292.61px;
  background-color: white;
  border-radius: 10px;
  padding: 21px;
  align-items: center;
`;  

export const MainContainerTitle = styled(Text)`
  font-size: 14px;
  font-family: 'Raleway_500Medium';
  color: #707070;
  margin-bottom: 5px;
`;

export const MainContainerSubTitle = styled(Text)`
  font-size: 11px;
  color: #C2C2C2;
  margin-bottom: 25px;
`;

export const InputContainer = styled(View)`
  height: 21px;
  width: 100%;
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

export const Input = styled(TextInput)`

`;

export const LoginButton = styled(TouchableOpacity)`
  width: 126.02px;
  align-items: center;
  justify-content: center;
  height: 38.45px;
  background-color: #019B92;
  border-radius: 20px;
`;

export const LoginButtonText = styled(Text)`
  color: white;
  font-size: 12px;
  font-family: 'Raleway_400Regular';
`;

export const RegisterLink = styled(TouchableOpacity)`
  margin-top: 25px;
  margin-bottom: 5px;
`;

export const RegisterLinkText = styled(Text)`
  font-size: 11px;
  color: #707070;
`;

export const ChangePasswordLink = styled(TouchableOpacity)`

`;

export const ChangePasswordLinkText = styled(Text)`
  font-size: 11px;
  color: #707070;
`;

export const ExploreButton = styled(TouchableOpacity)`
  width: 283px;
  align-items: center;
  justify-content: center;
  height: 39px;
  background-color: white;
  border-radius: 20px;
  /* margin-bottom: 100%; */
`; 

export const ExploreButtonText = styled(Text)`
  font-size: 12px;
  color: #019B92;
  font-family: 'Raleway_400Regular';
`;
