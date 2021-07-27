import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#F1F1F1",
  },

  backArrowContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: cw(30),
    width: cw(30),
    borderRadius: 17.5,
    marginTop: cw(14.63),
    marginLeft: cw(17),

    backgroundColor: "rgba(0,0,0,0.67)",
    zIndex: 1,
  },

  sectionContainer: {
    borderRadius: cw(15),
    marginBottom: cw(3),
    paddingLeft: cw(34),
    paddingRight: cw(39),

    backgroundColor: "#FFFFFF",
  },

  accordionContainer: {
    borderRadius: cw(10),
  },

  coverImage: {
    width: "100%",
    height: cw(259),
  },

  spaceHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: cw(18),
    marginBottom: cw(15),
  },

  profilePicture: {
    width: cw(87),
    height: cw(87),
    borderRadius: cw(43.5),
  },

  spaceHeaderTextContainer: {
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: cw(13),
  },

  spaceName: {
    fontFamily: "Raleway_700Bold",
    color: "#707070",
    fontSize: cw(20),
  },

  spaceCaption: {
    fontFamily: "Raleway_400Regular",
    fontSize: 9,
    color: "#707070",
    marginLeft: cw(1),
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
    fontSize: 14,
    color: "#019B92",

    marginRight: cw(9),
  },

  localName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 22,
    color: "#707070",

    marginVertical: cw(7),
  },

  localNeighborhood: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#707070",

    marginBottom: cw(1),
  },

  localAddress: {
    fontFamily: "Raleway_400Regular",
    fontSize: 10,
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
    fontSize: 9,
    color: "#707070",
    flexWrap: "wrap",
    textAlign: "center",
  },

  stripe: {
    backgroundColor: "#F1F1F1",
    width: cw(382),
    height: cw(1),
    alignSelf: "flex-start",
    marginBottom: cw(10),
    left: cw(-15),
  },

  iconAndInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: cw(37),
    marginBottom: cw(17),
  },

  miniAccordion: {
    maxWidth: cw(301),
    height: cw(35),
    // backgroundColor: "pink",
    marginTop: cw(5),
    paddingRight: 0,
    paddingLeft: cw(40),

    // top: cw(9),
    // paddingRight: cw(70),
  },

  miniAccordionIcon: {
    left: cw(-13),
  },
  miniAccordionContentContainer: {
    width: cw(315),
    height: cw(130),
    marginBottom: cw(1),
    // left: cw(-39),
  },

  map: {
    width: cw(301),
    height: cw(97),
    left: cw(-8),
  },

  mapAttentionTextContainer: {
    left: cw(-4),
    width: "125%",
  },

  miniAccordionBusinessHoursContentContainer: {
    // width: cw(300),
    height: cw(156),
    left: cw(32),
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderRadius: 0,
  },

  businessHour: {
    fontSize: cw(10),
    color: "#707070",
    fontFamily: "Raleway_400Regular",
    width: cw(65),
    marginRight: cw(26),
  },

  businessHourContainer: {
    flex: 1,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 10,
    color: "#707070",

    marginLeft: cw(17),
    marginRight: cw(12),
  },

  organizerName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 10,
    color: "#707070",
  },

  toggleButtonStyle: {
    paddingLeft: cw(38),
    paddingRight: cw(16.65),
  },

  contentContainerStyle: {
    paddingBottom: cw(14),
    paddingLeft: cw(36),
    paddingRight: cw(38),
    paddingTop: cw(0),
  },

  title: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    color: "#707070",
  },

  text: {
    fontFamily: "Raleway_400Regular",
    fontSize: 10,
    color: "#707070",
    width: cw(340),

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

    marginBottom: cw(5),
    marginRight: cw(4),
  },

  tagText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 10,
    color: "#707070",
    marginHorizontal: cw(11),
  },

  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
    width: cw(390),

    paddingBottom: cw(30),
    paddingLeft: cw(25),
    paddingRight: cw(0),
    paddingTop: cw(5),
  },

  image: {
    width: cw(115),
    height: cw(82),
    borderRadius: cw(12),
  },
  eventImagesContainer: {
    paddingLeft: cw(14),
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: cw(20),
  },
  eventHeader: {
    marginBottom: cw(6),
    marginLeft: cw(5),
  },

  eventDateContainer: {
    flexDirection: "row",
  },

  eventDateText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 8,
    color: "#019B92",
  },

  today: {
    fontFamily: "Raleway_400Regular",
    color: "#FF4B26",
    fontSize: cw(8),
    marginLeft: cw(4),
  },

  eventName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 12,
    color: "#707070",
  },

  eventCover: {
    width: cw(242),
    height: cw(165),
    borderRadius: cw(10),
  },

  additionalEventImage: {
    width: cw(382),
    height: cw(260),
    borderRadius: cw(10),
  },

  iconContainer: {
    position: "absolute",
    top: cw(212.31),
    left: cw(370.17),

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
    fontSize: 39,
    color: "#019B92",
  },

  monthText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 12,
    color: "#019B92",
  },

  additionalEventRightContainer: {
    marginLeft: cw(22),
    marginTop: cw(18),
  },

  additionalEventLocationName: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 12,
    color: "#707070",

    marginBottom: cw(1),
  },

  additionalEventLocationAddress: {
    fontFamily: "Raleway_400Regular",
    fontSize: 10,
    color: "#C4C4C4",

    marginBottom: cw(7),
  },

  additionalEventLocationTime: {
    fontFamily: "Raleway_400Regular",
    fontSize: 12,
    color: "#707070",
  },

  additionalEventShareIcon: {
    width: cw(35),
    height: cw(35),
    borderRadius: 17.5,
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    bottom: cw(8),
    right: cw(8),
    backgroundColor: "rgba(0,0,0,0.67)",
  },

  additionalEventSaveIcon: {
    alignSelf: "center",
    marginLeft: cw(19.26),
    top: cw(10.88),
  },
});
