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

export default function SpacePage({ navigation }) {
  const spaceName = "Brio Espaço Colaborativo";
  const spaceCaption = "cafeteria e loja colaborativa";
  const coverImage = {
    uri: "https://source.unsplash.com/collection/227043",
  };
  const profilePicture = {
    uri:
      "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/64702081_653936445081182_6307125986315993088_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=vkELm_foOboAX_7ZCAZ&_nc_ht=scontent.fbsb3-1.fna&oh=7c321b00c4c69b01820313d469341192&oe=60BBCC98",
  };
  const locations = [
    {
      placeName: "Brio - Espaço Colaborativo",
      placeAddress: "Taguatinga norte - QNL 12, conjunto G",
      placeGeometry: { location: { lat: "-15.835981", lng: "-48.050079" } },
    },
    {
      locationText:
        "Brio - Espaço Colaborativo, Taguatinga norte - QNL 12, conjunto G",
    },
  ];
  const mockedDate = moment().local().format();
  const contacts = {
    instagram: "instagram.com/briocafe",
    phone: "+55 61 30369614",
    website: "briocafe.com.br",
  };
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
  const details = `O mercado das pulgas (português brasileiro) ou feira da ladra (português europeu) é um local onde diversos vendedores se reúnem para comercializar bens antigos, usados e outras mercadorias, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore`;
  const categories = [
    "Adesivos",
    "Para Vestir",
    "Para sua Casa",
    "Papelaria",
    "Cosméticos",
    "Impressões",
  ];
  const images = [
    "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/80326557_775919546216204_5457814027646271488_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=0debeb&_nc_ohc=NHjY1SvlQjoAX96jNzl&_nc_ht=scontent.fbsb3-1.fna&oh=86af7a2137184fa10048e517366c2cee&oe=60BB26FD",
    "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/78755701_775919826216176_322984220718792704_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=0debeb&_nc_ohc=dVZKwaQD9NkAX-kNoPS&_nc_oc=AQkR7iDMvQV8CiP-S5QskUV4MM5PiAtuJ__x7P9oesH4znoZEN5U0NHFzW2aLbSKMLs&_nc_ht=scontent.fbsb3-1.fna&oh=7da732b97259230dba802eac68749307&oe=60BB829F",
    "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/78606104_775920106216148_3125259062040592384_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=0debeb&_nc_ohc=yiaT6CQ0pvsAX-ECMey&_nc_ht=scontent.fbsb3-1.fna&oh=4c27cbd130000b2f2fd9e7d66859eb02&oe=60BE73E2",
  ];
  const events = [
    {
      id: "AWHUEIHAWUI23980234E45TEO",
      cover: [
        "https://payload.cargocollective.com/1/12/412724/8528630/LigaPontos-16dez18-141_900.jpg",
      ],

      name: "Feira Liga Pontos",
      dates: [
        {
          from: "2021-05-08T13:00:31.840Z",
          to: "2021-06-08T23:00:31.840Z",
        },

        {
          from: "2021-07-08T13:00:31.840Z",
          to: "2021-08-08T23:00:31.840Z",
        },
      ],
    },
    {
      id: "dskfjsdfj398rjwe89458ewdsgi",
      cover: [
        "https://www.artesanatopassoapassoja.com.br/wp-content/uploads/2018/10/feiras-de-artesanato.jpg",
      ],

      name: "Feira Artesanal",
      dates: [
        {
          from: "2021-10-08T13:00:31.840Z",
          to: "2021-11-08T23:00:31.840Z",
        },
      ],
    },
    {
      id: "ofigdjoj4reoijz390g0df0c",
      cover: [
        "http://www.saocaetanodigital.com.br/wp-content/uploads/2019/04/feirinha.jpg",
      ],

      name: "Feira de Artes",
      dates: [
        {
          from: "2021-11-08T13:00:31.840Z",
          to: "2021-12-08T23:00:31.840Z",
        },
      ],
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
        <Image style={Style.coverImage} source={coverImage} />
      </View>
      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <View style={Style.spaceHeader}>
          <Image source={profilePicture} style={Style.profilePicture} />
          <View style={Style.spaceHeaderTextContainer}>
            <Text style={Style.spaceName}>{spaceName}</Text>
            <Text style={Style.spaceCaption}>{spaceCaption}</Text>
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

        {!!contacts.phone && (
          <View style={[Style.iconAndInfoContainer, { alignItems: "center" }]}>
            <Icon name="telephone" size={cw(17)} color="#019B92" />
            <Text
              style={[Style.infoText, { textDecorationLine: "underline" }]}
              onPress={() => handlePressContact(`tel:${contacts.phone}`)}
            >
              {contacts.phone}
            </Text>
          </View>
        )}

        {!!contacts.website && (
          <View style={[Style.iconAndInfoContainer, { alignItems: "center" }]}>
            <Icon
              name="website"
              size={16}
              color="#019B92"
              style={{ marginRight: cw(4) }}
            />
            <Text
              style={[Style.infoText, { textDecorationLine: "underline" }]}
              onPress={() => handlePressContact(`https://${contacts.website}`)}
            >
              {contacts.website}
            </Text>
          </View>
        )}

        {!!contacts.instagram && (
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
                handlePressContact(`https://${contacts.instagram}`)
              }
            >
              {contacts.instagram}
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
        <Text style={Style.text}>{details}</Text>

        <View style={Style.tagsContainer}>
          {categories.map((category) => {
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
        {images.map((image, index) => {
          return (
            <Image key={index} source={{ uri: image }} style={Style.image} />
          );
        })}
      </Accordion>

      <Accordion
        title="Próximos eventos"
        containerStyle={[
          Style.accordionContainer,
          { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        ]}
        toggleButtonStyle={{
          ...Style.toggleButtonStyle,
          paddingLeft: cw(29),
        }}
        textStyle={{ ...Style.title }}
        iconContainerStyle={{ left: cw(-15.65) }}
        iconSize={cw(26)}
        contentContainerStyle={Style.eventImagesContainer}
      >
        <ScrollView
          horizontal
          snapToInterval={cw(295)}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
        >
          {events.map((event, index) => {
            let earlierDates = [...event.dates];

            earlierDates.sort((A, B) => {
              let auxDateA = moment(A.from);
              let auxDateB = moment(B.from);

              let diffA = moment().diff(auxDateA);
              let diffB = moment().diff(auxDateB);

              if (moment(A.to).isBefore(moment()) || diffA < diffB) {
                console.log("primeiro retorno");
                return 1;
              }
              if (moment(B.to).isBefore(moment()) || diffA > diffB) {
                console.log("segundo retorno");
                return -1;
              }
              console.log("ultimo retorno");
              return 0;
            });

            let date = moment(earlierDates[0].from).format(
              "ddd, DD [de] MMM [às] HH:mm"
            );
            let isToday = moment().isBetween(
              moment(earlierDates[0].from),
              moment(earlierDates[0].to),
              "days"
            );
            return (
              <View key={event.id} style={{ marginLeft: cw(11) }}>
                <View style={Style.eventHeader}>
                  <View style={Style.eventDateContainer}>
                    <Text style={Style.eventDateText}>{date}</Text>
                    {isToday && <Text style={Style.today}>Hoje!</Text>}
                  </View>
                  <Text style={Style.eventName}>{event.name}</Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={{ uri: event.cover[0] }}
                    style={Style.eventCover}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </Accordion>
    </ScrollView>
  );
}
