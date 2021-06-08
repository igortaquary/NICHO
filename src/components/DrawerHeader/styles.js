import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const MainContainer = styled.View`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${StatusBar.currentHeight ? StatusBar.currentHeight : 15}px;
  padding-bottom: 5px;
  elevation: 10;
`;

export const Container = styled.View`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 5px;
`;

export const CustomText = styled.Text`
  display: flex;
  align-items: center;
  font-family: "Rousseau_Deco";
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  height: 100%;
  margin-left: 5px;
  color: #707070;
`;

export const IconContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
  padding-left: 10px;
`;
