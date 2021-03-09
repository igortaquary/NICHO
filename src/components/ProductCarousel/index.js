import React from 'react'
import { useState } from 'react';
import { ScrollView, Image, View, Dimensions, Text } from 'react-native';
import { Feather, Ionicons   } from '@expo/vector-icons';
import { 
  Container, 
  Carousel, 
  Indicator, 
  CurrentIndicator,
  LeftFixedIcons,
  RightFixedIcons,
  Icon
} from './styles';

const ProductCarousel = ({ data }) => {

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
          {data.map((item) => (
            <Image source={{ uri: item.url }} key={item.id} style={{ flex: 1, width: Dimensions.get('window').width, backgroundColor: item.color }} />
          ))}
        </ScrollView>
        <LeftFixedIcons>
          <Text style={{padding: 10, color: 'white', backgroundColor: 'rgba(0,0,0,0.67)', borderRadius: 50, marginBottom: 10}}>R$ 40 a 50</Text>
          <Icon>
            <Feather name="shopping-bag" size={16} color="black" style={{}} />
          </Icon>
        </LeftFixedIcons>
        <RightFixedIcons>
          <Icon style={{backgroundColor: 'rgba(0,0,0,0.67)'}}>
           <Ionicons name="ios-git-network-outline" size={16} color="white" />
          </Icon>
          <Icon style={{backgroundColor: 'rgba(0,0,0,0.67)'}}>
            <Ionicons name="md-bookmark-outline" size={16} color="white" />
          </Icon>
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
