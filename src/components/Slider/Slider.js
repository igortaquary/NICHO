import React, { useState } from "react";
import { View, Text } from "react-native";
import DottedLine from "./../DottedLine/DottedLine";
import { Slider as SliderRNE } from "react-native-elements";
import Style from "./styles";
import { ConvertWidth as cw, ConvertHeight as ch } from "./../Converter";

export default function Slider() {
  const [sliderValue, setSliderValue] = useState(1);
  // const [step, setStep] = useState(1);

  return (
    <>
      <View style={Style.sliderContainer}>
        <View style={Style.labelContainer}>
          <Text style={[Style.label]}>-R$10</Text>
          {sliderValue > 10 && <DottedLine style={Style.dottedLine} />}

          <View style={{ left: cw(71) }}>
            {sliderValue > 50 ? (
              <>
                <Text style={[Style.label, Style.secondLabel]}>R$50</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : sliderValue == 50 ? (
              <Text style={[Style.label, Style.secondLabel]}>R$50</Text>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.secondLabel]}
              >
                R$50
              </Text>
            )}
          </View>
          <View style={{ left: cw(138.2) }}>
            {sliderValue > 100 ? (
              <>
                <Text style={[Style.label, Style.thirdLabel]}>R$100</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : sliderValue == 100 ? (
              <Text style={[Style.label, Style.thirdLabel]}>R$100</Text>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.thirdLabel]}
              >
                R$100
              </Text>
            )}
          </View>
          <View style={{ left: cw(205.7) }}>
            {sliderValue > 150 ? (
              <>
                <Text style={[Style.label, Style.fourthLabel]}>R$150</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : sliderValue == 150 ? (
              <Text style={[Style.label, Style.fourthLabel]}>R$150</Text>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.fourthLabel]}
              >
                R$150
              </Text>
            )}
          </View>
          <View style={{ left: cw(272.8) }}>
            {sliderValue > 200 ? (
              <>
                <Text style={[Style.label, Style.fifthLabel]}>R$200</Text>
                <DottedLine style={Style.dottedLine} />
              </>
            ) : sliderValue == 200 ? (
              <Text style={[Style.label, Style.fifthLabel]}>R$200</Text>
            ) : (
              <Text
                style={[Style.label, Style.lessThanLabel, Style.fifthLabel]}
              >
                R$200
              </Text>
            )}
          </View>
          <View style={{ left: cw(350) }}>
            {sliderValue >= 250 ? (
              <Text style={[Style.label, Style.sixthLabel]}>R$250+</Text>
            ) : sliderValue == 250 ? (
              <Text style={[Style.label, Style.sixthLabel]}>R$250</Text>
            ) : (
              <>
                <Text
                  style={[Style.label, Style.lessThanLabel, Style.sixthLabel]}
                >
                  R$250+
                </Text>
                <View style={Style.circle} />
              </>
            )}
          </View>
        </View>
        <SliderRNE
          animationType={"spring"}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          step={10}
          minimumValue={10}
          maximumValue={250}
          minimumTrackTintColor="#707070"
          maximumTrackTintColor="rgba(194, 194, 194, 0.85)"
          allowTouchTrack={false}
          thumbStyle={Style.thumbStyle}
          trackStyle={Style.trackStyle}
          style={Style.sliderStyle}
        ></SliderRNE>
      </View>
      <Text>R${sliderValue}</Text>
    </>
  );
}
