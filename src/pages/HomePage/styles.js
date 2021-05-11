import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
    margin: 0;
    padding: 0;
    background-color: #FFF;
`;

export const FilterContainer = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: space-between;
`;

export const Filters = styled.ScrollView`
    display: flex;
    flex-direction: row;
    padding: 0px 7px;
`;

export const FilterButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #C2C2C2;
    padding: 11px 21px;
    height: 100%;
    box-shadow: -5px 0px 4px rgba(200, 200, 200, 0.5);
`;

export const SearchContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin: 11px;
    padding: 8px 15px;
    border-radius: 16px;
    background-color: #F1F1F1;
    align-items: center;
`;

export const CategoryContainer = styled.TouchableOpacity`
    background-color: #FFF;
    border-radius: 15px;
    padding: 5px;
    margin: 3px;
`;

export const CategoryText = styled.Text`
    color: ${ props => props.selected ? "#019B92" : "#707070"};
    font-weight: normal;
    font-size: 10px;
`;