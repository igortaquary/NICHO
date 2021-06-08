import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  LogBox,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { UserProvider } from "./src/contexts/userContext";
import { FilterProvider } from "./src/contexts/filterContext";
import fetchUser from "./src/api/fetchUser";

import * as firebase from "firebase";

import {
  useFonts,
  Raleway_100Thin,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light,
  Raleway_300Light_Italic,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black,
  Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";
import apiKeys from "./config/keys";

export default function App() {
  let [fontsLoaded] = useFonts({
    fontello: require("./assets/custom-font/font/fontello.ttf"),
    Rousseau_Deco: require("./assets/RousseauDeco.ttf"),
    Raleway_100Thin,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light,
    Raleway_300Light_Italic,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black,
    Raleway_900Black_Italic,
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  LogBox.ignoreLogs(["Setting a timer"]);

  if (!fontsLoaded || !appIsReady) {
    return null;
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <ActivityIndicator size={50} color="#019B92" />
    // </View>
  } else {
    return (
      <UserProvider>
        <FilterProvider>
          <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Routes />
          </SafeAreaView>
        </FilterProvider>
      </UserProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Raleway_400Regular",
  },
});
