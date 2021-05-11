import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default StyleSheet.create({
  normalButton: {
    backgroundColor: "#FFFFFF",
    margin: cw(5),
    height: cw(23),

    justifyContent: "center",
    alignItems: "center",

    borderWidth: cw(1),
    borderRadius: cw(16),
    borderColor: "#F1F1F1",
  },

  selectedButton: {
    borderColor: "#019B92",
  },

  normalText: {
    fontFamily: "Raleway_400Regular",
    color: "#707070",

    fontSize: cw(10),
    marginHorizontal: cw(7),
  },

  selectedText: {
    color: "#019B92",
    fontFamily: "Raleway_700Bold",
  },
});
