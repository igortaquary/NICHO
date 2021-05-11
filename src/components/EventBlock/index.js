import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "../Icon";
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
  const onEventClick = async () => {
    const images = []
    images.push(event.image.uri)
    try{
      for (let i = 1; i < 4; i++){
        const url = await firebase.storage().ref('events/' + event.anunciante + '/' + event.titulo + '/' + i).getDownloadURL()
        images.push(url)
      }
    }catch(fail){
      console.log(fail)
    }
    event.image = images
    console.log(event)
    navigation.navigate("Página de Evento", {event})
  }
  return (
    <>
      <Text style={Style.eventName}>{name}</Text>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...Style.iconContainer, top: cw(189) }}
        >
          <Icon name="compartilhar" size={cw(18.18)} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={Style.iconContainer}>
          <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onEventClick}>
          <Image style={Style.additionalEventImage} source={image} />
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

          <Text style={Style.additionalEventLocationTime}>{schedule}</Text>
        </View>
      </View>
    </>
  );
}
