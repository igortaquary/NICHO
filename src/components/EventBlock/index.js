import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "../Icon";
import moment from "moment";
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import * as firebase from "firebase";

export default function EventBlock({
  name,
  image,
  date,
  location,
  address,
  schedule,
  navigation,
  event,
  isList,
  events,
}) {
  const month = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  const scheduleString = moment(schedule).format(
    "dddd, [à partir de] HH:mm[h]"
  );
  const onEventClick = async () => {
    const images = [];
    const recommendations = [];

    for (let i = 0; i < 3; i++) {
      if (events[i].id != event.id) {
        recommendations.push(events[i]);
      } else {
        recommendations.push(events[3]);
      }
    }
    images.push(event.image.uri);
    try {
      for (let i = 1; i < 4; i++) {
        const url = await firebase
          .storage()
          .ref("events/" + event.anunciante + "/" + event.titulo + "/" + i)
          .getDownloadURL();
        images.push(url);
      }
    } catch (fail) {
      console.log(fail);
    }
    event.images = images;
    navigation.navigate("Página de Evento", { event, recommendations });
  };
  return (
    <>
      <Text style={Style.eventName}>{name}</Text>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...Style.iconContainer }}
        >
          <Icon
            name="compartilhar"
            size={cw(18.18)}
            color="#FFFFFF"
            style={{ left: cw(-1) }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={Style.saveIcon}>
          <Icon name="salvar" size={cw(16.5)} color="#707070" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onEventClick}>
          <Image
            style={[Style.additionalEventImage, isList && { height: cw(222) }]}
            source={image}
          />
        </TouchableOpacity>
      </View>
      <View style={Style.additionalEventInfo}>
        <View style={Style.additionalEventLeftContainer}>
          <Text style={Style.dayText}>{date.getDate()}</Text>
          <Text style={Style.monthText}>{month[date.getMonth()]}</Text>
        </View>
        <View style={Style.additionalEventRightContainer}>
          <Text style={Style.additionalEventLocationName}>{location}</Text>

          <Text style={Style.additionalEventLocationAddress}>{address}</Text>

          <Text style={Style.additionalEventLocationTime}>
            {scheduleString[0].toUpperCase() + scheduleString.slice(1)}
          </Text>
        </View>
      </View>
    </>
  );
}
