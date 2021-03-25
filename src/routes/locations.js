import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotFoundPage from "../pages/NotFoundPage";
import LocationsEventsPage from "./../pages/LocationsEventsPage";

const TopTab = createMaterialTopTabNavigator();

const Locations = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Eventos" component={LocationsEventsPage} />
      <TopTab.Screen name="Espaços" component={NotFoundPage} />
    </TopTab.Navigator>
  );
};

export default Locations;
