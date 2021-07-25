import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #FFFFFF;
    align-items: center;
    padding: 0 4%;
`;

export const Description = styled.Text`
    color: #787878;
    font-size: 12px;
    font-family: 'Raleway_500Medium';
    margin-bottom: 1%;
`;

export const Count = styled.Text`
    color: #019B92;
    font-size: 12px;
    font-family: 'Raleway_400Regular';
    margin-bottom: 8%;
`;

export const Button = styled.TouchableOpacity`
    border: 1px solid #f1f1f1f1;
    padding: 5px;
    width: 40%;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 3%;
`;

export const ButtonText = styled.Text`
    font-size: 12px;
    font-family: 'Raleway_800ExtraBold';
    color: #707070;
`;