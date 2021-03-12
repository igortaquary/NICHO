import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";
import Style from "./styles";

export default function RoundedButton({ children, ...props }) {
  return (
    <TouchableOpacity
      //activeOpacity={0.85}
      style={
        props.active
          ? [Style.normalButton, Style.selectedButton, props.style]
          : [Style.normalButton, props.style]
      }
      onPress={props.onPress}
    >
      <Text
        numberOfLines={1}
        style={
          props.active
            ? [Style.normalText, Style.selectedText, props.textStyle]
            : [Style.normalText, props.textStyle]
        }
      >
        {props.text}
      </Text>
      {children}
    </TouchableOpacity>
  );
}
