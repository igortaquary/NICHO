import { StyleSheet } from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: cw(20),
  },

  iconContainer: {
    borderWidth: cw(1),
    borderRadius: cw(10),
    borderColor: "#F1F1F1",

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "Raleway_400Regular",
    fontSize: 11,
    color: '#707070',

    marginLeft: cw(7),
  },

  selectedText: {
    color: "#019B92",
    fontFamily: 'Raleway_600SemiBold',
    // fontWeight: '600',
  },
});
