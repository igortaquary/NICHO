﻿import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "../Icon";
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default function EventBlock({
  name,
  image,
  date,
  location,
  address,
  schedule,
  onPress,
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
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
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