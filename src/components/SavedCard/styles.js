import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 48.5%;
    margin-bottom: 10px;
`; 

export const Images = styled.View`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background-color: #F1F1F1;  
    border-radius: 12px;
    overflow: hidden;
`;

export const LeftImage = styled.Image`
    position: absolute;
    width: 50%;
    height: 100%;
`;

export const TopRightImage = styled.Image`
    position: absolute;
    right: 0;
    width: 50%;
    height: 50%;
`;

export const BottomRightImage = styled.Image`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 50%;
`;