import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default StyleSheet.create({
  callout: {
    // position: "absolute",

    // flexShrink: 1,
    left: cw(3),
    top: ch(2.3),
    // width: "120%",
    // height: "120%",
    width: cw(150),
    minHeight: cw(60),
    zIndex: 2,
    elevation: 2,
  },

  calloutText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(13),
    color: "#C50000",

    // flexShrink: 1,
    // backgroundColor: "yellow",
  },

  etaText: {
    fontFamily: "Raleway_600SemiBold",
    color: "#2F7CE2",
    fontSize: cw(11),
  },

  attentionTextContainer: {
    alignItems: "center",

    flexDirection: "row",

    // paddingLeft: cw(5),
    // marginBottom: cw(29),
  },

  attention: {
    width: cw(4),
    height: cw(4),
    borderRadius: cw(2),
    marginRight: cw(3),

    backgroundColor: "#019B92",
  },

  noteText: {
    fontSize: cw(9),
    fontFamily: "Raleway_300Light",
    color: "#707070",
    // backgroundColor: "#1111ff",
  },
});
