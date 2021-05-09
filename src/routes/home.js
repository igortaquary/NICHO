import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
// import CategoryPage from "./../pages/CategoryPage";
// import RegionPage from "../pages/RegionPage";
import NotFoundPage from "./../pages/NotFoundPage";

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Região" component={NotFoundPage} />
      <TopTab.Screen name="Categoria" component={NotFoundPage} />
    </TopTab.Navigator>
  );
};

export default Home;
