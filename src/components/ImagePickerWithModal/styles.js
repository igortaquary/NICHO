import { Dimensions, StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default StyleSheet.create({
  darkScreen: {
    // flex: 1,
    height: Dimensions.get("screen").height * 2,
    width: Dimensions.get("screen").width * 1.5,
    position: "absolute",
    left: "-8.5%",
    bottom: "-305%",
    zIndex: 10,
    // right: 0,

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  container: {
    flex: 1,
    // top: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    // elevation: 10,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    justifyContent: "space-evenly",
    width: "100%",
    height: "25%",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // borderWidth: 1,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    paddingVertical: cw(20),
    zIndex: 10,
  },

  button: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // borderBottomWidth: cw(0.2),
    // borderTopWidth: cw(0.2),
    // backgroundColor: "black",

    paddingLeft: cw(25),
  },

  option: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(15),
    color: "#707070",
    marginLeft: cw(10),
  },

  cancel: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: cw(15),
    color: "red",
  },
});
