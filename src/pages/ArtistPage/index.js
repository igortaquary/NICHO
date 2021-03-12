import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

export default function ArtistPage({ navigation }) {
  let imageSource = "https://source.unsplash.com/featured/412x115/?craft";
  let profileImageSource = {
    uri: "https://source.unsplash.com/featured/?woman,photo",
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View style={Style.coverContainer}>
        <Image source={{ uri: imageSource }} style={Style.coverImage} />
      </View>

      <View style={Style.profilePicContainer}>
        <Image source={profileImageSource} style={Style.profilePic} />
      </View>

      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: cw(0),
          borderTopRightRadius: cw(0),
        }}
      >
        <Text style={Style.name}>Juliana Daglio</Text>

        <View style={Style.buttonRow}>
          <RoundedButton
            style={Style.followingButton}
            textStyle={Style.followingButtonText}
            text="seguindo"
          >
            <Feather
              name="chevron-down"
              size={cw(15)}
              color="#707070"
              style={Style.chevronDownIcon}
            />
          </RoundedButton>

          <RoundedButton style={Style.iconButton}>
            <Ionicons
              name="ios-git-network-outline"
              size={cw(15)}
              color="#707070"
              style={Style.networkIcon}
            />
          </RoundedButton>

          <RoundedButton style={Style.iconButton}>
            <Entypo
              name="dots-three-vertical"
              size={cw(11.69)}
              color="#707070"
              style={Style.dotIcon}
            />
          </RoundedButton>
        </View>

        {/* colocar botões "seguindo" etc */}
        <View style={Style.descriptionContainer}>
          <Text style={Style.description}>
            Olá, bem vindo ao meu perfil! Moro em Taguatinga - DF, e produzo
            peças artesanais desde os dez anos de idade. Já fiz diversos cursos
            de cerâmica e costura e há três anos vendo minhas peças online e em
            feirinhas do DF e de outras cidades do Brasil.
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
          <TouchableOpacity>
            <SimpleLineIcons
              name="social-instagram"
              size={cw(20)}
              color="#019B92"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <SimpleLineIcons
              name="social-linkedin"
              size={cw(21.94)}
              color="#019B92"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Fontisto name="world-o" size={cw(20.11)} color="#019B92" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Accordion title="Locais físicos onde vendo">
          <View style={Style.physicalLocationContainer}>
            <View style={Style.locationContainer}>
              <EvilIcons
                name="location"
                size={cw(35)}
                color="#019B92"
                style={Style.locationIcon}
              />
              <View style={Style.locationTextContainer}>
                <Text style={Style.locationName}>Endossa - Águas Claras</Text>
                <Text
                  style={{
                    ...Style.locationName,
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  QSC 19 chácara 26 conjunto F loja 02 - DF
                </Text>
              </View>
            </View>

            <View style={Style.locationContainer}>
              <EvilIcons
                name="location"
                size={cw(35)}
                color="#019B92"
                style={Style.locationIcon}
              />
              <View style={Style.locationTextContainer}>
                <Text style={Style.locationName}>Feira Liga Pontos</Text>
                <Text
                  style={{
                    ...Style.locationName,
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  SQS 215 - Bloco G/H - Jardim entrequadras
                </Text>
              </View>
            </View>
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
      </View>
    </ScrollView>
  );
}
