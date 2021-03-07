import { StyleSheet } from "react-native";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../../components/Converter";

export default StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: cw(15),
    overflow: "scroll",
    alignItems: "center",
  },

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

    width: cw(344.84),
    //width: 341,
    left: cw(4),
    justifyContent: "space-between",
    // borderWidth: cw(1),
    marginBottom: cw(9),
    marginTop: cw(17),
    //marginLeft: 24,
    // marginRight: 19.16,
  },

  secondLineCategoriasContainer: {
    flexDirection: "row",
    //  borderWidth: 1,
    width: cw(351),
    marginBottom: cw(6),
    justifyContent: "space-between",

    //marginLeft: 24,
    // marginRight: 19.16,
  },

  firstLineRegioesContainer: {
    width: cw(327.39),
    marginTop: cw(14),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondLineRegioesContainer: {
    width: cw(311.49),
    marginTop: cw(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  thirdLineRegioesContainer: {
    width: cw(305.92),
    marginTop: cw(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  fourthLineRegioesContainer: {
    width: cw(258.18),
    marginTop: cw(10),
    marginBottom: cw(3),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  firstLineMateriaPrimaContainer: {
    width: cw(341),
    marginTop: cw(13),

    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondLineMateriaPrimaContainer: {
    width: cw(352),
    marginTop: cw(9),

    flexDirection: "row",
    justifyContent: "space-between",
  },

  thirdLineMateriaPrimaContainer: {
    width: cw(279),
    marginTop: cw(9),

    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    marginTop: cw(36),
    left: cw(9),

    alignSelf: "flex-start",
    fontFamily: "Raleway_700Bold",
    color: "#707070",
    fontSize: cw(14),
  },

  greenButtonContainer: {
    marginTop: cw(40),
    marginBottom: cw(35),
  },

  stripe: {
    width: cw(414),
    height: cw(1),
    top: cw(45),

    backgroundColor: "#F1F1F1",
  },
});
