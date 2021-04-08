import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#F1F1F1",
  },

  coverImage: {
    width: "100%",
    height: cw(259),
  },

  sectionContainer: {
    borderRadius: cw(15),
    marginBottom: cw(3),
    paddingLeft: cw(52),
    paddingRight: cw(16),

    backgroundColor: "#FFFFFF",
  },

  eventInfo: {
    flexDirection: "row",
  },

  eventLeftContainer: {
    marginRight: cw(58),
    alignItems: "flex-start",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: cw(19),
  },

  dateText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(14),
    color: "#019B92",

    marginRight: cw(9),
  },

  today: {
    fontFamily: "Raleway_600SemiBold",
    color: "#FF4B26",
    fontSize: cw(12),
  },

  localName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(22),
    color: "#707070",

    marginVertical: cw(7),
  },

  localNeighborhood: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(14),
    color: "#707070",

    marginBottom: cw(1),
  },

  localAddress: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",

    marginBottom: cw(21),
  },

  calendarContainer: {
    width: cw(39),
    height: cw(39),
    borderRadius: cw(19.5),
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F1F1F1",
  },

  addToCalendarContainer: {
    width: cw(68),
    alignItems: "center",
    justifyContent: "center",
  },

  addToCalendarText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(9),
    color: "#707070",
    flexWrap: "wrap",
    textAlign: "center",
  },

  stripe: {
    backgroundColor: "#F1F1F1",
    width: cw(382),
    height: cw(1),

    marginBottom: cw(23),
    left: cw(-36),
  },

  iconAndInfoContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: cw(16),
  },

  map: {
    width: cw(339),
    height: cw(97),

    marginTop: cw(5),
    marginBottom: cw(5),
  },

  attentionTextContainer: {
    alignItems: "center",
    flexDirection: "row",

    paddingLeft: cw(5),
    marginBottom: cw(29),
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

  infoText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",

    marginLeft: cw(17),
  },

  organizerName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(10),
    color: "#707070",
  },

  toggleButtonStyle: {
    paddingLeft: cw(57),
    paddingRight: cw(16.65),
  },

  contentContainerStyle: {
    paddingBottom: 0,
    paddingLeft: cw(58),
    paddingRight: cw(16),
  },

  title: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(15),
    color: "#707070",
  },

  text: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",

    marginTop: cw(1),
    marginBottom: cw(15),
    // marginVertical: cw(15),
    // marginLeft: cw(6),
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",

    marginLeft: cw(1),
  },

  tag: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: cw(1),
    borderRadius: cw(16),
    borderColor: "#F1F1F1",
    height: cw(23),

    marginBottom: cw(21),
    marginRight: cw(4),
  },

  tagText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",
    marginHorizontal: cw(11),
  },

  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: cw(22),
    marginLeft: cw(6),
  },

  organizerPicture: {
    height: cw(62),
    width: cw(62),
    borderRadius: cw(31),
  },

  nameAndButtonContainer: {
    height: cw(62),
    marginLeft: cw(16),
    justifyContent: "space-evenly",
  },

  organizerTitle: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(14),
    color: "#707070",
  },

  followingButton: {
    width: cw(74),
  },

  followingButtonText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(12),
    marginHorizontal: cw(9),
    marginVertical: cw(4),
    color: "#707070",
  },

  greenTitleText: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(16),
    color: "#019B92",

    marginTop: cw(20),
    marginBottom: cw(12),
  },

  eventName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(15),
    color: "#707070",

    marginBottom: cw(7),
  },

  additionalEventImage: {
    width: cw(382),
    height: cw(260),
    borderRadius: cw(10),
  },

  iconContainer: {
    position: "absolute",
    top: cw(222),
    left: cw(344),

    justifyContent: "center",
    alignItems: "center",

    zIndex: 1,
    width: cw(28),
    height: cw(28),
    backgroundColor: "rgba(0,0,0,0.67)",
    borderRadius: cw(14),
  },

  additionalEventInfo: {
    flexDirection: "row",

    marginLeft: cw(3),
    marginBottom: cw(30),
  },

  additionalEventLeftContainer: {
    alignItems: "center",

    marginTop: cw(5),
  },

  dayText: {
    fontFamily: "Raleway_300Light",
    fontSize: cw(39),
    color: "#019B92",
  },

  monthText: {
    fontFamily: "Raleway_700Bold",
    fontSize: cw(12),
    color: "#019B92",
  },

  additionalEventRightContainer: {
    marginLeft: cw(22),
    marginTop: cw(18),
  },

  additionalEventLocationName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(12),
    color: "#707070",

    marginBottom: cw(1),
  },

  additionalEventLocationAddress: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#C4C4C4",

    marginBottom: cw(7),
  },

  additionalEventLocationTime: {
    fontFamily: "Raleway_400Regular",
    fontSize: cw(12),
    color: "#707070",
  },
});
