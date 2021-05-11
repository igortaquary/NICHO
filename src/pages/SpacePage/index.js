import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import Style from "./styles";
import Accordion from "../../components/Accordion";
import Icon from "./../../components/Icon/index";
import ShowLocation from "./../../components/ShowLocation";
import moment from "moment";
import * as Linking from "expo-linking";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import { locationPermission } from "../../components/Permissions";

export default function SpacePage({ navigation, route }) {
  const space = route.params.space;
  const locations = [
    {
      placeName: space.localName,
      placeAddress: space.location,
      placeGeometry: { location: space.local[0].placeGeometry.location },
    },
    {
      locationText:space.localName,
    },
  ];
  const mockedDate = moment().local().format();
  const businessHours = [
    {
      days: ["Segunda", "Terça", "Quarta"],
      time: {
        from: "2021-05-08T13:00:31.840Z",
        to: "2021-05-08T20:30:31.840Z",
      },
    },
    {
      days: ["Domingo"],
      time: {
        from: "2021-05-08T03:00:31.840Z",
        to: "2021-05-08T23:30:31.840Z",
      },
    },
  ];

  locationPermission();

  function handlePressContact(url) {
    Linking.openURL(url);
  }

  function BusinessHours() {
    let auxBusinessHours = [
      ["segunda-feira", "Fechado"],
      ["terça-feira", "Fechado"],
      ["quarta-feira", "Fechado"],
      ["quinta-feira", "Fechado"],
      ["sexta-feira", "Fechado"],
      ["sábado", "Fechado"],
      ["domingo", "Fechado"],
    ]; // domingo, segunda, terça, quarta, quinta, sexta, sábado

    businessHours.forEach((businessHour) => {
      businessHour.days.forEach((day) => {
        let indexDay = null;
        switch (day) {
          case "Segunda":
            indexDay = 0;
            break;
          case "Terça":
            indexDay = 1;
            break;
          case "Quarta":
            indexDay = 2;
            break;
          case "Quinta":
            indexDay = 3;
            break;
          case "Sexta":
            indexDay = 4;
            break;
          case "Sábado":
            indexDay = 5;
            break;
          case "Domingo":
            indexDay = 6;
            break;
        }
        indexDay != null && (auxBusinessHours[indexDay][1] = businessHour.time);
      });
    });

    let dayIndex = new Date().getDay();
    dayIndex = dayIndex ? dayIndex - 1 : 6;
    let currentDay = auxBusinessHours[dayIndex][1];
    let text = "Fechado agora";
    if (currentDay != "Fechado") {
      let timeFrom = moment(currentDay.from).toArray();
      timeFrom = moment().hour(timeFrom[3]).minute(timeFrom[4]);
      let timeTo = moment(currentDay.to).toArray();
      timeTo = moment().hour(timeTo[3]).minute(timeTo[4]);

      text = moment(mockedDate).isBetween(timeFrom, timeTo)
        ? `Aberto agora ${timeFrom.format("HH:mm")}-${timeTo.format("HH:mm")}`
        : text;
    }

    return (
      <View style={[Style.iconAndInfoContainer, { marginBottom: 6 }]}>
        <Icon
          name="clock"
          size={15.5}
          color="#019B92"
          style={[
            { position: "absolute", zIndex: 2 },
            // location.placeAddress && { top: cw(12.88) },
          ]}
        />

        <Accordion
          title={text}
          textStyle={{
            ...Style.infoText,
            left: cw(-8),
            top: cw(-3),
            marginRight: cw(10),
            marginLeft: 0,
          }}
          iconContainerStyle={{ ...Style.miniAccordionIcon, top: cw(-3) }}
          iconSize={15}
          toggleButtonStyle={[
            Style.miniAccordion,
            {
              marginTop: 0,
              height: cw(23),
            },
          ]}
          contentContainerStyle={
            Style.miniAccordionBusinessHoursContentContainer
          }
        >
          {auxBusinessHours.map((businessHour, index) => {
            let text = businessHour[1].from
              ? `${moment(businessHour[1].from).format("HH:mm")}-${moment(
                  businessHour[1].to
                ).format("HH:mm")}`
              : businessHour[1];

            return (
              <View key={businessHour[0]} style={Style.businessHourContainer}>
                <Text
                  style={[
                    Style.businessHour,
                    dayIndex == index && { fontFamily: "Raleway_700Bold" },
                  ]}
                >
                  {businessHour[0]}
                </Text>
                <Text
                  style={[
                    Style.businessHour,
                    dayIndex == index && { fontFamily: "Raleway_700Bold" },
                  ]}
                >
                  {text}
                </Text>
              </View>
            );
          })}
        </Accordion>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View>
        <View>
          <TouchableOpacity style={{ ...Style.iconContainer, top: cw(175.71) }}>
            <Icon
              name="compartilhar"
              size={cw(15)}
              color="#FFFFFF"
              style={{ left: cw(-1) }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Style.iconContainer}>
            <Icon name="salvar" size={cw(15)} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Image style={Style.coverImage} source={space.images[0]} />
      </View>
      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <View style={Style.spaceHeader}>
          <Image source={space.images[1]} style={Style.profilePicture} />
          <View style={Style.spaceHeaderTextContainer}>
            <Text style={Style.spaceName}>{space.titulo}</Text>
            <Text style={Style.spaceCaption}>{space.descricao}</Text>
          </View>
        </View>

        <View style={[Style.stripe, { marginBottom: 0 }]} />

        {locations.map((location, index) => {
          let text = location.locationText || location.placeAddress;
          //   DESCOMENTAR QUANDO CONECTAR COM O DB E TESTAR
          //   let latitudeDelta = Math.abs(
          //     location.placeGeometry?.viewport.northeast.lat -
          //       placeGeometry.viewport.southwest.lat
          //   );
          //   let longitudeDelta = Math.abs(
          //     location.placeGeometry.viewport.northeast.lng -
          //       placeGeometry.viewport.southwest.lng
          //   );
          let latitudeDelta = 0.0077;
          let longitudeDelta = 0.0032;

          return (
            <View
              key={index}
              style={[
                Style.iconAndInfoContainer,
                { marginTop: cw(6.12) },
                location.placeGeometry && { marginBottom: cw(0) },
              ]}
            >
              <Icon
                name="locais"
                size={cw(17)}
                color="#019B92"
                style={[
                  { position: "absolute", zIndex: 2 },
                  location.placeAddress && { top: cw(12.88) },
                ]}
              />
              {location.locationText ? (
                <Text
                  style={[
                    Style.infoText,
                    { marginLeft: cw(27), marginRight: cw(0) },
                  ]}
                >
                  {text}
                </Text>
              ) : (
                <Accordion
                  title={text}
                  textStyle={{
                    ...Style.infoText,
                    left: cw(-13),
                    marginLeft: cw(0),
                    marginRight: cw(10),
                  }}
                  iconContainerStyle={Style.miniAccordionIcon}
                  iconSize={cw(15)}
                  toggleButtonStyle={Style.miniAccordion}
                  contentContainerStyle={Style.miniAccordionContentContainer}
                >
                  <ShowLocation
                    destinationLatitude={parseFloat(
                      location.placeGeometry.location.lat
                    )}
                    destinationLongitude={parseFloat(
                      location.placeGeometry.location.lng
                    )}
                    destinationName={location.placeName}
                    style={Style.map}
                    attentionContainerStyle={Style.mapAttentionTextContainer}
                    latitudeDelta={latitudeDelta}
                    longitudeDelta={longitudeDelta}
                  />
                </Accordion>
              )}
            </View>
          );
        })}

        <BusinessHours />

        {!!space.links.phone && (
          <View style={[Style.iconAndInfoContainer, { alignItems: "center" }]}>
            <Icon name="telephone" size={cw(17)} color="#019B92" />
            <Text
              style={[Style.infoText, { textDecorationLine: "underline" }]}
              onPress={() => handlePressContact(`tel:${space.links.phone}`)}
            >
              {space.links.phone}
            </Text>
          </View>
        )}

        {!!space.links.website && (
          <View style={[Style.iconAndInfoContainer, { alignItems: "center" }]}>
            <Icon
              name="website"
              size={16}
              color="#019B92"
              style={{ marginRight: cw(4) }}
            />
            <Text
              style={[Style.infoText, { textDecorationLine: "underline" }]}
              onPress={() => handlePressContact(`https://${space.links.website}`)}
            >
              {space.links.website}
            </Text>
          </View>
        )}

        {!!space.links.instagram && (
          <View style={[Style.iconAndInfoContainer, { alignItems: "center" }]}>
            <Icon
              name="instagram"
              size={cw(16)}
              color="#019B92"
              style={{ marginRight: cw(-5), height: cw(20), width: cw(20) }}
            />
            <Text
              style={[Style.infoText, { textDecorationLine: "underline" }]}
              onPress={() =>
                handlePressContact(`https://${space.links.instagram}`)
              }
            >
              {space.links.instagram}
            </Text>
          </View>
        )}
      </View>

      <Accordion
        title="Sobre"
        containerStyle={Style.accordionContainer}
        toggleButtonStyle={Style.toggleButtonStyle}
        textStyle={{ ...Style.title }}
        iconContainerStyle={{ left: cw(-15.65) }}
        iconSize={cw(26)}
        contentContainerStyle={Style.contentContainerStyle}
      >
        <Text style={Style.text}>{space.descricao}</Text>

        <View style={Style.tagsContainer}>
          {space.categorias.map((category) => {
            return (
              <View key={category} style={Style.tag}>
                <Text style={Style.tagText}>{category}</Text>
              </View>
            );
          })}
        </View>
      </Accordion>

      <Accordion
        title="Fotos"
        containerStyle={Style.accordionContainer}
        toggleButtonStyle={{ ...Style.toggleButtonStyle }}
        textStyle={{ ...Style.title }}
        iconContainerStyle={{ left: cw(-15.65) }}
        iconSize={cw(26)}
        contentContainerStyle={Style.imagesContainer}
      >
        {space.images.map((image, index) => {
          return (
            <Image key={index} source={ image } style={Style.image} />
          );
        })}
      </Accordion>

    </ScrollView>
  );
}
