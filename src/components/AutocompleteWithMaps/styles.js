import { Dimensions, StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default StyleSheet.create({
  locationInput: {
    width: cw(344),
    height: cw(28),
    marginTop: cw(16),
    marginRight: cw(0.38),
    marginLeft: cw(5),
    marginBottom: cw(22),
    paddingHorizontal: cw(18),
    borderRadius: cw(8),

    backgroundColor: "#F1F1F1",

    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
  },

  errorMessage: {
    top: cw(-14),
    marginLeft: cw(5),
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(13),
    color: "red",
  },
  autocompleteRowText: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
  },

  autocompleteListView: {
    position: "absolute",
    borderRadius: cw(5),
    // paddingBottom: 30,
    width: cw(344),
    marginLeft: cw(5),
    // flexShrink: 1,
    top: cw(44),
    backgroundColor: "#EAEAEA",
    zIndex: 10,
  },

  autocompleteRow: {
    // position: "absolute",
    backgroundColor: "transparent",

    // height: 100,

    // borderRadius: cw(10),
  },

  locationNameAddress: {
    marginLeft: cw(15.54),
    marginBottom: cw(12.39),
  },

  placeName: {
    color: "#707070",
    fontFamily: "Raleway_700Bold",
    fontSize: cw(11),
  },

  placeAddress: {
    color: "#707070",
    fontFamily: "Raleway_400Regular",
    fontSize: cw(11),
  },

  checkboxContainer: {
    flexDirection: "row",
    marginLeft: cw(8),
    marginBottom: cw(18),
  },

  checkbox: {
    marginRight: cw(8),
    justifyContent: "center",
    alignItems: "center",
  },

  useMapsText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(13),
    color: "#707070",
  },

  iconAddressContainer: {
    width: cw(344),
    minHeight: cw(165),
    paddingHorizontal: cw(16),
    paddingTop: cw(14),
    paddingBottom: cw(15),
    marginBottom: cw(18),
    marginLeft: cw(5),

    borderWidth: cw(1),
    borderRadius: cw(8),
    borderColor: "#C2C2C2",
  },

  addLocation: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
    color: "#707070",

    alignSelf: "center",
    marginBottom: cw(27),
  },

  stripe: {
    backgroundColor: "#F1F1F1",
    width: cw(382),
    height: cw(1),

    alignSelf: "center",
    marginBottom: cw(24),
    // left: cw(-36),
  },

  map: {
    width: cw(339),
    height: cw(97),

    marginTop: cw(5),
    marginBottom: cw(5),
  },

  poweredContainer: {
    minHeight: cw(23),
    // height: cw(23),
    maxHeight: cw(27),
    alignItems: "flex-start",

    paddingTop: cw(3),
    paddingBottom: cw(3),

    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,

    backgroundColor: "#AEAEAE",
  },
});
