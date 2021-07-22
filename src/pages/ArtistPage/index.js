import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Linking } from "react-native";
import {
  Feather,
  Ionicons,
  Entypo,
  SimpleLineIcons,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import Accordion from "../../components/Accordion";
import Icon from "../../components/Icon";
import { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import PhotosGrid from "../../components/PhotosGrid";
import { useUserContext } from "../../contexts/userContext";
import ImageView from "react-native-image-viewing";

export default function ArtistPage({ navigation, route }) {

  const anunciante = route.params.anunciante;
  const [profileImage, setProfileImage] = useState('https://source.unsplash.com/featured/?woman,photo');
  const [bannerImage, setBannerImage] = useState("https://source.unsplash.com/featured/412x115/?craft");
  const [images, setImages] = useState('https://source.unsplash.com/featured/?woman,photo');
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const {user, followArtist} = useUserContext();

  const getImages = async () => {
    const profile = await firebase.storage().ref('user_photo/' + anunciante.id).getDownloadURL();
    setProfileImage(profile);
    const banner = await firebase.storage().ref('expositor_banners/' + anunciante.id).getDownloadURL();
    setBannerImage(banner);
    const imgs = {uri: profile, uri: banner}
    setImages(imgs);
  }

  useEffect(() => {
    getImages();
    fetchProducts();
    console.log('refresh')
  }, [route.params])


  const fetchProducts = async () => {
    //console.log('fetch products');
    setRefreshing(true);
    const auxProducts = [];
    const auxImages = [];
    const querySnapshot = await firebase
      .firestore()
      .collection('produto')
      .where('anunciante', '==', anunciante.id)
      .get()
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      const id = documentSnapshot.id;
      auxProducts.push({ ...data, id });
    });
    for (const product of auxProducts) {
      const uri = await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/0').getDownloadURL();
      auxImages.push({ ...product, uri });
    }
    setProducts(auxImages);
    setRefreshing(false);
  }

  const checkFollowage = () => {
    if(user?.seguindo && user?.seguindo?.indexOf(anunciante.id) != -1) {
      return true;
    }else {
      return false;
    }
  }

  return (
    <>
      <ImageView
        images={[{ uri: profileImage }, { uri: bannerImage }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View style={Style.coverContainer}>
        <Image source={{ uri: bannerImage }} style={Style.coverImage} />
      </View>

      <View style={Style.profilePicContainer}>
      <TouchableOpacity onPress={()=>setIsVisible(true)}>
        <Image source={{ uri: profileImage }} style={Style.profilePic} />
      </TouchableOpacity>
      </View>

      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: cw(0),
          borderTopRightRadius: cw(0),
        }}
      >
        <Text style={Style.name}>{anunciante.nome}</Text>

        <View style={Style.buttonRow}>
          <RoundedButton
            onPress={async () => await followArtist(anunciante.id)}
            style={Style.followingButton}
            textStyle={Style.followingButtonText}
            text={checkFollowage() ? 'seguindo' : 'seguir'}
            disabled={checkFollowage() ? true : false}
          >
            <Feather
              name="chevron-down"
              size={cw(15)}
              color="#707070"
              style={Style.chevronDownIcon}
            />
          </RoundedButton>

          <RoundedButton style={Style.iconButton}>
            <Icon
              name="compartilhar"
              size={cw(13)}
              color="#707070"
              style={Style.networkIcon}
            />
          </RoundedButton>
        </View>

        {/* colocar botões "seguindo" etc */}
        <View style={Style.descriptionContainer}>
          <Text style={Style.description}>
            {anunciante.dados_vendedor.descricao}
          </Text>
        </View>
        <RoundedButton
          style={Style.talkToMebutton}
          textStyle={Style.talkToMeButtonText}
          text="Fale comigo :)"
        />
      </View>

      <View style={Style.sectionContainer}>
        <Text style={Style.titleText}>Minhas outras redes</Text>
        <View style={Style.socialNetworkButtonRow}>
          {
            anunciante.dados_vendedor.links?.instagram &&
            <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${anunciante.dados_vendedor.links?.instagram}`)}>
              <Icon name="instagram" size={20} color="#019B92" />
            </TouchableOpacity>
          }

          {
            anunciante.dados_vendedor.links?.linkedin &&
            <TouchableOpacity onPress={() => Linking.openURL(anunciante.dados_vendedor.links?.linkedin)}>
              <Icon name="linkedin" size={20} color="#019B92" />
            </TouchableOpacity>
          }

          {
            anunciante.dados_vendedor.links?.website &&
            <TouchableOpacity onPress={() => Linking.openURL(`https://${anunciante.dados_vendedor.links?.website}`)}>
              <Icon name="website" size={20} color="#019B92" />
            </TouchableOpacity>
          }
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Accordion title="Locais físicos onde vendo">
          <View style={Style.physicalLocationContainer}>
            {anunciante.dados_vendedor.locais.map(local => (
              <View key={local.nome} style={Style.locationContainer}>
                <EvilIcons
                  name="location"
                  size={cw(35)}
                  color="#019B92"
                  style={Style.locationIcon}
                />
                {/* <Marker /> */}
                <View style={Style.locationTextContainer}>
                  <Text style={Style.locationName}>{local.nome}</Text>
                  <Text
                    style={{
                      ...Style.locationName,
                      fontFamily: "Raleway_400Regular",
                    }}
                  >
                    {local.endereco}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Accordion>
      </View>

      <View
        style={{
          ...Style.sectionContainer,
          paddingTop: cw(17.11),
          paddingHorizontal: cw(16),
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          marginBottom: 0,
        }}
      >
        <Text style={Style.myProductsText}>Meus produtos</Text>
        <View style={{ flex: 1, width: '100%' }}>
          <PhotosGrid products={products} refreshing={refreshing} navigation={navigation} />
        </View>
      </View>
    </ScrollView>
    </>
  );
}
