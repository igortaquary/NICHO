import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "../../components/Icon";
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import * as firebase from "firebase";

export default function LocationsSpacesPage({ navigation }) {

  const [spaceList, setSpaces] = useState([]);

  const fetchSpaces = async (spaces) => {
    const Documents = await firebase.firestore()
      .collection('local')
      .get()
      .then((querrySnapshot) => {
        querrySnapshot.forEach((documentSnapshot) => {
          const doc = documentSnapshot.data()
          doc.id = documentSnapshot.id
          const fullAddress = doc.local[0].placeAddress
          const splitAddress = fullAddress.split("-")
          doc.region = splitAddress[1]
          doc.location = splitAddress[0]
          doc.localName = doc.local[0].placeName
          doc.id = documentSnapshot.id
          spaces.push(doc);
        });
      });
  };

  const fetchImages = async (spaces) => {
    for (const item of spaces){
      const images = []
      try{
        for (let i = 0; i < 3; i++){
          const url = {uri: await firebase.storage().ref('spaces/' + item.anunciante + '/' + item.titulo + '/' + i).getDownloadURL()}
          images.push(url)
        }
      }catch(fail){
        console.log(fail)
      }
      item.images = images
    }
  };

  useEffect(() => {
    const spaces = [];
    fetchSpaces(spaces).then(() => {
      fetchImages(spaces).then(() => {
        setSpaces(spaces);
        console.log(spaces);
      });
    });
  }, []);

  const Space = ({ name, photos, address, rating, businessHours, space }) => {
    const days = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    let stars = Array(5);

    const onSpaceClick = async () => {
      navigation.navigate("Página do Espaço", {space})
      console.log(space)
    }

    stars.fill("#F1F1F1");
    stars.fill("#E09F2B", 0, rating.value);

    const businessHoursHandler = (businessHours) => {
      let diaInicial = null;
      let diaFinal = null;
      let businessHoursText = "Aberto";

      for (let i = 0; i < businessHours.length; i++) {
        if (businessHours[i] != "Fechado") {
          if (diaInicial == null) {
            diaInicial = i;
          }
          for (let j = i + 1; j < businessHours.length; j++) {
            if (businessHours[j] == "Fechado") {
              i++;
              break;
            } else if (businessHours[i] == businessHours[j]) {
              diaFinal = j;
            }
          }
        }

        if (diaInicial != null) {
          businessHoursText = [
            businessHoursText,
            businessHoursText != "Aberto" ? `, ` : ` `,
          ];

          if (diaFinal != null) {
            businessHoursText = [
              businessHoursText,
              diaFinal - diaInicial != 1 && "de ",
              <Text key={diaFinal} style={Style.businessHoursTextDay}>
                {`${days[diaInicial]}`}
                {diaFinal - diaInicial != 1 ? " à " : " e "}
                {`${days[diaFinal]} - `}
              </Text>,
              `de ${businessHours[diaInicial].replace("-", " às ")}`,
            ];
          } else {
            businessHoursText = [
              businessHoursText,
              <Text
                key={diaFinal}
                style={Style.businessHoursTextDay}
              >{`${days[diaInicial]} - `}</Text>,
              `de ${businessHours[diaInicial].replace("-", " às ")}`,
            ];
          }
        }

        diaFinal && (i = diaFinal);
        diaInicial = null;
        diaFinal = null;
      }
      return businessHoursText;
    };

    return (
      <Fragment>
        <Text style={Style.spaceName}>{name}</Text>

        <ScrollView
          snapToInterval={cw(295)}
          decelerationRate={"fast"}
          horizontal
          style={{ flex: 1, marginRight: cw(-16), marginLeft: cw(-3) }}
          contentContainerStyle={Style.photosContainer}
          showsHorizontalScrollIndicator={false}
        >
          {photos.map((photo, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={onSpaceClick}
            >
              <Image source={photo} style={Style.photo} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...Style.iconContainer, top: cw(230.7) }}
        >
          <Icon name="compartilhar" size={cw(18.18)} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={Style.iconContainer}>
          <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={Style.addressRatingContainer}>
          <Text style={Style.addressText}>{address + " -"}</Text>
          {stars.map((starColor, index) => (
            <Icon key={index} name="star" size={8.51} color={starColor} />
          ))}
          <Text style={Style.ratingVotesText}>{`(${rating.votes})`}</Text>
        </View>

        <Text style={Style.businessHoursText}>
          {businessHoursHandler(businessHours)}
        </Text>
      </Fragment>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View
        style={[
          Style.sectionContainer,
          { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
        ]}
      >
        <Text style={Style.titleText}>Mais próximos de você</Text>
        {spaceList.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              space={local}
              name={local.titulo}
              photos={local.images}
              address={local.localName}
              rating={{
                value: 5,
                votes: 12,
              }}
              businessHours={[
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "Fechado",
              ]}
            />
          </Fragment>
        ))}
      </View>

      <View
        style={[
          Style.sectionContainer,
          {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginBottom: 0,
          },
        ]}
      >
        <Text style={Style.titleText}>Outros locais na sua região</Text>
        {spaceList.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              space={local}
              name={local.titulo}
              photos={local.images}
              address={"Taguatinga sul - QSC 03 Conj F loja 23"}
              rating={{
                value: 5,
                votes: 12,
              }}
              businessHours={[
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "09:00h-20:00h",
                "Fechado",
              ]}
            />
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
}
