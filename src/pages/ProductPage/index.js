import React from 'react';
import { Text } from 'react-native';
import Accordion from '../../components/Accordion';
import Label from '../../components/Label';
import ProductCarousel from '../../components/ProductCarousel';
import { FontAwesome } from '@expo/vector-icons';
import {
  Container,
  Description,
  MainInfo,
  Artist,
  ArtistText,
  ProductName,
  Labels,
  Option,
  OptionDetails,
  OptionTitle,
  OptionDescription,
  ContactButton,
  ContactButtonText,
  Comment,
  CommentAuthor,
  CommentHeader,
  CommentContent,
  CommentResponse,
  More
} from './styles';

const data = [
  {
    id: 1,
    color: 'yellow',
    url: 'https://source.unsplash.com/featured/?handmade'
  },
  {
    id: 2,
    color: 'blue',
    url: 'https://source.unsplash.com/featured/?handmade'
  },
  {
    id: 3,
    color: 'orange',
    url: 'https://source.unsplash.com/featured/?handmade'
  },
]

const ProductPage = ({navigation}) => {
  return (
    <Container>
      <ProductCarousel data={data} />
      <MainInfo>
        <Artist onPress={() => navigation.navigate('Página do Artista')}>
          <ArtistText>Por Juliana Daglio</ArtistText>
        </Artist>
        <ProductName>Produto Maravilhoso</ProductName>
        <Labels>
          <Label text='Para vestir' />
          <Label text='GO' />
          <Label text='Tecido' />
          <Label icon='hourglass' text='Encomenda' />
          <Label icon='leaf' text='Vegano' />
        </Labels>

      </MainInfo>
      <Accordion title='Descrição' key={1}>
        <Description>
          Atirei o pau no gatis, per gatis num morreus. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!
          Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Praesent vel viverra nisi.
          Mauris aliquet nunc non turpis scelerisque, eget.Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie
          leo, vitae iaculis nisl. Quem num gosta di mé, boa gentis num é. Suco de cevadiss, é um leite divinis, qui tem
          lupuliz, matis, aguis e fermentis. Quem manda na minha terra sou euzis!Mais vale um bebadis conhecidiss, que um
          alcoolatra anonimis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.
          Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Interessantiss quisso pudia
          ce receita de bolis, mais bolis eu num gostis. Diuretics paradis num copo é motivis de denguis. Interagi no mé,
          cursus quis, vehicula ac nisi. Mé faiz elementum girarzis, nisi eros vermeio.
        </Description>
      </Accordion>

      {/* <Text>fsdlkfjsf</Text> */}

      <Accordion title='Opções de Compra' key={2}>
        <Option>
          <Label icon='hourglass' />
          <OptionDetails>
            <OptionTitle>SOB ENCOMENDA</OptionTitle>
            <OptionDescription>Este produto é produzido sob encomenda. Para mais
               detalhes de produção e pagamento, é preciso entrar em contato com o vendedor.</OptionDescription>
          </OptionDetails>
        </Option>
        <ContactButton>
          <ContactButtonText>
            Fale com o artista!
          </ContactButtonText>
        </ContactButton>
      </Accordion>

      <Accordion title='Comentários' key={3}>
        <Comment>
          <CommentHeader>
            <CommentAuthor>Fulano Rodrigues</CommentAuthor>
            <FontAwesome name="star" size={12} color="#019B92" />
          </CommentHeader>
          <CommentContent>
            Melhor chapéu de cogumelo já criado na história da humanidade!
            Simplesmente perfeito! Não vou tirar nunca mais!!! OBRIGADA DEUS
            POR ESSE CHAPÉU
          </CommentContent>
          <CommentResponse>
            <CommentHeader>
              <FontAwesome name="pencil" size={14} color="#019B92" />
              <CommentAuthor style={{color: "#019B92", marginLeft: 5}}>Juliana Daglio</CommentAuthor>
            </CommentHeader>
            <CommentContent>
            Fico muito feliz em saber! Per aumento de cachacis, eu reclamis. Si 
            num tem leite então bota uma pinga aí cumpadi!
          </CommentContent>
          </CommentResponse>
        </Comment>
      </Accordion>

      <More>
        <Text style={{fontSize: 15, fontFamily: 'Raleway_700Bold', color: '#707070'}}>Mais como esse</Text>
      </More>

    </Container>
  )
}

export default ProductPage
