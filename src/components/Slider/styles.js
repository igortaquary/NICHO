import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";

export default StyleSheet.create({
  sliderContainer: {
    width: cw(368),
    height: cw(37),
    marginTop: cw(14),
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: cw(9),
    // borderWidth: cw(1),
  },

  sliderStyle: {
    left: cw(9),
    top: ch(8.4),
  },

  thumbStyle: {
    width: cw(17),
    height: cw(17),
    backgroundColor: "#FFFFFF",
    borderWidth: cw(1),
    borderColor: "#707070",
  },

  trackStyle: {
    width: cw(347),
    height: cw(1),
  },

  labelContainer: {
    // borderWidth: cw(1),
    flexDirection: "row",
    alignSelf: "flex-start",

    top: ch(26.2),
    zIndex: 1,
  },

  label: {
    position: "absolute",
    fontFamily: "Raleway_400Regular",
    fontSize: cw(10),
    color: "#707070",
    alignSelf: "flex-start",

    top: cw(-22),
    left: cw(0),
    marginBottom: cw(0),
    // borderWidth: cw(1),
  },

  lessThanLabel: {
    color: "#C2C2C2",
    top: cw(-11.9),
    // borderWidth: cw(1),
  },

  secondLabel: {
    left: cw(-5),
  },

  thirdLabel: {
    left: cw(-6),
  },

  fourthLabel: {
    left: cw(-6),
  },

  fifthLabel: {
    left: cw(-6),
  },

  sixthLabel: {
    left: cw(-5),
  },

  dottedLine: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderWidth: cw(1),
    borderColor: "#FFFFFF",
    bottom: cw(-7.8),
    left: cw(5),
  },

  circle: {
    position: "absolute",
    top: ch(5.3),
    left: cw(4.5),

    width: cw(3),
    height: cw(3),
    borderRadius: cw(1.5),
    backgroundColor: "#C2C2C2",
  },
});
