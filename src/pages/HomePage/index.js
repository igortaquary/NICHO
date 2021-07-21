import React, { useEffect } from 'react';
import { HeaderContainer, FilterContainer, Filters, FilterButton, SearchContainer, CategoryContainer, CategoryText } from './styles';
import PhotosGrid from '../../components/PhotosGrid';
import { ActivityIndicator, View, TextInput } from 'react-native';
import { useFilterContext } from '../../contexts/filterContext';
import Icon from '../../components/Icon';

// const categories = [ "Adesivos", "Para vestir", "Para sua casa", "Papelaria", "Cosméticos", "Impressões", "Esculturas", "Desenhos", "Acessórios", "Pinturas" ];

const HomePage = ({navigation, route}) => {

    const { products, loading, filters, setFilters, search, setPage, categorias } = useFilterContext();

    return(
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <HeaderContainer>
                <FilterContainer>
                    <Filters showsHorizontalScrollIndicator={false} horizontal={true}>
                        { filters.category && 
                        <CategoryContainer onPress={ () => setFilters({})}>
                            <CategoryText selected={false}>
                                Todos
                            </CategoryText>
                        </CategoryContainer>}
                        {
                            categorias.map( (item, i) => 
                                <CategoryContainer key={i} onPress={ () => setFilters({category: item})}>
                                    <CategoryText selected={filters.category === item || !filters.category}>
                                        {item}
                                    </CategoryText>
                                </CategoryContainer>
                            )
                        }
                    </Filters>
                    <FilterButton onPress={() => navigation.navigate("Filters")}>
                        <Icon name='filtros' size={20} color={"#FFF"} />
                    </FilterButton>
                </FilterContainer>
                <SearchContainer>
                    <Icon name='busca' size={16} color={"#707070"}/>
                    <TextInput placeholder="Pesquise por itens" style={{marginLeft: 8, width: '100%'}} 
                    returnKeyType="search" onSubmitEditing={ e => search(e.nativeEvent.text)} />
                </SearchContainer>
            </HeaderContainer>
            { loading ?
            <ActivityIndicator color="#019B92" style={{marginTop: "50%"}}/>
            :
            <PhotosGrid products={products} refreshing={loading} navigation={navigation} /* addMore={ () => setPage(prev => prev++) }  *//>
            }
        </View>
        
    )
};

export default HomePage;