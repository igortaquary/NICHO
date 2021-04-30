import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ImageModal, pickImage } from "../ImagePickerWithModal";
import { ConvertWidth as cw } from "./../../components/Converter";
import LottieView from "lottie-react-native";
import Icon from "./../../components/Icon/index";
import Style from "./styles";
import SkeletonContent from "react-native-skeleton-content";

export default function coverPlaceholder({
  buttonStyle,
  image,
  setImage,
  errorMessage,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleAddCoverImage() {
    setModalVisible(false);
    if (image) {
      if (!image[0]) {
        console.log("handleAddCoverImage");

        pickImage(0, image, setImage);
      } else if (image[0]) {
        setModalVisible(true);
      }
    }
  }

  function handleLoadStart() {
    setIsLoading(true);
  }
  function handleLoadEnd() {
    setIsLoading(false);
  }

  return (
    <View>
      {image && image[0] ? (
        <>
          <SkeletonContent
            containerStyle={{
              flexGrow: 1,
              width: "100%",
              // position: "absolute",

              zIndex: 3,
              // top: 100,
            }}
            layout={[{ width: "100%", height: cw(199), borderRadius: 0 }]}
            isLoading={isLoading}
            duration={2000}
            highlightColor="#8d8a8b"
            boneColor="#707070"
          />
          <TouchableOpacity
            style={Style.imageButton}
            onPress={handleAddCoverImage}
          >
            <Image
              resizeMode={"cover"}
              source={{ uri: image[0] }}
              style={Style.image}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
            />
          </TouchableOpacity>
          {/* </SkeletonContent> */}
        </>
      ) : (
        <View style={Style.cover}>
          <TouchableOpacity style={buttonStyle} onPress={handleAddCoverImage}>
            <Icon name="lapis" color="#FFFFFF" size={cw(12.08)} />
            <Text style={Style.text}>Adicionar foto de capa</Text>
          </TouchableOpacity>
        </View>
      )}
      {errorMessage != "" && (
        <View style={{ alignItems: "center" }}>
          <Text style={Style.errorMessage}>{errorMessage}</Text>
        </View>
      )}
      <ImageModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        images={image}
        setImages={setImage}
      />
    </View>
  );
}
