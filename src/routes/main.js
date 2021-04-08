import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Home from "./home";
import Locations from "./locations";
import NotFoundPage from "../pages/NotFoundPage";
import ArtistPage from "../pages/ArtistPage";
import Icon from "../components/Icon";
import CustomDrawer from "../components/CustomDrawer";

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
          tabBarIcon: ({focused, color}) => <Icon name="home" size={21} color={color} />
        }}         
        name="Home" 
        component={Home} />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Icon name="locais" size={21} color={color} />
        }}   
        name="Locais" 
        component={Locations} 
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => <Icon name="salvos" size={21} color={color} />
        }}   
        name="Salvos" 
        component={NotFoundPage} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Icon name="seguindo" size={21} color={color} />
        }}   
        name="Seguindo" 
        component={NotFoundPage} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: ({focused, color}) => <Icon name="chat" size={21} color={color} />
        }}   
        name="Mensagens" 
        component={NotFoundPage} 
      />
    </Tab.Navigator>
  );
};

const MainPages = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomePages} />
      <Drawer.Screen name="Alone Page" component={NotFoundPage} />
      <Drawer.Screen name="Página do Artista" component={ArtistPage} />

    </Drawer.Navigator>
  );
};

export default MainPages;
