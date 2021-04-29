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

const ProductPage = ({navigation, route}) => {
  const images = route.params.images;
  const product = route.params.product;
  console.log(route.params);
  console.log(product);

  React.useEffect( () => {
    navigation.setOptions({ title: product.titulo })
  }, [])

  const getImages = () => {
    
  }
  
  return (
    <Container>
      <ProductCarousel data={[product.uri]} />
      <MainInfo>
        <Artist onPress={() => navigation.navigate('Página do Artista')}>
          <ArtistText>Por {product.nome}</ArtistText>
        </Artist>
        <ProductName>{product.titulo}</ProductName>
        <Labels>
          <Label text='Para vestir' />
          <Label text='GO' />
          <Label text='Tecido' />
          <Label icon='ampulheta' text='Encomenda' />
          <Label icon='vegano' text='Vegano' />
        </Labels>

      </MainInfo>
      <Accordion title='Descrição' key={1}>
        <Description>
          {product.descricao}
        </Description>
      </Accordion>

      {/* <Text>fsdlkfjsf</Text> */}

      <Accordion title='Opções de Compra' key={2}>
        <Option>
          <Label icon='ampulheta' />
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
