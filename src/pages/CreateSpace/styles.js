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
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    width: cw(155),
    height: cw(18),
    top: cw(15),
    right: cw(15),
    borderRadius: cw(7),
    paddingRight: cw(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9,
  },

  coverErrorMessageStyle: {
    position: "absolute",
    alignSelf: "center",
    top: cw(264),
    zIndex: 6,
  },

  profilePictureContainer: {
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    top: cw(82),
    zIndex: 9,
    // backgroundColor: "blue"
  },

  profilePicturePlaceholder: {
    width: cw(158),
    height: cw(158),
    borderRadius: cw(79),
    borderWidth: cw(3),
    borderColor: "#FFFFFF",
    backgroundColor: "#C4C4C4",
  },

  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: cw(79),
  },

  addProfilePictureButton: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: cw(12),
  },

  backgroundStyle: {
    top: 0,
  },

  addProfilePictureText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(12),
    color: "#019B92",

    marginLeft: cw(3),
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

  establishmentNameInput: {
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
    marginRight: cw(9),
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
    marginBottom: cw(15),
  },

  caption: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(13),
    color: "#707070",
  },

  daysButtonsContainer: {
    minWidth: cw(349),
    height: cw(64),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "baseline",
    alignContent: "space-between",
    marginBottom: cw(23),

    // backgroundColor: "blue",
  },

  dayButton: {
    width: cw(82),
    height: cw(26),
    justifyContent: "center",
    alignItems: "center",
    marginRight: cw(4.01999999),
  },

  dayButtonText: {
    fontSize: cw(10),
    marginHorizontal: 0,
  },

  timeInputRow: {
    flexDirection: "row",

    alignItems: "center",
    marginTop: cw(3),
    marginLeft: cw(1),
  },

  fromToText: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: cw(12),
    color: "#707070",

    marginRight: cw(4),
  },

  timeField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: cw(28),
    width: cw(133),
    borderRadius: cw(8),
    backgroundColor: "#F1F1F1",
  },

  timeText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(16),
    color: "#707070",
  },

  colons: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: cw(19),
    color: "#707070",
  },

  addDateButton: {
    alignSelf: "center",
    marginTop: cw(25),
    marginBottom: cw(31),
    marginLeft: cw(-16),
  },

  addDateText: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
    color: "#707070",
    alignSelf: "center",

    // marginBottom: cw(31),
    // marginLeft: cw(-16),
  },

  contactContainer: {
    height: cw(108),
    justifyContent: "space-between",
    marginTop: cw(11),
    marginBottom: cw(26),
  },

  contactField: {
    flexDirection: "row",
    width: cw(344),
    height: cw(28),
    borderRadius: cw(8),
    alignItems: "center",
    paddingHorizontal: cw(8),
    backgroundColor: "#F1F1F1",
  },

  contactIcon: {
    marginRight: cw(8),
  },

  contactInput: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(14),
    color: "#707070",
    flex: 1,
  },

  detailsInput: {
    fontFamily: "Raleway_500Medium",
    fontSize: cw(13),
    textAlignVertical: "top",

    width: cw(344),
    height: cw(130),
    borderRadius: cw(12),

    marginTop: cw(8),
    marginBottom: cw(30),
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
    // marginRight: cw(10),
  },

  categoryButtonText: {
    fontSize: cw(10),
    alignSelf: "center",
    // marginHorizontal: cw(5.17),
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
