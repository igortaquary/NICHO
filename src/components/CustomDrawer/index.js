import React, {useContext, useState} from 'react'
import { Text, View } from 'react-native';
import { useUserContext } from '../../contexts/userContext';
import DrawerOption from '../DrawerOption';
import RoundedButton from '../RoundedButton/RoundedButton';
import AccessController from '../AccessController';
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
    const {user} = useUserContext();

    const getUserPronoun = () => {
        if(user?.genero === 'M'){
            return 'Seja bem vindo!'
        } else if(user?.genero === 'F') {
            return 'Seja bem vinda!'
        } else {
            return 'Seja bem vinde!'
        }
    }

    return (
        <Container>
            <Avatar source={{uri: user?.foto} || {uri: "https://source.unsplash.com/featured/412x115/?craft"}} />
            <Welcome>Olá, {user?.nome} :)</Welcome>
            <WelcomeSubTitle>{getUserPronoun()}</WelcomeSubTitle>
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
            <AccessController profile="logado">
                <DrawerOption 
                    text='Mensagens' 
                    icon='chat' 
                    isSelected={selected==='chat'} 
                    onPress={() => setSelected('chat')}
                />
            </AccessController>     
            <AccessController profile="not-expositor">
                <Button onPress={() => navigation.navigate('Expositor')}>
                    <ButtonText>Torne-se um expositor!</ButtonText>
                </Button>
            </AccessController>
            <AccessController profile="not-logado">
                <Button onPress={() => navigation.navigate('SignUp')}>
                    <ButtonText>Cadastre-se!</ButtonText>
                </Button>
            </AccessController>


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
