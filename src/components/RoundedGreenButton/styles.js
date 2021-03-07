import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";

export default StyleSheet.create({
  button: {
    backgroundColor: "#019B92",
    borderRadius: cw(43),

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(12),
    color: "#FFFFFF",
  },
});
