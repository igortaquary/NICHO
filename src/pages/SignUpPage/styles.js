import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

export const Container =  styled.View`
  flex: 1;
  background-color: white;
  padding: 0 34px;
  align-items: center;
`;

export const WelcomeText = styled.Text`
  color: #707070;
  font-family: 'Raleway_400Regular';
  font-size: 13px;
  margin-top: 42px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 15px;
`;

export const Input = styled.View`
  width: 100%;
  margin-bottom: 22px;
`;

export const InputLabel = styled.Text`
  font-family: 'Raleway_400Regular';
  font-size: 13px;
  color: #707070;
  margin-bottom: 6px;
`;

export const InputContainer = styled.View`
  background-color: rgba(196,196,196,0.2);
  border-radius: 8px;
  padding: 0 9px;
  height: 28px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
`;

export const Line = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: #F1F1F1;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const PickerContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`

export const Option = styled.View`
  flex: 1;
`;

export const Pickerr = styled(Picker)`
  background-color: rgba(196, 196, 196, 0.2);
  border-radius: 10px;
  color: rgba(184, 184, 184, 1);
  height: 28px;
`;

export const OptionLabel = styled.Text`
  font-family: 'Raleway_400Regular';
  font-size: 13px;
  color: #707070;
  margin-bottom: 6px;
`;

export const Newsletter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  margin-bottom: 40px;
`;

export const NewsletterText = styled.Text`
  font-family: 'Raleway_400Regular';
  font-size: 13px;
  color: #707070;
`;

export const Button = styled.TouchableOpacity`
  height: 46px;
  background-color: #019B92;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 48px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: 'Raleway_700Bold';
`;

export const Check = styled.TouchableOpacity`
  margin-right: 5px;
  align-items: center;
  justify-content: center;
`;

export const ImageTextContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 10px;
`;

export const ImageText = styled.Text`
  margin-left: 5px;
  color: #019B92;
  font-size: 12px;
  font-family: 'Raleway_700Bold';
`;

export const ImageContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  background-color: #F1F1F1;
  border-radius: 100px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;