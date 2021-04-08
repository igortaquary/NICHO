import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#F1F1F1",
  },

  sectionContainer: {
    borderRadius: cw(15),

    marginBottom: cw(3),
    paddingHorizontal: cw(16),

    backgroundColor: "#FFFFFF",
  },

  titleText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(16),
    color: "#019B92",

    marginTop: cw(24),
    marginBottom: cw(12),
  },

  stripe: {
    backgroundColor: "#F1F1F1",
    width: "100%",
    height: cw(1),

    marginTop: cw(2),
    marginBottom: cw(21),
  },

  spaceName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(15),
    color: "#707070",

    marginBottom: cw(7),
  },

  photosContainer: {
    // width: cw(882),
    justifyContent: "space-between",

    // overflow: "scroll",
  },

  photo: {
    width: cw(292),
    height: cw(222),

    borderRadius: cw(12),

    marginLeft: cw(3),
  },

  iconContainer: {
    position: "absolute",
    top: cw(263.7),
    left: cw(370),
    marginRight: cw(16),
    marginBottom: cw(10),

    justifyContent: "center",
    alignItems: "center",

    zIndex: 1,
    width: cw(28),
    height: cw(28),
    backgroundColor: "rgba(0,0,0,0.67)",
    borderRadius: cw(14),
  },

  addressRatingContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: cw(11),
  },

  addressText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(12),
    color: "#707070",

    marginRight: cw(4),
  },

  ratingVotesText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",

    marginLeft: cw(4.77),
  },

  businessHoursText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#C4C4C4",

    marginTop: cw(4),
    marginBottom: cw(19),
  },

  businessHoursTextDay: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(10),
  },
});
