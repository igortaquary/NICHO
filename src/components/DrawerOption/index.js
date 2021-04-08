import React from 'react'
import Icon from '../Icon'
import { Container, OptionText } from './styles'

const DrawerOption = ({text, icon, isSelected, onPress}) => {
    return (
        <Container onPress={onPress} isSelected={isSelected}>
            <Icon name={icon} size={15} color='#707070' />
            <OptionText>{text}</OptionText>
        </Container>
    )
}

export default DrawerOption;