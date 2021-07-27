import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Platform } from "react-native";
import MainPages from "./main";
import AuthPages from "./auth";
import CreateProductPage from "../pages/CreateProductPage";
import ProductPage from "../pages/ProductPage";

import { Feather } from "@expo/vector-icons";
import Filters from "../pages/HomePage/Filter/filters";
import FiltersEvent from "../pages/LocationsEventsPage/Filter/filters";
import FiltersSpace from "../pages/LocationsSpacesPage/Filter/filters";

import CollectionPage from "../pages/CollectionPage";
import CreateExpositorPage from "../pages/CreateExpositorPage";
import MensagemPage from "../pages/MensagemPage";
import CreateEvent from "../pages/CreateEvent";
import CreateSpace from "../pages/CreateSpace";
import CreditsPage from "../pages/CreditsPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useUserContext } from "../contexts/userContext";
import TipsPage from "../pages/TipsPage";
import SignUpPage from "../pages/SignUpPage";

const Stack = createStackNavigator();

const headerStyle = {
  headerShown: true,
  headerTintColor: "#505050",
  headerTitleAlign: "center",
  headerBackImage: () => (
    <Feather name="chevron-left" size={30} color="#019B92" />
  ),
};

const Routes = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Stack.Navigator headerMode="screen">
        {!user && (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={AuthPages}
          />
        )}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainPages}
        />
        {/* <Stack.Screen
          options={{ title: "Produto", ...headerStyle }}
          name="ProductPage"
          component={ProductPage}
        /> */}
        <Stack.Screen
          options={{ title: "Nova publicação", ...headerStyle }}
          name="NewProduct"
          component={CreateProductPage}
        />
        <Stack.Screen
          options={{ title: "Filtros de Eventos", ...headerStyle }}
          name="FiltersEvent"
          component={FiltersEvent}
        />
        <Stack.Screen
          options={{ title: "Filtros de Espaços", ...headerStyle }}
          name="FiltersSpace"
          component={FiltersSpace}
        />
        <Stack.Screen
          options={{ title: "Filtros", ...headerStyle }}
          name="Filters"
          component={Filters}
        />
        <Stack.Screen
          options={{
            title: "Coleção",
            ...headerStyle,
            headerStyle: { elevation: 0 },
          }}
          name="Collection"
          component={CollectionPage}
        />
        <Stack.Screen
          options={{ title: "Expositor", ...headerStyle }}
          name="Expositor"
          component={CreateExpositorPage}
        />
        <Stack.Screen
          options={{ title: "Chat", ...headerStyle }}
          name="MensagemPage"
          component={MensagemPage}
        />
        <Stack.Screen
          options={{
            title: "CRÉDITOS",
            ...headerStyle,
            headerTitleStyle: {
              fontFamily: "Raleway_600SemiBold",
              fontSize: 18,
              color: "#707070",
            },
          }}
          name="CreditsPage"
          component={CreditsPage}
        />
        <Stack.Screen
          options={{ title: "Adicionar Evento", ...headerStyle }}
          name="Criar Evento"
          component={CreateEvent}
        />
        <Stack.Screen
          options={{ title: "Adicionar Espaço", ...headerStyle }}
          name="Criar Espaço"
          component={CreateSpace}
        />
        <Stack.Screen
          options={headerStyle}
          name="NotFound"
          component={NotFoundPage}
        />
        <Stack.Screen
          options={{ title: "Configurações", ...headerStyle }}
          name="Configuracoes"
          component={SignUpPage}
        />
        <Stack.Screen
          options={{ title: "Dicas Para Artistas", ...headerStyle }}
          name="Tips"
          component={TipsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
