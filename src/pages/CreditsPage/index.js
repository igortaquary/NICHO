import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Style from "./styles";
import Accordion from "../../components/Accordion";
import Icon from "./../../components/Icon/index";

import moment from "moment";
import * as Linking from "expo-linking";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

import Background from "../../assets/login-bg.jpg";

export default function CreditsPage() {
  return (
    <ScrollView>
      <ImageBackground source={Background} style={Style.container}>
        <View
          style={[Style.verticalStripe, { height: 96, marginBottom: 39 }]}
        />
        <Icon
          name="logo"
          size={45.4}
          color="white"
          style={{ width: 119.81, height: 38.65 }}
        />
        <View style={Style.textContainer}>
          <View style={Style.sectionContainer}>
            <Text style={Style.title}>Concepção e Design</Text>
            <Text style={Style.name}>Luiza Reolon Cabral</Text>
            <Text style={Style.name}>Clarice Taylor Guirra</Text>
            <Text style={Style.name}>Sofia Guerra</Text>
          </View>

          <View style={Style.sectionContainer}>
            <Text style={Style.title}>Programação</Text>
            <Text style={Style.name}>Augusto Freitas</Text>
            <Text style={Style.name}>Guilherme Rodrigues</Text>
            <Text style={Style.name}>Igor Taquary</Text>
            <Text style={Style.name}>Thiaggo Ferreira Bispo</Text>
            <Text style={Style.name}>Johannes Schulte</Text>
          </View>

          <View style={Style.sectionContainer}>
            <Text style={Style.title}>Orientação</Text>
            <Text style={Style.name}>Virgínia Tiradentes</Text>
            <Text style={Style.name}>Wilson Veneziano</Text>
          </View>

          <View style={Style.sectionContainer}>
            <Icon name="heart" size={10} color="#00B2B2" />
            <Text style={Style.thanks}>
              Muito obrigada por{"\n"}usar o Nicho
            </Text>
          </View>

          <Text style={Style.attentionText}>
            Versão apenas para testes preliminares; podem ocorrer travamentos ou
            instabilidades. Seu feedback será útil à equipe desenvolvedora.
          </Text>
        </View>
        <View style={[Style.verticalStripe, { bottom: 0 }]} />
      </ImageBackground>
    </ScrollView>
  );
}
