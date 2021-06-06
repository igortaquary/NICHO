import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  margin: 0;
  padding: 0;
  background-color: #fff;
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
  background-color: #c2c2c2;
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
  background-color: #f1f1f1;
  align-items: center;
`;

export const CategoryContainer = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 15px;
  padding: 5px;
  margin: 3px;
`;

export const CategoryText = styled.Text`
  color: ${(props) => (props.selected ? "#019B92" : "#707070")};
  font-weight: normal;
  font-size: 10px;
`;
