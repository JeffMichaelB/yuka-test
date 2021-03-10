import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import Product from "../components/Product";

export default function ProductScreen(data) {
  //console.log(data.route.params.code);

  const product = data.route.params;

  const AddFavorite = async () => {
    const code = product.code;
    await FavoriteManager.AddDataFavorite(code);
  };

  return (
    <View>
      <Product product={product} />
      <TouchableOpacity onPress={AddFavorite}>
        <Text>Ajouter aux favoris</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
