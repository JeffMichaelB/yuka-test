import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function ProductScreen(product) {
  //console.log(product.route.params.code);
  return (
    <View>
      <Text>Welcome Product!</Text>
      <Text>{product.route.params.code}</Text>
    </View>
  );
}
