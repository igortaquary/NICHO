import React from "react";
import { View } from "react-native";

import Style from "./styles";

// Setting dotted style for just one border was broken in RN
export default function DottedLine(props) {
  const initialArr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const dottedLine = initialArr.map((dot) => (
    <View style={Style.dot} key={dot.id} />
  ));
  return <View style={props.style}>{dottedLine}</View>;
}
