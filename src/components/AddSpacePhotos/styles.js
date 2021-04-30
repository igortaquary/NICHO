import { Dimensions, StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default StyleSheet.create({
  container: {},

  addPhotosContainer: {
    flexDirection: "row",

    marginTop: cw(10),
    marginBottom: cw(48),
    marginLeft: cw(4),
  },

  addPhoto: {
    height: cw(82),
    backgroundColor: "#C2C2C2",
    borderRadius: cw(12),
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(15),
    color: "#707070",
  },

  errorMessage: {
    marginLeft: cw(5),
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(13),
    color: "red",
    marginTop: cw(10),
  },
});
