import React, {useState, useRef} from 'react'
import { ScrollView, Image, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import { Feather } from '@expo/vector-icons';
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

const CreateProductCarousel = ({ images, setImages }) => {

  const [currentImage, setCurrentImage] = useState(0);

  const scrollRef = useRef();

  const handleImageChange = (image) => {
    if(currentImage === images.length){
      setImages( prev => [...prev, image])
      setTimeout(() => {
        scrollRef.current.scrollToEnd();
      }, 1000);
    } else {
      setImages( Object.assign([...images], {
        [currentImage]: image,
      }) )
    }
  }

  const handleImageRemove = () => {
    setImages(prev => prev.filter( (img, i) => i !== currentImage ))
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
            //setCurrentImage(4);
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
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={handleScroll}
          style={{ height: 300, width: 300, flexDirection: 'row', flex: 1 }}
        >
          {images.map((item, index) => (
            <Image source={{ uri: item }} key={index} style={{ flex: 1, width: 300, backgroundColor: 'grey'}} />
          ))}
          { images.length < 3 && 
            <TouchableOpacity onPress={pickImage} style={{ height: 300, width: 300, backgroundColor: '#EEE', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Feather name="camera" size={45} color={"#AAA"}/>
              <Text style={{color: '#AAA'}}>Adicionar Imagem</Text>
            </TouchableOpacity>
          }
        </ScrollView>
        {
          currentImage < images.length &&
          <EditButton >
            <IconContainer onPress={handleImageRemove}>
              <Feather name="x" size={20} color="white"  />
            </IconContainer>
            <IconContainer onPress={pickImage}>
              <Icon name="lapis" size={20} color="white" />
            </IconContainer>
          </EditButton>
        }
      </Carousel>
      <Indicator>
        {images.map((i, index) => (
          <CurrentIndicator key={index} style={{ backgroundColor: index == currentImage ? '#707070' : 'transparent' }}></CurrentIndicator>
        ))}
        { images.length < 3 && images.length > 0 &&
          <CurrentIndicator key='new' style={{ backgroundColor: images.length == currentImage ? '#707070' : 'transparent' }}></CurrentIndicator>
        }
      </Indicator>
    </Container>
  )
}

export default CreateProductCarousel;
