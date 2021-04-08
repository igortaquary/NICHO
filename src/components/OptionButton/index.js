import React from 'react';
import { Container, Title } from './styles';

const OptionButton = (props) => {
    return(
        <Container selected={props.selected}>
            <Title selected={props.selected}>
                {props.title}
            </Title>
        </Container>
    )
};

export default OptionButton;