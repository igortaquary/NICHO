import React, { useState } from "react";
import { View, Text } from "react-native";
import DottedLine from "./../DottedLine/DottedLine";
import { Slider as SliderRNE } from "react-native-elements";
import Style from "./styles";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";
import { set } from "react-native-reanimated";

export default function Slider() {
  const [sliderValue, setSliderValue] = useState(1);
  const [step, setStep] = useState(1);
  function changeStep(value) {
    if (sliderValue == 12) {
      setStep(2);
    }
    setSliderValue(value);
    if (sliderValue < 10) {
      setStep(1);
    } else {
      if (sliderValue >= 10) {
        setStep(1);
      }
    }

    if (sliderValue == 11) {
      setStep(1);
    }

    console.log(step);
  }

  return (
    <>
      <View style={Style.sliderContainer}>
        <View style={Style.labelContainer}>
          <Text style={[Style.label]}>1kg</Text>
          {sliderValue > 1 && <DottedLine style={Style.dottedLine} />}

          <View style={{ left: cw(71) }}>
            {sliderValue > 10 ? (
              <>
                <Text style={[Style.label, Style.secondLabel]}>10kg</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.secondLabel]}
              >
                10kg
              </Text>
            )}
          </View>
          <View style={{ left: cw(138.2) }}>
            {sliderValue > 20 ? (
              <>
                <Text style={[Style.label, Style.thirdLabel]}>20kg</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.thirdLabel]}
              >
                20kg
              </Text>
            )}
          </View>
          <View style={{ left: cw(205.7) }}>
            {sliderValue > 30 ? (
              <>
                <Text style={[Style.label, Style.fourthLabel]}>30kg</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.fourthLabel]}
              >
                30kg
              </Text>
            )}
          </View>
          <View style={{ left: cw(272.8) }}>
            {sliderValue > 40 ? (
              <>
                <Text style={[Style.label, Style.fifthLabel]}>40kg</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.fifthLabel]}
              >
                40kg
              </Text>
            )}
          </View>
          <View style={{ left: cw(350) }}>
            {sliderValue >= 50 ? (
              <Text style={[Style.label, Style.sixthLabel]}>50kg+</Text>
            ) : (
              <>
                <Text
                  style={[Style.label, Style.lessThanLabel, Style.sixthLabel]}
                >
                  50kg+
                </Text>
                <View style={Style.circle} />
              </>
            )}
          </View>
        </View>
        <SliderRNE
          animationType={"spring"}
          value={sliderValue}
          //   onValueChange={(value) => setSliderValue(value)}
          step={step}
          onValueChange={(value) => changeStep(value)}
          minimumValue={1}
          maximumValue={50}
          minimumTrackTintColor="#707070"
          maximumTrackTintColor="rgba(194, 194, 194, 0.85)"
          allowTouchTrack={false}
          thumbStyle={Style.thumbStyle}
          trackStyle={Style.trackStyle}
          style={Style.sliderStyle}
        ></SliderRNE>
      </View>
      <Text>{sliderValue}</Text>
    </>
  );
}
