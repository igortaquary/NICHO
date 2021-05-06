import React, { Fragment, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";
import { ImageModal, pickImage } from "../ImagePickerWithModal";
import Icon from "../Icon";
import Style from "./styles";

export function AddSpacePhotos({ images, setImages, errorMessage = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function handleButtonPress(index = 0) {
    setCurrentIndex(index);
    //   console.log("currentIndex: " + currentIndex);
    if (images && images[index]) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      await pickImage(index, images, setImages);
    }
  }

  return (
    <View style={Style.container}>
      <Text style={[Style.title, { marginLeft: cw(8) }]}>
        Adicione fotos do espaço
      </Text>
      {errorMessage != "" && (
        <Text style={Style.errorMessage}>{errorMessage}</Text>
      )}
      <View style={[Style.addPhotosContainer]}>
        <TouchableOpacity
          style={[
            Style.addPhoto,
            { width: cw(103), marginRight: cw(10) },
            errorMessage != "" && { borderColor: "red", borderWidth: 1 },
          ]}
          onPress={() => handleButtonPress(0)}
        >
          {images && images[0] ? (
            <Image
              source={{ uri: images[0] }}
              style={{ width: cw(103), height: cw(82), borderRadius: cw(12) }}
            />
          ) : (
            <Icon name="camera" color="#FFFF" size={cw(28.5)} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            Style.addPhoto,
            { width: cw(109), marginRight: cw(8) },
            errorMessage != "" && { borderColor: "red", borderWidth: 1 },
          ]}
          onPress={() => handleButtonPress(1)}
        >
          {images && images[1] && (
            <Image
              source={{ uri: images[1] }}
              style={{ width: cw(109), height: cw(82), borderRadius: cw(12) }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            Style.addPhoto,
            { width: cw(110) },
            errorMessage != "" && { borderColor: "red", borderWidth: 1 },
          ]}
          // onPress={() => {
          //   images[2] ? pickImage(2) : pickImage();
          // }}
          onPress={() => handleButtonPress(2, images, setImages)}
        >
          {images && images[2] && (
            <Image
              source={{ uri: images[2] }}
              style={{ width: cw(110), height: cw(82), borderRadius: cw(12) }}
            />
          )}
        </TouchableOpacity>
      </View>

      <ImageModal
        index={currentIndex}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        images={images}
        setImages={setImages}
      />
    </View>
  );
}
