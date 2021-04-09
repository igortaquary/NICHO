import React from 'react'
import { useState } from 'react';
import { ScrollView, Image, View, Dimensions, Text } from 'react-native';
import Icon from '../../components/Icon';
import { 
  Container, 
  Carousel, 
  Indicator, 
  CurrentIndicator,
  EditButton,
  RightFixedIcons,
  IconContainer
} from './styles';
import * as ImagePicker from 'expo-image-picker';

const CreateProductCarousel = ({ data }) => {

  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (image) => {
    data[currentImage].url = image;
    setCurrentImage(currentImage);
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erro','Desculpe, precisa permitir o acesso às suas fotos para isso!');
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.5,
          });
          if (!result.cancelled) {
            setCurrentImage(4);
            handleImageChange(result.uri);
          }
        }
  }

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
          style={{ height: 300, width: 300, flexDirection: 'row', flex: 1 }}
        >
          {data.map((item) => (
            <Image source={{ uri: item.url }} key={item.id} style={{ flex: 1, width: 300, backgroundColor: item.color }} />
          ))}
        </ScrollView>
        <EditButton >
          <IconContainer onPress={pickImage}>
            <Icon name="lapis" size={20} color="white" style={{}} />
          </IconContainer>
        </EditButton>
      </Carousel>
      <Indicator>
        {data.map((i, index) => (
          <CurrentIndicator key={index} style={{ backgroundColor: index == currentImage ? '#707070' : 'transparent' }}></CurrentIndicator>
        ))}
      </Indicator>
    </Container>
  )
}

export default CreateProductCarousel;
