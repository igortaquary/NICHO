import React, {useState} from 'react'
import { Text, View } from 'react-native';
import DrawerOption from '../DrawerOption';
import RoundedButton from '../RoundedButton/RoundedButton';
import { 
    Container,
    Avatar,
    Welcome,
    WelcomeSubTitle,
    Links,
    Link,
    LinkText,
    Button,
    ButtonText
} from './styles';

const CustomDrawer = ({navigation}) => {

    const [selected, setSelected] = useState();

    return (
        <Container>
            <Avatar source={{uri: "https://source.unsplash.com/featured/412x115/?craft"}} />
            <Welcome>Olá, Maria Cecília :)</Welcome>
            <WelcomeSubTitle>Seja bem vinda!</WelcomeSubTitle>
            <DrawerOption 
                text='Configurações' 
                icon='config' 
                isSelected={selected==='config'}
                onPress={() => setSelected('config')}
            />
            <DrawerOption 
                text='Fale conosco' 
                icon='mail' 
                isSelected={selected==='contact'} 
                onPress={() => setSelected('contact')}
            />
            <DrawerOption 
                text='Mensagens' 
                icon='chat' 
                isSelected={selected==='chat'} 
                onPress={() => setSelected('chat')}
            />
            <Button>
                <ButtonText>Torne-se um expositor!</ButtonText>
            </Button>

            <Links>
                <Link>
                    <LinkText>Créditos</LinkText>                
                </Link>
                <Link>
                    <LinkText>Termos e Política de Privacidade</LinkText>
                </Link>
            </Links>
        </Container>
    )
}

export default CustomDrawer;
