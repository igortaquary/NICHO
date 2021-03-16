import React from 'react'
import {
  Container,
  IconContainer,
  Text
} from './styles';
import Icon from '../../components/Icon';

// Três opções de ícone 'leaf' 'hourglass' 'check'

const Label = ({icon, text}) => {
  return (
    <Container>
      {icon && (<IconContainer>
        <Icon name={icon} size={12} color="#707070" />
      </IconContainer>)}
      {text && <Text>{text}</Text>}
    </Container>
  )
}

export default Label
