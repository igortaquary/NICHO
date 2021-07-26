
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback, Pressable } from 'react-native';


import Accordion from "../../components/Accordion";
import Label from "../../components/Label";
import ProductCarousel from "../../components/ProductCarousel";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../../contexts/userContext";
import * as firebase from "firebase";
import "firebase/firestore";
import openChat from "../../api/chat";
import AccessController from "../../components/AccessController";
import {
  Container,
  Description,
  MainInfo,
  Artist,
  ArtistText,
  BackButton,
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

  More,
} from "./styles";
import Icon from "../../components/Icon";
import SaveProductModal from "../../components/SaveProductModal";
import PhotosGrid from "../../components/PhotosGrid";

import ImageView from "react-native-image-viewing";


const ProductPage = ({ navigation, route }) => {
  //const images = route.params.images;
  const product = route.params.product;

  const [images, setImages] = useState([]);
  const { user, threads } = useUserContext();
  const [anunciante, setAnunciante] = useState();
  const [idAnunciante, setIdAnunciante] = useState();
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const modalizeRef = useRef(null);
  const [visible, setIsVisible] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({ title: product.titulo });
    getAnuncianteData();
    getImages();
    fetchProducts();
  }, [route.params.product]);

  const fetchProducts = async () => {
    //console.log('fetch products');
    setRefreshing(true);
    const auxProducts = [];
    const auxImages = [];
    const querySnapshot = await firebase
      .firestore()
      .collection("produto")
      .where("anunciante", "==", product.anunciante)
      .limit(6)
      .get();
    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      const id = documentSnapshot.id;
      auxProducts.push({ ...data, id });
    });
    for (const product of auxProducts) {
      const uri = await firebase
        .storage()
        .ref(
          "user_products/" + product.anunciante + "/" + product.titulo + "/0"
        )
        .getDownloadURL();
      auxImages.push({ ...product, uri });
    }
    setProducts(auxImages);
    setRefreshing(false);
  };

  const getImages = async () => {
    const auxImages = [];
    try {
      auxImages.push(product.uri);
      auxImages.push(
        await firebase
          .storage()
          .ref(
            "user_products/" + product.anunciante + "/" + product.titulo + "/1"
          )
          .getDownloadURL()
      );
      auxImages.push(
        await firebase
          .storage()
          .ref(
            "user_products/" + product.anunciante + "/" + product.titulo + "/2"
          )
          .getDownloadURL()
      );
    } catch (err) {
      //console.log(err);
    }
    setImages(auxImages);
  };

  const getAnuncianteData = async () => {
    const userDocument = await firebase
      .firestore()
      .collection("usuario")
      .doc(product.anunciante)
      .get()
      .then((doc) => {
        setAnunciante(doc.data());
        setIdAnunciante(doc.id);
      });
  };

  const emitAlert = () => {
    Alert.alert(
      "Usuário não conectado",
      "É necessário estar logado para realizar esta ação.",
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

  const handleSavePress = async () => {


    if (user) {
      modalizeRef.current.open();
    } else {

      emitAlert();

    }
  };

  return (
    <>
      <ImageView
        images={images.map(item => ({uri: item}))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <SaveProductModal modalizeRef={modalizeRef} product={product} />
      <Container>

        <BackButton activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Icon name="back" size={16.9} color="#FFFFFF" style={{ left: -1 }} />
        </BackButton>

        <Pressable onPress={()=>setIsVisible(true)}>
          <ProductCarousel
            preco={product?.preco} 
            data={images}
            onSavePress={handleSavePress} 
            onChatPress={() => {openChat(navigation, user?.id, product.anunciante, user?.nome, anunciante.nome, threads)}}
          />
        </Pressable>

        <MainInfo>
          <Artist
            onPress={() =>
              navigation.navigate("Página do Artista", {
                anunciante: { ...anunciante, id: idAnunciante },
              })
            }
          >
            <ArtistText>Por {anunciante?.nome}</ArtistText>
          </Artist>
          <ProductName>{product.titulo}</ProductName>
          <Labels>
            <Label text="Para vestir" />
            <Label text="GO" />
            <Label text="Tecido" />
            <Label icon="ampulheta" text="Encomenda" />
            <Label icon="vegano" text="Vegano" />
          </Labels>
        </MainInfo>
        <Accordion title="Descrição" key={1}>
          <Description>{product.descricao}</Description>
        </Accordion>

        {/* <Text>fsdlkfjsf</Text> */}

        <Accordion title="Opções de Compra" key={2}>
          <Option>
            <Label icon="ampulheta" />
            <OptionDetails>
              <OptionTitle>SOB ENCOMENDA</OptionTitle>
              <OptionDescription>
                Este produto é produzido sob encomenda. Para mais detalhes de
                produção e pagamento, é preciso entrar em contato com o
                vendedor.
              </OptionDescription>
            </OptionDetails>
          </Option>
          <AccessController profile="logado">
            <ContactButton>
              <ContactButtonText
                onPress={() => {
                  openChat(
                    navigation,
                    user.id,
                    product.anunciante,
                    user.nome,
                    anunciante.nome,
                    threads
                  );
                }}
              >
                Fale com o artista!
              </ContactButtonText>
            </ContactButton>
          </AccessController>
        </Accordion>

        <More>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Raleway_700Bold",
              color: "#707070",
            }}
          >
            Mais desse artista
          </Text>
          <View style={{ flex: 1, width: "100%" }}>
            <PhotosGrid
              products={products}
              refreshing={refreshing}
              navigation={navigation}
            />
          </View>
        </More>
      </Container>
    </>
  );
};

export default ProductPage;
