import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Home from "./home";
import Locations from "./locations";
import NotFoundPage from "../pages/NotFoundPage";
import ArtistPage from "../pages/ArtistPage";
import SavedPage from "../pages/SavedPage";
import EventPage from "../pages/EventPage";
import CreateEvent from "../pages/CreateEvent";
import CreateSpace from "../pages/CreateSpace";
import SpacePage from "../pages/SpacePage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import Icon from "../components/Icon";
import CustomDrawer from "../components/CustomDrawer";
import DrawerHeader from "../components/DrawerHeader";
import {useUserContext} from '../contexts/userContext';
import { StatusBar } from "react-native";
import FollowingPage from "../pages/FollowingPage";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomePages = () => {
  const {user} = useUserContext();
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
      {user ? <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="salvos" size={21} color={color} />
          ),
        }}
        name="Salvos"
        component={SavedPage}
      /> : null}
      {user ? <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="seguindo" size={21} color={color} />
          ),
        }}
        name="Seguindo"
        component={FollowingPage}
      /> : null}
      
      {user ? <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="chat" size={21} color={color} />
          ),
        }}
        name="Chat"
        component={ChatPage}
      /> : null}
    </Tab.Navigator>
  );
};

const MainPages = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
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
      <Drawer.Screen name="Página do Espaço" component={SpacePage} />
      <Drawer.Screen name="Mensagem" component={ChatPage} />
    </Drawer.Navigator>
  );
};

export default MainPages;
