import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";
import Style from "./styles";

export default function RoundIconButton({ width = cw(28), ...props }) {
  return (
    <TouchableOpacity style={Style.button} onPress={props.onPress}>
      <View
        style={
          props.active
            ? {
                ...Style.iconContainer,
                width,
                height: width,
                borderColor: "#019B92",
              }
            : { ...Style.iconContainer, width, height: width }
        }
      >
        <Image source={props.icon} />
      </View>
      <Text
        style={props.active ? [Style.text, Style.selectedText] : Style.text}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
