import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventPage from "../pages/EventPage";
import Locations from "./locations";
import SpacePage from "../pages/SpacePage";

const locationsStack = createStackNavigator();

const Events = () => {
  return (
    <locationsStack.Navigator headerMode="none">
      <locationsStack.Screen name="Eventos e Locais" component={Locations} />
      <locationsStack.Screen name="Página de Evento" component={EventPage} />
      <locationsStack.Screen name="Página do Espaço" component={SpacePage} />
    </locationsStack.Navigator>
  );
};

export default Events;
