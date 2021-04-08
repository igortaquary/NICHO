import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotFoundPage from "../pages/NotFoundPage";

const TopTab = createMaterialTopTabNavigator();

const Locations = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Eventos" component={NotFoundPage} />
      <TopTab.Screen name="Espaços" component={NotFoundPage} />
    </TopTab.Navigator>
  );
};

export default Locations;
