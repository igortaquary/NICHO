import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";
import Style from "./styles";

export default function RoundedGreenButton({
  width = cw(381),
  height = cw(46),
  ...props
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={Array}
      style={{ ...Style.button, width, height }}
    >
      <Text style={Style.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}
