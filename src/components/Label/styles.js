import styled from 'styled-components/native';

export const Container = styled.View`
  /* flex: 0; */
  height: 22px;
  border: 1px solid #F1F1F1;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

export const Icon = styled.View`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border: 1px solid #F1F1F1;
  height: 100%;
  width: 22px;
`;

export const Text = styled.Text`
  color: black;
  font-family: 'Raleway_400Regular';
  font-size: 10px;
  margin: 0 10px;
  color: #707070;
`;