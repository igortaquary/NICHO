import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";

export default StyleSheet.create({
  dot: {
    width: cw(1),
    height: cw(1),
    marginTop: cw(1),
    backgroundColor: "#707070",
    // borderRadius: 1,
  },
});
