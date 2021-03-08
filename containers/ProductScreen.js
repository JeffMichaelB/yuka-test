import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, TouchableOpacity, Text, View } from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";

export default function ProductScreen(data) {
  //console.log(data.route.params.code);

  const AddFavorite = async () => {
    const code = data.route.params.code;
    await FavoriteManager.AddDataFavorite(code);
  };

  return (
    <View>
      <Text>{data.route.params.code}</Text>
      <TouchableOpacity onPress={AddFavorite}>
        <Text>Ajouter aux favoris</Text>
      </TouchableOpacity>
    </View>
  );
}
