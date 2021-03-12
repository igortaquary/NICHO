import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function ConvertWidth(px) {
  return wp(`${(px * 100) / 414}%`);
}

export function ConvertHeight(px) {
  return hp(`${(px * 100) / 849}%`);
}
