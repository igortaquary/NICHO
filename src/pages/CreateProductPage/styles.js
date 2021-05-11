import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding: 20px;
  background-color: white;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #707070;
  font-family: 'Raleway_400Regular';
  line-height: 15px;
  text-align: justify;
`;

export const Input = styled.View`
  width: 100%;
  margin-bottom: 22px;
`;

export const InputLabel = styled.Text`
  font-family: 'Raleway_400Regular';
  font-size: 15px;
  font-weight: bold;
  color: #707070;
  margin-bottom: 6px;
`;

export const InputContainer = styled.View`
  background-color: rgba(196,196,196,0.2);
  border-radius: 8px;
  padding: 9px 9px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
`;

export const PublishButton = styled.TouchableOpacity`
  height: 39px;
  align-items: center;
  justify-content: center;
  background-color: #019B92;
  border-radius: 50px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const PublishButtonText = styled.Text`
  font-family: 'Raleway_600SemiBold';
  font-size: 12px;
  color: white;
`;

export const CancelButton = styled.TouchableOpacity`
  height: 39px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 28px;
`;

export const CancelButtonText = styled.Text`
  font-family: 'Raleway_600SemiBold';
  font-size: 12px;
  color: #707070;
`;