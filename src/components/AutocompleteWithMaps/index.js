import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  LogBox,
  KeyboardAvoidingView,
} from "react-native";
import Style from "./styles";
import RoundedButton from "../RoundedButton/RoundedButton";

import Icon from "../Icon/index";
import ShowLocation from "../ShowLocation";
import SkeletonContent from "react-native-skeleton-content";
import CoverPlaceholder from "../coverPlaceholder";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
import * as Localization from "expo-localization";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";

export default function AutocompleteWithMaps({
  placeholderText,
  eventLocationText,
  setEventLocationText,
  placeName,
  setPlaceName,
  placeAddress,
  setPlaceAddress,
  placeGeometry,
  setPlaceGeometry,
  useMaps,
  setUseMaps,
  errorMessage,
}) {
  const inputRef = useRef();
  const latitudeDelta =
    !!placeGeometry &&
    Math.abs(
      placeGeometry.viewport.northeast.lat -
        placeGeometry.viewport.southwest.lat
    );
  const longitudeDelta =
    !!placeGeometry &&
    Math.abs(
      placeGeometry.viewport.northeast.lng -
        placeGeometry.viewport.southwest.lng
    );

  function handleCheckbox() {
    setUseMaps((oldState) => !oldState);
  }

  useLayoutEffect(() => {
    inputRef.current?.setAddressText("");
  }, [useMaps]);

  return (
    <Fragment>
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder={"  " + placeholderText}
        minLength={3}
        autoFocus={false}
        debounce={500}
        enablePoweredByContainer={false}
        textInputHide={!useMaps}
        disableScroll={false}
        // currentLocation={true}
        // currentLocationLabel={"Local atual"}
        fetchDetails={true}
        GooglePlacesDetailsQuery={{
          key: "AIzaSyCucbcbZEEceOtEUZUuJqKnbX0OgPMJXgw",
          language: "pt-BR",
          fields: "formatted_address,name,place_id,geometry",
        }}
        renderRow={(data) => {
          let title = "",
            address = "";

          if (data.structured_formatting != undefined) {
            title =
              data.structured_formatting.main_text ||
              data.description ||
              data.name;
            address = data.structured_formatting.secondary_text || "";
          } else {
            title = data.description || data.name;
            address = "";
          }
          return (
            <View style={[Style.autocompleteRow, { flex: 1, width: 0 }]}>
              <Text numberOfLines={3} style={Style.autocompleteRowText}>
                {title}
              </Text>
              <Text numberOfLines={3} style={[Style.autocompleteRowText]}>
                {address}
              </Text>
            </View>
          );
        }}
        onTimeout={() => console.log("timeout")}
        onFail={() => console.log("fail")}
        onNotFound={() => console.log("not found")}
        onPress={(data, details = null) => {
          setPlaceName(data.structured_formatting.main_text);
          setPlaceAddress(data.structured_formatting.secondary_text);
          setPlaceGeometry(details.geometry);
          console.log(
            details.geometry.viewport.northeast.lat -
              details.geometry.viewport.southwest.lat,
            details.geometry.viewport.northeast.lng -
              details.geometry.viewport.southwest.lng
          );
        }}
        query={{
          key: "AIzaSyCucbcbZEEceOtEUZUuJqKnbX0OgPMJXgw",
          language: "pt-BR",
          components: "country:br",
        }}
        styles={{
          textInput: [
            Style.locationInput,
            errorMessage.length && { borderColor: "red", borderWidth: 1 },
          ],
          listView: Style.autocompleteListView,
          row: Style.autocompleteRow,
          poweredContainer: Style.poweredContainer,

          powered: {
            // height: cw(18),
            // width: cw(144),
            margin: 0,
            padding: 0,
          },
        }}
      />

      {!useMaps && (
        <TextInput
          style={[
            Style.locationInput,
            errorMessage.length && { borderColor: "red", borderWidth: 1 },
          ]}
          placeholder={"  " + placeholderText}
          value={eventLocationText}
          onChangeText={(text) => {
            setEventLocationText(text);
          }}
        />
      )}

      {errorMessage != "" && (
        <Text style={Style.errorMessage}>{errorMessage}</Text>
      )}

      {console.log(eventLocationText)}

      <View style={Style.checkboxContainer}>
        <TouchableOpacity style={[Style.checkbox]} onPress={handleCheckbox}>
          {useMaps ? (
            <Feather name="check-square" size={18} color="#019B92" />
          ) : (
            <Feather name="square" size={18} color="#707070" />
          )}
        </TouchableOpacity>
        <Text style={Style.useMapsText}>Adicionar no Google Maps</Text>
      </View>

      {useMaps && !!placeGeometry && (
        <View style={[Style.iconAddressContainer]}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="marker" size={cw(26.61)} color={"#019b92"} />
            <View style={Style.locationNameAddress}>
              <Text style={Style.placeName}>{placeName}</Text>
              <Text style={Style.placeAddress}>{placeAddress}</Text>
            </View>
          </View>
          <ShowLocation
            destinationLatitude={placeGeometry.location.lat}
            destinationLongitude={placeGeometry.location.lng}
            latitudeDelta={latitudeDelta}
            longitudeDelta={longitudeDelta}
            destinationName={placeName}
            style={{ width: cw(312), height: cw(97) }}
          />
        </View>
      )}
    </Fragment>
  );
}
