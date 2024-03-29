import React from 'react'
import { useState } from 'react';
import { ScrollView, Image, View, Dimensions, Text } from 'react-native';
import Icon from '../../components/Icon';
import { 
  Container, 
  Carousel, 
  Indicator, 
  CurrentIndicator,
  LeftFixedIcons,
  RightFixedIcons,
  IconContainer,
  IconContainer2
} from './styles';

const ProductCarousel = ({ data, onSavePress, preco, onChatPress, onImagePress }) => {

  const [currentImage, setCurrentImage] = useState(0);

  const handleScroll = ({ nativeEvent }) => {
    const current = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (current != currentImage) {
      setCurrentImage(current);
    }
  }

  return (
    <Container>
      <Carousel>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={handleScroll}
          style={{ height: 450, width: Dimensions.get('window').width, flexDirection: 'row' }}
        >
          {data.map((item, index) => (
            <Image source={{ uri: item.url || item.uri || item}} key={index} style={{ flex: 1, width: Dimensions.get('window').width }} />
          ))}
        </ScrollView>
        <LeftFixedIcons>
          <Text style={{padding: 10, color: 'white', backgroundColor: 'rgba(0,0,0,0.67)', borderRadius: 50, marginBottom: 10}}>R$ {preco}</Text>
          <IconContainer onPress={onChatPress}>
            <Icon name="chat" size={16} color="black" style={{}} />
          </IconContainer>
        </LeftFixedIcons>
        <RightFixedIcons>
          <IconContainer2 style={{backgroundColor: 'rgba(0,0,0,0.67)'}}>
           <Icon name="compartilhar" size={16} color="white" />
          </IconContainer2>
          <IconContainer onPress={onSavePress} style={{backgroundColor: 'rgba(0,0,0,0.67)'}}>
            <Icon name="salvar" size={16} color="white" />
          </IconContainer>
        </RightFixedIcons>
      </Carousel>
      <Indicator>
        {data.map((i, index) => (
          <CurrentIndicator key={index} style={{ backgroundColor: index == currentImage ? '#707070' : 'transparent' }}></CurrentIndicator>
        ))}
      </Indicator>
    </Container>
  )
}

export default ProductCarousel;
