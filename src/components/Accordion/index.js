import React, { useRef, useState } from "react";
import { Container, ToogleButton, ToggleButtonText, Content } from "./styles";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
// import {Animated} from 'react-native';
// import {Transition, Transitioning} from 'react-native-reanimated';

// const transition = (
//   <Transition.Together>
//     <Transition.In type='slide-bottom' durationMs={200} />
//     <Transition.Change />
//     <Transition.Out type='slide-bottom' durationMs={200} />
//   </Transition.Together>
// )

const Accordion = ({
  children,
  title,
  textStyle,
  toggleButtonStyle,
  contentContainerStyle,
}) => {
  const [isToggled, setToggled] = useState(false);
  // const ref = useRef();

  const toggle = () => {
    // ref.current.animateNextTransition();
    setToggled(!isToggled);
  };

  return (
    <Container
    // ref={ref}
    // transition={transition}
    >
      <ToogleButton
        style={toggleButtonStyle}
        onPress={() => {
          toggle();
        }}
      >
        <ToggleButtonText
          style={{
            fontFamily: isToggled ? "Raleway_700Bold" : "Raleway_400Regular",
            ...textStyle,
          }}
        >
          {title}
        </ToggleButtonText>
        <View
          style={{ transform: [{ rotate: isToggled ? "0deg" : "180deg" }] }}
        >
          <Feather name="chevron-down" size={21} color="#707070" />
        </View>
      </ToogleButton>
      {isToggled && <Content style={contentContainerStyle}>{children}</Content>}
    </Container>
  );
};

export default Accordion;
