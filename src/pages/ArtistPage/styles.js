import { StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#F1F1F1",
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  coverContainer: {},

  coverImage: {
    width: 414,
    height: 115,
  },

  sectionContainer: {
    borderRadius: cw(15),

    backgroundColor: "#FFFFFF",
    paddingHorizontal: cw(47),
    marginBottom: cw(3),

    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  profilePicContainer: {
    width: cw(96),
    height: cw(96),
    borderRadius: cw(48),

    position: "absolute",
    zIndex: 1,
    top: cw(40),
  },

  profilePic: {
    width: cw(96),
    height: cw(96),
    borderRadius: cw(48),
    borderWidth: cw(3),
    borderColor: "#FFFFFF",
  },

  name: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(24),
    color: "#707070",
    marginTop: cw(30),
    //  top: ch(-84),
  },

  followingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderColor: "#019B92",

    width: cw(98),
    height: cw(22),
    borderRadius: cw(46),
  },

  followingButtonText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(12),
    marginHorizontal: 0,
    marginRight: 2,
  },

  chevronDownIcon: {
    top: cw(1.06),
  },

  networkIcon: {
    top: cw(-6),
  },

  dotIcon: {
    top: cw(-7),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: cw(139),

    marginTop: cw(15),
    marginBottom: cw(16),

    // backgroundColor: "#FFFAAA",
  },

  iconButton: {
    width: cw(22),
    height: cw(22),

    borderWidth: cw(1),
    borderRadius: cw(11),
    borderColor: "#019B92",
  },

  talkToMebutton: {
    width: cw(319),
    height: cw(39),
    marginBottom: cw(22),
    backgroundColor: "#019B92",

    borderRadius: cw(50),
    borderWidth: 0,
  },

  talkToMeButtonText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(12),
    color: "#FFFFFF",
  },

  descriptionContainer: {
    // width: cw(320),
    marginBottom: cw(18),
  },

  description: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(13),
    color: "#707070",
    textAlign: "center",
  },

  titleText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(15),
    color: "#707070",

    marginTop: cw(18),
    marginBottom: cw(17),
  },

  socialNetworkButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: cw(126.11),
    marginBottom: cw(27),
  },

  physicalLocationContainer: {
    marginTop: cw(8),
    // backgroundColor: "blue",
    marginBottom: cw(-13.5),
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    marginBottom: cw(15.39),
  },

  locationIcon: {
    marginHorizontal: cw(-8),
  },

  locationTextContainer: {
    marginLeft: cw(15.54),
  },

  locationName: {
    fontFamily: "Raleway_700Bold",
    fontSize: 11,
    color: "#707070",
  },

  myProductsText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(20),
    color: "#019B92",
    marginBottom: cw(21.46),
  },
});
