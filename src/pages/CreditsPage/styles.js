import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
  },

  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: 286,
    height: 452,
    backgroundColor: "white",
    borderRadius: 18,
    paddingTop: 49,
    // paddingBottom: 43,
    paddingBottom: 32,

    marginBottom: 35,
    marginTop: 35.35,
  },

  verticalStripe: {
    height: 92,
    width: 10,
    backgroundColor: "white",
  },

  sectionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "Raleway_700Bold",
    color: "#707070",
    fontSize: 14,
  },

  name: {
    fontFamily: "Raleway_400Regular",
    fontSize: 13,
    color: "#707070",
  },

  thanks: {
    fontFamily: "Raleway_500Medium",
    color: "#00B2B2",
    fontSize: 14,
    textAlign: "center",

    marginTop: 12.57,
  },

  attentionText: {
    // height: 100,
    width: 250,
    fontFamily: "Raleway_300Light",
    fontSize: 13,
    color: "#707070",
    textAlign: "center",
  },
});
