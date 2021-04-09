import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    margin: 5px 3px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${props => props.selected ? '#019B92' : '#F1F1F1'};
`;

export const Title = styled.Text`
    margin: 6px 12px;
    margin-left: ${props => props.icon ? 0 : 12}px;
    font-family: 'Raleway_600SemiBold';
    font-size: 10px;
    color: ${props => props.selected ? '#019B92' : '#707070'};
`;

export const IconContainer = styled.View`
    margin: 0 6px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    width: 22px;
`;