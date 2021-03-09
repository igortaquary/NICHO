import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Container,
  Icon,
  Text
} from './styles';

// Três opções de ícone 'leaf' 'hourglass' 'check'

const Label = ({icon, text}) => {
  return (
    <Container>
      {icon && (<Icon>
        <FontAwesome5 name={icon} size={12} color="#707070" />
      </Icon>)}
      {text && <Text>{text}</Text>}
    </Container>
  )
}

export default Label
