import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Home from "./home";
import Locations from "./locations";
import NotFoundPage from "../pages/NotFoundPage";
import ArtistPage from "../pages/ArtistPage";
import Icon from "../components/Icon";
import EventPage from "../pages/EventPage";
import CreateEvent from "../pages/CreateEvent";
import CreateSpace from "../pages/CreateSpace";
import HomePage from "../pages/HomePage";
import DrawerHeader from "../components/DrawerHeader";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomePages = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          textTransform: "lowercase",
        },
        iconStyle: {
          margin: 0,
          padding: 0,
        },
        style: {
          paddingBottom: 5,
          paddingTop: 5,
          margin: 0,
          padding: 0,
          backgroundColor: "#F1F1F1",
        },
        activeTintColor: "#019B92",
        inactiveTintColor: "#707070",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="home" size={21} color={color} />
          ),
        }}
        name="Home"
        component={HomePage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="locais" size={21} color={color} />
          ),
        }}
        name="Locais"
        component={Locations}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="salvos" size={21} color={color} />
          ),
        }}
        name="Salvos"
        component={NotFoundPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="seguindo" size={21} color={color} />
          ),
        }}
        name="Seguindo"
        component={NotFoundPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="chat" size={21} color={color} />
          ),
        }}
        name="Mensagens"
        component={NotFoundPage}
      />
    </Tab.Navigator>
  );
};

const MainPages = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ scene }) => <DrawerHeader scene={scene} />,
      }}
    >
      <Drawer.Screen name="Inicio" component={HomePages} />
      <Drawer.Screen name="Alone Page" component={NotFoundPage} />
      <Drawer.Screen name="Página do Artista" component={ArtistPage} />
      <Drawer.Screen name="Página de Evento" component={EventPage} />
      <Drawer.Screen name="Criar Evento" component={CreateEvent} />
      <Drawer.Screen name="Criar Espaço" component={CreateSpace} />
    </Drawer.Navigator>
  );
};

export default MainPages;
