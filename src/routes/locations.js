import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoryPage from "./../pages/CategoryPage";

const TopTab = createMaterialTopTabNavigator();

const Locations = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Eventos" component={CategoryPage} />
      <TopTab.Screen name="Espaços" component={CategoryPage} />
    </TopTab.Navigator>
  );
};

export default Locations;
