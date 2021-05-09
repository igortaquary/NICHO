import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#F1F1F1",
    // justifyContent: "flex-end",
    // flex: 1,
  },

  coverText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    alignSelf: "center",
    position: "absolute",
    width: cw(155),
    top: cw(163),
    flexDirection: "row",
    borderRadius: cw(7),
    paddingRight: cw(1.5),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },

  sectionContainer: {
    borderRadius: cw(15),
    marginBottom: cw(3),
    paddingLeft: cw(30),
    paddingRight: cw(34.62),

    backgroundColor: "#FFFFFF",
  },

  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(15),
    color: "#707070",
  },

  eventNameInput: {
    width: cw(344),
    height: cw(28),
    marginTop: cw(8),
    marginRight: cw(0.38),
    marginLeft: cw(5),
    marginBottom: cw(35),
    paddingHorizontal: cw(18),
    borderRadius: cw(8),

    backgroundColor: "#F1F1F1",

    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
  },

  errorMessage: {
    marginLeft: cw(5),
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(13),
    color: "red",
  },

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
    height: cw(165),
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

  captionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: cw(24),
    marginBottom: cw(20),
  },

  caption: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(13),
    color: "#707070",
  },

  scheduleDateHourContainer: {
    flexDirection: "row",

    alignItems: "center",
    marginTop: cw(3),
    marginBottom: cw(25),
    marginLeft: cw(1),
  },

  fromToText: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: cw(12),
    color: "#707070",

    marginRight: cw(8),
  },

  scheduleInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: cw(28),
    width: cw(115),
    borderRadius: cw(8),
    backgroundColor: "#F1F1F1",
  },

  datetime: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(16),
    color: "#707070",
  },

  bars: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(19),
    color: "#707070",
  },

  colons: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: cw(19),
    color: "#707070",
  },

  addDateText: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
    color: "#707070",

    marginRight: cw(119.38),
    marginBottom: cw(29),
    marginLeft: cw(98),
  },

  detailsInput: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
    textAlignVertical: "top",

    width: cw(344),
    height: cw(130),
    borderRadius: cw(12),

    marginTop: cw(8),
    marginBottom: cw(38),
    paddingVertical: cw(17),
    paddingHorizontal: cw(15),

    backgroundColor: "#F1F1F1",
  },

  categoriesContainer: {
    maxWidth: cw(341.38),

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    // alignContent: "space-around",

    // backgroundColor: "red",
    marginTop: cw(15),
    marginBottom: cw(30.85),
    marginLeft: cw(8),
  },

  categoryButton: {
    // maxWidth: cw(76.52),
    justifyContent: "center",
    alignItems: "center",
    height: cw(25.93),
    marginBottom: cw(8.15),
    // marginRight: cw(3.56),
  },

  categoryButtonText: {
    fontSize: cw(10),
    alignSelf: "center",
    // marginHorizontal: cw(5.17),
  },

  freeEventText: {
    alignSelf: "center",
    fontFamily: "Raleway_700Bold",
    fontSize: cw(15),
    color: "#707070",
  },

  organizerContainer: {
    flexDirection: "row",
    width: cw(340),
    height: cw(32),
    alignItems: "center",

    borderRadius: 12,
    backgroundColor: "#F1F1F1",

    marginBottom: cw(14),
    marginLeft: cw(4),
    paddingLeft: cw(8),
    paddingRight: cw(8),
  },

  addRemoveOrganizer: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(38),
    color: "#019B92",

    marginRight: cw(8),
  },

  organizerInput: {
    flex: 1,
    fontFamily: "Raleway_400Regular",
    fontSize: cw(14),
    color: "#707070",
  },

  organizerName: {
    flex: 1,
    fontFamily: "Raleway_400Regular",
    fontSize: cw(14),
    color: "#707070",
  },

  saveButton: {
    width: cw(341),
    height: cw(46),
    borderRadius: cw(43),
    backgroundColor: "#019B92",

    marginBottom: cw(15),
    marginLeft: cw(4),
  },

  cancel: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(14),
    color: "#AEAEAE",
    alignSelf: "center",

    marginBottom: cw(32),
  },

  saveButtonText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(16),
    color: "#FFFFFF",
  },
});
