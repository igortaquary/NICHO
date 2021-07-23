import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    align-content: center;
    align-items: center;
`;

export const LabelsContainer = styled.View`
    position: absolute;
    bottom: 12px;
    left: 12px;
    width: 12px;
    display: flex;
    flex-direction: column;
`;

export const LabelsHeader = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    top: 12px;
    right: 12px;
    display: flex;
`;