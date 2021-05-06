﻿import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";
import Style from "./styles";

export default function RoundedButton({
  activeOpacity = 0.2,
  children,
  active,
  style,
  textStyle,
  onPress,
  onPressIn,
  onPressOut,
  text,
}) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={
        active
          ? [Style.normalButton, Style.selectedButton, style]
          : [Style.normalButton, style]
      }
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
    >
      <Text
        numberOfLines={1}
        style={
          active
            ? [Style.normalText, Style.selectedText, textStyle]
            : [Style.normalText, textStyle]
        }
      >
        {text}
      </Text>
      {children}
    </TouchableOpacity>
  );
}
