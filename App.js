import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import containers
import HistoriqueScreen from "./containers/HistoriqueScreen";
import FavoriteScreen from "./containers/FavoriteScreen";
import ProductScreen from "./containers/ProductScreen";
import ScanScreen from "./containers/ScanScreen";

const mainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Historique" component={HistoriqueScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};

const favoriteNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favoris" component={FavoriteScreen} />
  </Stack.Navigator>
);

const ScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "green",
      inactiveTintColor: "grey",
    }}
  >
    <Tab.Screen
      name="Historique"
      component={mainStackNavigator}
      options={{
        tabBarLabel: "Historique",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="carrot" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Scan"
      component={ScreenNavigator}
      options={{
        tabBarLabel: "Scan",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="barcode-scan" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Favoris"
      component={favoriteNavigator}
      options={{
        tabBarLabel: "Favoris",
        tabBarIcon: ({ color }) => (
          <AntDesign name="staro" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
