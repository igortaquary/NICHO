import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Alert, View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import SkeletonContent from "react-native-skeleton-content";
import { createOpenLink } from "react-native-open-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Style from "./styles";
import { ConvertWidth as cw, ConvertHeight as ch } from "../Converter";
import moment from "moment";
import "moment/locale/pt-br";

export default function ShowLocation({
  destinationLatitude,
  destinationLongitude,
  destinationName,
  style,
  latitudeDelta,
  longitudeDelta,
}) {
  const refMarker = useRef(null);
  const [eta, setEta] = useState("");
  const [latitudeSource, setLatitudeSource] = useState("");
  const [longitudeSource, setLongitudeSource] = useState("");
  moment.locale("pt-br");

  const pkg = Constants.manifest.releaseChannel
    ? Constants.manifest.android.package
    : "host.exp.exponent";
  const openAppSettings = () => {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
      { data: "package:" + pkg }
    );
  };

  const [
    permission,
    askForPermission,
    getPermission,
  ] = Permissions.usePermissions(Permissions.LOCATION, {
    get: true,
    ask: true,
  });

  const getEta = async (
    longitudeSource,
    latitudeSource,
    destinationLongitude,
    destinationLatitude
  ) => {
    let maxTries = 3;
    let count = 0;
    console.log(
      `http://router.project-osrm.org/table/v1/car/${longitudeSource},${latitudeSource};${destinationLongitude},${destinationLatitude}?annotations=duration`
    );
    await fetch(
      `http://router.project-osrm.org/table/v1/car/${longitudeSource},${latitudeSource};${destinationLongitude},${destinationLatitude}?annotations=duration`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return Math.round(json.durations[0][1] / 60);
      })
      .then((duration) => {
        setEta(moment.duration(duration, "minutes").humanize());
        console.log("oi");
        console.log(moment.duration(duration, "minutes").humanize());
      })
      .catch(async (error) => {
        count++;
        console.log(count);
        console.error(error);
        if (count < maxTries) {
          await getEta(
            longitudeSource,
            latitudeSource,
            destinationLongitude,
            destinationLatitude
          );
        }
      });
  };

  useEffect(() => {
    let rem;
    (async () => {
      let unsubscribe = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 200,
        },
        async (position) => {
          console.log("listener de localizacao");
          await getEta(
            position.coords.longitude,
            position.coords.latitude,
            destinationLongitude,
            destinationLatitude
          );
          setLatitudeSource(position.coords.latitude);
          setLongitudeSource(position.coords.longitude);
        }
      );
      rem = unsubscribe;
    })();

    return () => rem.remove();
  }, []);

  useLayoutEffect(() => {
    setEta("");
  }, [destinationLatitude, destinationLongitude]);

  useEffect(() => {
    console.log("rodou");
    async function fetchEta() {
      if (!!latitudeSource && !!longitudeSource) {
        await getEta(
          longitudeSource,
          latitudeSource,
          destinationLongitude,
          destinationLatitude
        );
      }
    }

    fetchEta();
  }, [destinationLongitude, destinationLatitude]);

  if (permission && permission.status !== "granted") {
    Alert.alert(
      "Localização",
      "A localização é necessária para alguns recursos do aplicativo",
      [
        {
          text: "Me lembre depois",
          onPress: () => console.log("Me lembre depois"),
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
        },
        {
          text: "Ativar",
          onPress: () =>
            permission.canAskAgain ? askForPermission() : openAppSettings(),
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  const showInfo = () => {
    if (refMarker && refMarker.current && refMarker.current.showCallout) {
      refMarker.current.showCallout();
    }
  };

  const openMapApp = createOpenLink({
    end: destinationName,
    navigate_mode: "preview",
  });

  return (
    <SkeletonContent
      isLoading={!eta}
      animationType="shiver"
      // animationDirection="horizontalRight"
      duration={2000}
      highlightColor="#fafbfa"
      boneColor="#F1F1F1"
    >
      <MapView
        style={style}
        region={{
          latitude: destinationLatitude,
          longitude: destinationLongitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        // camera={{
        //   center: {
        //     latitude: -15.833620348354257,
        //     longitude: -48.051536338917934,
        //   },
        //   pitch: 0,
        //   heading: 0,
        //   altitude: 18,
        //   zoom: 15,
        // }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // showsTraffic={true}
        loadingEnabled={true}
        showsPointsOfInterest={false}
        onRegionChangeComplete={showInfo}
        onPress={openMapApp}
        onMarkerPress={openMapApp}
      >
        <Marker
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          calloutAnchor={{ x: cw(4), y: cw(1) }}
          ref={refMarker}
        >
          <Callout tooltip={true}>
            <View style={Style.callout}>
              <Text style={Style.calloutText} numberOfLines={2}>
                {destinationName}
              </Text>
              <Text style={Style.etaText}>{eta} carro - local atual</Text>
              {console.log(eta)}
            </View>
          </Callout>
        </Marker>
      </MapView>
    </SkeletonContent>
  );
}
