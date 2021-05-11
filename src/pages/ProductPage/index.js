import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity } from 'react-native';

import Accordion from '../../components/Accordion';
import Label from '../../components/Label';
import ProductCarousel from '../../components/ProductCarousel';
import { FontAwesome } from '@expo/vector-icons';
import { useUserContext } from '../../contexts/userContext';
import * as firebase from "firebase";
import "firebase/firestore";
import openChat from '../../api/chat';
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
import SaveProductModal from '../../components/SaveProductModal';

const ProductPage = ({ navigation, route }) => {  
  //const images = route.params.images;
  const product = route.params.product;
  
  const [images, setImages] = useState([]);
  const { user, threads } = useUserContext();
  const [anunciante, setAnunciante] = useState();
  const [idAnunciante, setIdAnunciante] = useState();
  const modalizeRef = useRef(null);

  React.useEffect( () => {
    navigation.setOptions({ title: product.titulo });
    getAnuncianteData();
    getImages();
  }, [])

  const getImages = async () => {
    const auxImages = [];
    try{
      auxImages.push(product.uri);
      auxImages.push(await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/1').getDownloadURL());
      auxImages.push(await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/2').getDownloadURL());
    } catch (err) {
      console.log(err);
    }
    setImages(auxImages);
  }

  const getAnuncianteData = async () => {
    const userDocument = await firebase.firestore()
        .collection('usuario')
        .doc(product.anunciante)
        .get()
        .then((doc) => {
            setAnunciante(doc.data());
            setIdAnunciante(doc.id);
        })
  }

  const handleSavePress = async () => {
    console.log('clicou')
    if (user) {
      modalizeRef.current.open();      
    } else {
      Alert.alert(
        "Usuário não conectado",
        "É necessário estar logado para salvar um produto.",
        [
          {
            text: "Entrar depois",
            onPress: () => console.log('Depois')
          },
          {
            text: "Não possuo conta",
            onPress: () => navigation.navigate('SignUp'),
          },
          {
            text: "Ir para login",
            onPress: () => navigation.navigate('Login'),
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }

  return (
    <>
      <SaveProductModal modalizeRef={modalizeRef} product={product} />
      <Container>
        <ProductCarousel data={images} onSavePress={handleSavePress} />
        <MainInfo>
          <Artist onPress={() => navigation.navigate('Página do Artista', {anunciante: {...anunciante, id: idAnunciante}})}>
            <ArtistText>Por {anunciante?.nome}</ArtistText>
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
            <ContactButtonText onPress={() => {openChat(navigation, user.id, product.anunciante, user.nome, anunciante.nome, threads)}}>
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
                <CommentAuthor style={{ color: "#019B92", marginLeft: 5 }}>Juliana Daglio</CommentAuthor>
              </CommentHeader>
              <CommentContent>
                Fico muito feliz em saber! Per aumento de cachacis, eu reclamis. Si
                num tem leite então bota uma pinga aí cumpadi!
          </CommentContent>
            </CommentResponse>
          </Comment>
        </Accordion>

        <More>
          <Text style={{ fontSize: 15, fontFamily: 'Raleway_700Bold', color: '#707070' }}>Mais como esse</Text>
        </More>

      </Container>
    </>
  )
}

export default ProductPage
