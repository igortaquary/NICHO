import React, { useState, useEffect } from "react";
import {
  HeaderContainer,
  FilterContainer,
  Filters,
  FilterButton,
  SearchContainer,
  CategoryContainer,
  CategoryText,
} from "./styles";
import PhotosGrid from "../../components/PhotosGrid";
import {
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFilterContext } from "../../contexts/filterContext";
import { useUserContext } from "../../contexts/userContext";
import Icon from "../../components/Icon";

// const categories = [ "Adesivos", "Para vestir", "Para sua casa", "Papelaria", "Cosméticos", "Impressões", "Esculturas", "Desenhos", "Acessórios", "Pinturas" ];

const HomePage = ({ navigation, route }) => {
  const { products, loading, filters, setFilters, search, setPage } =
    useFilterContext();

  const {
    products,
    loading,
    filters,
    setFilters,
    search,
    clearAllFilters,
    subCategoriesFilter,
    categorias,
  } = useFilterContext();
  const [searchTerm, setSearchTerm] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <HeaderContainer>
        <FilterContainer>
          <Filters showsHorizontalScrollIndicator={false} horizontal={true}>
            {filters.category && (
              <CategoryContainer onPress={clearAllFilters}>
                <CategoryText selected={false}>Todos</CategoryText>
              </CategoryContainer>
            )}
            {categorias.map((item, i) => (
              <CategoryContainer
                key={i}
                onPress={() => setFilters({ category: item })}
              >
                <CategoryText
                  selected={filters.category === item || !filters.category}
                >
                  {item}
                </CategoryText>
              </CategoryContainer>
            ))}
          </Filters>
          <FilterButton onPress={() => navigation.navigate("Filters")}>
            <Icon name="filtros" size={20} color={"#FFF"} />
          </FilterButton>
        </FilterContainer>
        <SearchContainer>
          <Icon name="busca" size={16} color={"#707070"} />
          <TextInput
            placeholder="Pesquise por itens"
            style={{ marginLeft: 8, marginRight: 8, flexGrow: 90 }}
            returnKeyType="search"
            onSubmitEditing={(e) => search(e.nativeEvent.text)}
            onChange={(e) => setSearchTerm(e.nativeEvent.text)}
            value={searchTerm}
          />
          {searchTerm !== null && searchTerm?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchTerm();
                clearAllFilters();
              }}
            >
              <Icon name="x" size={12} color={"#707070"} />
            </TouchableOpacity>
          )}
        </SearchContainer>
      </HeaderContainer>
      {loading ? (
        <ActivityIndicator color="#019B92" style={{ marginTop: "50%" }} />
      ) : (
        <PhotosGrid
          refreshFunction={clearAllFilters}
          products={products}
          refreshing={loading}
          navigation={
            navigation
          } /* addMore={ () => setPage(prev => prev++) }  */
        />
      )}
    </View>
  );
};

export default HomePage;
