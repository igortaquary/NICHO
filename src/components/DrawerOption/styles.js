import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 36px;
    margin-bottom: 10px;

    background-color: ${props => props.isSelected ? '#F1F1F1' : 'transparent' };
`;

export const OptionText = styled.Text`
    margin-left: 10px;
    font-size: 15px;
    font-family: 'Raleway_400Regular';
    color: #707070;
`;