import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";

export default StyleSheet.create({
  principaisButtonsContainer: {
    width: cw(356),
    left: cw(9),
    marginTop: cw(11),
    //  borderWidth: cw(1),  // para debuggar vendo o container

    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
  },

  firstLineCategoriasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: cw(344.84),
    left: cw(4),

    // borderWidth: cw(1),
    marginBottom: cw(9),
    marginTop: cw(17),
  },

  secondLineCategoriasContainer: {
    flexDirection: "row",
    width: cw(351),
    marginBottom: cw(6),
    justifyContent: "space-between",
    //  borderWidth: 1,
  },
});
