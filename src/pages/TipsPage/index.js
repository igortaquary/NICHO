import React from 'react'
import {
    Container, 
    Title, 
    SectionContainer,
    SectionContainerTitle,
    SectionOption,
    SectionOptionText
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';

const TipsPage = () => {
    return (
        <Container contentContainerStyle={{alignItems: 'center', padding: '6%'}}>
            <Title>Confira alguns cursos que podem te ajudar!</Title>
            <SectionContainer>
                <SectionContainerTitle>Como começar sua loja online</SectionContainerTitle>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/iniciando-um-pequeno-grande-negocio,5f60b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Iniciando uma empresa</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/aprender-a-empreender,b070b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Aprender a Empreender</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
            </SectionContainer>

            <SectionContainer>
                <SectionContainerTitle>Marketing Digital</SectionContainerTitle>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/marketing-digital-para-o-empreendedor,f870b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Marketing digital para o empreendedor</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursoseeventos/como-turbinar-suas-vendas,1ba0b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Como turbinar as suas vendas</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
            </SectionContainer>

            <SectionContainer>
                <SectionContainerTitle>Gestão Financeira</SectionContainerTitle>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/gestao-financeira,7370b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Gestão Financeira</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
                <SectionOption onPress={() => Linking.openURL('https://www.sebrae.com.br/sites/PortalSebrae/cursoseeventos/como-definir-preco-de-venda,04a0b8a6a28bb610VgnVCM1000004c00210aRCRD')}>
                    <SectionOptionText>Como definir preços de venda</SectionOptionText>
                    <AntDesign name="rightcircle" size={24} color="#019B92" />
                </SectionOption>
            </SectionContainer>
        </Container>
    )
}

export default TipsPage
