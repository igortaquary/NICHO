import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Style from "./styles";

export default function RoundedButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={
        props.active
          ? [Style.normalButton, Style.selectedButton]
          : [Style.normalButton]
      }
      onPress={props.onPress}
    >
      <Text
        numberOfLines={1}
        style={
          props.active
            ? [Style.normalText, Style.selectedText]
            : Style.normalText
        }
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
