import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Home from "./home";
import Locations from "./locations";
import NotFoundPage from "../pages/NotFoundPage";
import ArtistPage from "../pages/ArtistPage";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomePages = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          textTransform: 'lowercase'
        },
        iconStyle: {
          margin: 0
        },
        style: {
          paddingBottom: 5,
          paddingTop:5
        },
        activeTintColor: '#019B92',
        inactiveTintColor: '#707070'
      }}
    >
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Feather name="home" size={21} color={color} />
        }}         
        name="Home" 
        component={Home} />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <MaterialCommunityIcons name="map-marker-radius-outline" size={21} color={color} />
        }}   
        name="Locais" 
        component={Locations} 
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => <Feather name="bookmark" size={21} color={color} />
        }}   
        name="Salvos" 
        component={NotFoundPage} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Feather name="users" size={21} color={color} />
        }}   
        name="Seguindo" 
        component={NotFoundPage} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Feather name="message-circle" size={21} color={color} />
        }}   
        name="Mensagens" 
        component={NotFoundPage} 
      />
    </Tab.Navigator>
  );
};

const MainPages = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomePages} />
      <Drawer.Screen name="Alone Page" component={NotFoundPage} />
      <Drawer.Screen name="Página do Artista" component={ArtistPage} />

    </Drawer.Navigator>
  );
};

export default MainPages;
