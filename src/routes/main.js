import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import LocationsPage from "../pages/LocationsPage";
import Teste from "../pages/HomePage/Filter/filters";

const Tab = createBottomTabNavigator();

const MainPages = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Locais" component={LocationsPage} />
        <Tab.Screen name="Salvos" component={HomePage} />
        <Tab.Screen name="Seguindo" component={HomePage} />
        <Tab.Screen name="FiltrosTemp" component={Teste} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainPages;
