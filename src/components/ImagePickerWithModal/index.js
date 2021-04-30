import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "../Icon";
import Style from "./styles";
import { ConvertWidth as cw } from "../Converter";

export async function pickImage(index, images, setImages) {
  console.log("index: " + index);
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Erro",
      "Desculpe, precisa permitir o acesso às suas fotos para isso!"
    );
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.2,
    allowsMultipleSelection: true,
  });

  if (!result.cancelled) {
    if (images && images[index]) {
      changeImage(result.uri, index, images, setImages);
    } else addImage(result.uri, images, setImages);
  }
}

export function addImage(newImage, images, setImages) {
  if (images.length < 3) {
    let auxImages = [...images];

    auxImages.push(newImage);

    setImages(auxImages);
  }
}

export function removeImage(index, images, setImages) {
  console.log("o que chegou no remove: " + index);
  console.log(images);

  let auxImages = [...images];
  auxImages.splice(index, 1);
  setImages(auxImages);
}

export function changeImage(image, index, images, setImages) {
  console.log("change");
  let auxImages = [...images];
  auxImages.splice(index, 1, image);
  setImages(auxImages);
}

export function ImageModal({
  index = 0,
  setIsVisible,
  isVisible,
  images,
  setImages,
}) {
  function handlePickImage() {
    setIsVisible(false);
    pickImage(index, images, setImages);
  }

  function handleRemoveImage() {
    setIsVisible(false);
    removeImage(index, images, setImages);
  }

  return (
    <>
      {isVisible && <View style={Style.darkScreen} />}

      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={Style.container}>
            <TouchableWithoutFeedback>
              <View style={Style.modalView}>
                <TouchableOpacity
                  style={[Style.button, { borderTopWidth: 0 }]}
                  onPress={handlePickImage}
                >
                  <Icon name="camera" color="#707070" />
                  <Text style={Style.option}>Trocar imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Style.button}
                  onPress={handleRemoveImage}
                >
                  <Icon
                    name="x"
                    color="#707070"
                    style={{ left: cw(1), marginRight: cw(2) }}
                  />
                  <Text style={Style.option}>Remover imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[Style.button, { borderBottomWidth: 0 }]}
                  onPress={() => setIsVisible(false)}
                >
                  <Text style={Style.cancel}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
