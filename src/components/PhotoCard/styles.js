import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const vpWidth = Dimensions.get('window').width

export const Container = styled.TouchableOpacity`
    margin: 5px;
    width: ${vpWidth *.5 - 15}px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
`;

export const LabelsContainer = styled.View`
    position: absolute;
    bottom: 4px;
    left: 4px;
    width: 12px;
    display: flex;
    flex-direction: column;
`;

/* card: {
    margin: 8,
    width: vpWidth *.5 - 15,
    shadowColor: "#0000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor: 'white',
  borderRadius: 5,
}, */