import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: white;
    /* border: 5px solid black; */
`;

export const Banner = styled.TouchableOpacity`
    background-color: rgba(0, 0, 0, .5);
    height: 115px;
    position: relative;
    width: 100%;
`;

export const BannerImage = styled.Image`
    height: 100%;
`;

export const ActionText = styled.View`
    position: absolute;
    flex-direction: row;
    right: 3%;
    top: 10%;
`;

export const ActionDescription = styled.Text`
    font-family: 'Raleway_600SemiBold';
    color: white;
    margin-left: 5px;
    font-size: 12px;
`;

export const UserAvatar = styled.Image`
    background-color: #C4C4C4;
    width: 140px;
    aspect-ratio: 1;
    margin-top: -20%;   
`;

export const Clickable = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 3%;
`;

export const ClickableText = styled.Text`
    color: #019B92;
    font-size: 12px;
    font-family: 'Raleway_600SemiBold';
    margin-left: 5px;
    margin-bottom: 12%;
`;

export const Input = styled.View`
  width: 100%;
  margin-bottom: 22px;
`;

export const InputLabel = styled.Text`
  font-family: 'Raleway_700Bold';
  font-size: 13px;
  color: #707070;
  margin-bottom: 6px;
`;

export const InputContainer = styled.View`
  background-color: rgba(196,196,196,0.2);
  border-radius: 8px;
  padding: 0 9px;
  /* height: 28px;s */
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  margin-left: 2px;
`;
export const Button = styled.TouchableOpacity`
  height: 46px;
  background-color: #019B92;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 8px;

`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: 'Raleway_700Bold';
`;