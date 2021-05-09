import styled from 'styled-components/native';

export const SectionTitle = styled.Text`
    font-size: 13px;
    font-family: 'Raleway_300Light';
    margin-top: 1%;
`;

export const CollectionCard = styled.TouchableOpacity`
    flex-direction: row;
    margin: 2% 0;
    align-items: center;
`;

export const CollectionImage = styled.Image`
    width: 18%;
    aspect-ratio: 1;
    border-radius: 10px;
    margin-right: 2%;
`;

export const CollectionTitle = styled.Text`
    font-size: 17px;
    font-family: 'Raleway_600SemiBold';
`;

export const NewCollectionCard = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin: 4% 0;
`;