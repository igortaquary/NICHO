import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ImageModal, pickImage } from "../ImagePickerWithModal";
import { ConvertWidth as cw } from "../Converter";
import Icon from "../Icon/index";
import Style from "./styles";
import SkeletonContent from "react-native-skeleton-content";

export default function CoverPlaceholder({
  buttonStyle,
  image,
  setImage,
  errorMessage,
  errorMessageStyle,
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
      <View style={[Style.cover]}>
        {(!image && !image[0]) ||
          (isLoading && (
            <SkeletonContent
              containerStyle={{
                flexGrow: 1,
                width: "100%",
                // position: "absolute",

                // top: 100,
              }}
              layout={[
                {
                  zIndex: 9,
                  width: "100%",
                  height: cw(199),
                  borderRadius: 0,

                  // position: "absolute",
                  // borderWidth: 1,
                },
              ]}
              isLoading={isLoading}
              animationType="pulse"
              duration={2000}
              highlightColor="#8d8a8b"
              boneColor="#707070"
            />
          ))}
        <Image
          resizeMode={"cover"}
          source={{ uri: image[0] }}
          style={[
            Style.image,
            !!errorMessage && { borderColor: "red", borderWidth: 1 },
          ]}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
        />

        <TouchableOpacity
          style={[buttonStyle, isLoading && { zIndex: 0 }]}
          onPress={handleAddCoverImage}
        >
          <Icon
            name="lapis"
            color="#FFFFFF"
            size={cw(12)}
            // style={{ top: cw(0) }}
          />
          <Text style={Style.text}>
            {image && image[0] ? "Alterar" : "Adicionar"} foto de capa
          </Text>
        </TouchableOpacity>
      </View>
      {errorMessage != "" && (
        <View style={{ alignItems: "center", ...errorMessageStyle }}>
          <Text style={[Style.errorMessage]}>{errorMessage}</Text>
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
