import React from 'react';
import { Container, Title, IconContainer } from './styles';
import Icon from '../Icon';

const OptionButton = ({selected, title, onPress, icon}) => {
    return(
        <Container selected={selected} onPress={onPress}>
            {icon ? 
            <>
            <IconContainer>
                <Icon name={icon} size={12} color={selected ? "#019B92" : "#707070"} />
             </IconContainer>
            <Title selected={selected} icon={icon}>
                {title}
            </Title>
            </>
            :
            <Title selected={selected}>
                {title}
            </Title>
            }
        </Container>
    )
};

export default OptionButton;