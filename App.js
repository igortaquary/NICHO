import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
} from '@expo-google-fonts/raleway';

export default function App() {
  let [fontsLoaded] = useFonts({
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

  if(!fontsLoaded){
    return <ActivityIndicator />
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text: {
    fontFamily: 'Raleway_400Regular'
  }
});
