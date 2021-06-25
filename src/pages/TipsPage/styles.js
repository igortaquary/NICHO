import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const Title = styled.Text`
    margin-top: 10%;
    font-size: 22px;
    color: #707070;
    text-align: center;
    font-family: 'Raleway_700Bold';
`;

export const SectionContainer = styled.View`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 25px;
    border: 1px solid #686868;
`;

export const SectionContainerTitle = styled.Text`
    font-size: 18px;
    font-family: 'Raleway_700Bold';
    color: white;
    background-color: #686868;
    align-items: center;
    width: 100%;
    padding: 1% 5%;
`;

export const SectionOption = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5% 5%;

`;

export const SectionOptionText = styled.Text`
    font-size: 20px;
    font-family: 'Raleway_700Bold';
    color: #019B92;
    width: 90%;
`;