import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 110px 0 30px 0;
    align-items: center;
    height: 100%;
`;

export const Avatar = styled.Image`
    width: 105px;
    height: 105px;
    border-radius: 54px;
`;

export const Welcome = styled.Text`
    color: #019B92;
    font-family: 'Raleway_700Bold';
    font-size: 15px;
    margin-top: 20px;

`;

export const WelcomeSubTitle = styled.Text`
    color: #707070;
    font-family: 'Raleway_400Regular';
    font-size: 13px;
    margin-top: 4px;
    margin-bottom: 50px;
`;

export const Links = styled.View`
    margin-top: auto;
`;

export const Link = styled.TouchableOpacity`
    align-items: center;
    margin-bottom: 5px;
`;

export const LinkText = styled.Text`
    color: #707070;
    font-family: 'Raleway_400Regular';
    font-size: 13px;
`;

export const Button = styled.TouchableOpacity`
    height: 40px;
    background-color: #019B92;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 20px;
    margin-top: 30px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 14px;
    font-family: 'Raleway_600SemiBold';
`;