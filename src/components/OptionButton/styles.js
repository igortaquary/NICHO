import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    margin: 5px 3px;
    padding: 6px 12px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${props => props.selected ? '#019B92' : '#F1F1F1'};
`;

export const Title = styled.Text`
    font-family: 'Raleway_600SemiBold';
    font-size: 10px;
    color: ${props => props.selected ? '#019B92' : '#707070'};
`;