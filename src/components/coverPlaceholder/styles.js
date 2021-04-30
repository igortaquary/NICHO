import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  cover: {
    width: Dimensions.get("window").width,
    height: cw(199),
    flexGrow: 1,

    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: "transparent",
  },

  text: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(14),
    color: "#FFFFFF",

    marginLeft: cw(3.62),
  },

  errorMessage: {
    left: cw(3.5),
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(13),
    color: "red",
    textAlign: "center",

    marginVertical: cw(5),
  },
  imageButton: {
    // flexGrow: 1,
    width: Dimensions.get("window").width,
    height: cw(199),
  },
  image: {
    // flexGrow: 1,
    width: Dimensions.get("window").width,
    height: cw(199),
    // top: -162,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    backgroundColor: "transparent",
    width: cw(150),
    height: cw(150),
  },
});
