import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    height: 300px;
    width: 100%;
    margin-bottom: 5%;
`;

export const ArtistInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ArtistAvatar = styled.Image`
    height: 40px;
    aspect-ratio: 1;
    border-radius: 50px;
    margin-right: 3%;
`;
 
export const NameAndCategories = styled.View`

`;

export const ArtistName = styled.Text`
    font-size: 15px;
    font-family: 'Raleway_600SemiBold';
`;

export const DisplayImage = styled.Image`
    margin-top: 2%;
    flex: 1;
    width: 100%;
    border-radius: 10px;
`;

export const Categories = styled.View`
    flex-direction: row;
`;

export const Category = styled.Text`
    font-size: 10px;
    margin-right: 5px;
    color: #707070;
    font-family: 'Raleway_400Regular';
`;