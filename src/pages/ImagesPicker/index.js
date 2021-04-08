import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagesPicker({navigation}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erro','Desculpe, precisa permitir o acesso às suas fotos para isso!');
            navigation.goBack();
        }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.cancelled) {
      addImage(result.uri);
    }
  };

  const addImage = (newImage) => {
    if(images.length < 3){
        let auxImages = images;
        auxImages.push(newImage);
        setImages(auxImages);
    }
  }

  const removeImage = (image) => {
    let auxImages = images;
    auxImages = auxImages.filter( elem => elem !== image);
    setImages(auxImages);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        {
            images.map( (uri, key) => 
                <TouchableOpacity onPress={ () => removeImage(uri)}>
                    <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} key={key} />
                </TouchableOpacity>
            )
        }
        {images.length < 3 && <Button title="Add foto" onPress={() => pickImage()} /> }
    </View>
  );
}
