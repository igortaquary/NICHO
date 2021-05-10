import { Alert } from "react-native";

import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";

export function locationPermission() {
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
}
