import { Dimensions, StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default StyleSheet.create({
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
    width: cw(35),
    height: cw(35),
    backgroundColor: "rgba(0,0,0,0.67)",
    borderRadius: cw(17.5),
  },

  saveIcon: {
    position: "absolute",
    top: cw(248.88),
    left: cw(352),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  additionalEventInfo: {
    flexDirection: "row",

    marginLeft: cw(3),
    marginBottom: cw(15),
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
