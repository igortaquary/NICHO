import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const Carousel = styled.View`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 300px;
  height: 300px;
  background-color: #EEE;
  margin: auto;
`;

export const EditButton = styled.View`
  position: absolute;
  margin-left: 20px;
  top: 5px;
  right: 5px;
`;

export const IconContainer = styled.TouchableOpacity`
  /* padding: 5px; */
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  margin-bottom: 10px;
  background-color: rgba(0,0,0,0.7);
  width: 28px;
  height: 28px;
`;

export const Indicator = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const CurrentIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  border: 1px solid #707070;
  margin: 16px 12px;
`;