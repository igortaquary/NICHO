import React from 'react'
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import { Container, Input, SearchInput } from './styles';

const SearchBar = ({onPressFilter}) => {
    return (
        <Container>
            <SearchInput>
                <Icon name='busca' size={16} color="#707070" />
                <Input 
                placeholder='Pesquise seus itens salvos'
                />
            </SearchInput>
            <TouchableOpacity onPress={onPressFilter}>
                <Icon name='filtros' size={16} />
            </TouchableOpacity>
        </Container>
    )
}

export default SearchBar;
