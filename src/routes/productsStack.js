import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import ProductPage from "./../pages/ProductPage";

const productsStack = createStackNavigator();

const Products = () => {
  return (
    <productsStack.Navigator headerMode="none">
      <productsStack.Screen name="Home" component={HomePage} />
      <productsStack.Screen name="ProductPage" component={ProductPage} />
    </productsStack.Navigator>
  );
};

export default Products;
