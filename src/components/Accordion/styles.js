import styled from 'styled-components/native';
// import {Transitioning} from 'react-native-reanimated';
export const Container = styled.View`
  background-color: white;
  border-radius: 15px;
  /* border: 1px solid blue; */
  overflow: hidden;
  margin-bottom: 3px;
`;

export const ToogleButton = styled.TouchableOpacity`
  height: 45px;
  padding: 0 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleButtonText = styled.Text`
  color: #707070;
  font-size: 15px;
`;

export const Content = styled.View`
  padding: 0 40px 20px 40px;
  /* height: 100px; */

`;