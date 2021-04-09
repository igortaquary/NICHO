import React from 'react'
import Icon from '../Icon';
import { Container, Input, SearchInput } from './styles';

const SearchBar = () => {
    return (
        <Container>
            <SearchInput>
                <Icon name='busca' size={16} color="#707070" />
                <Input 
                placeholder='Pesquise seus itens salvos' 
                />
            </SearchInput>
            <Icon name='filtros' size={16} />
        </Container>
    )
}

export default SearchBar;
