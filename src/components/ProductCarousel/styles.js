import styled from 'styled-components/native';

export const Container = styled.View`

`;

export const Carousel = styled.View`
  position: relative;
`;

export const LeftFixedIcons = styled.View`
  position: absolute;
  margin-left: 20px;
  bottom: 0;
`;

export const RightFixedIcons = styled.View`
  position: absolute;
  right: 20px;
  bottom: 0;
`;

export const IconContainer = styled.TouchableOpacity`
  /* padding: 5px; */
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  margin-bottom: 10px;
  background-color: white;
  width: 28px;
  height: 28px;
`;

export const IconContainer2 = styled.TouchableOpacity`
  padding: 5px;
  justify-content: center;
  border-radius: 50px;
  margin-bottom: 10px;
  background-color: white;
  width: 28px;
  height: 28px;
`;

export const Indicator = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: white;
`;

export const CurrentIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  border: 1px solid #707070;
  margin: 24px 12px 0px 12px;
`;