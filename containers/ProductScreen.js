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
import ProductComplete from "../components/ProductComplete";

export default function ProductScreen(data) {
  //console.log(data.route.params.code);

  const product = data.route.params;

  const AddFavorite = async () => {
    const code = product.code;
    await FavoriteManager.AddDataFavorite(code);
  };

  const cal = product.nutriments["energy-kcal_100g"];
  const prot = product.nutriments["proteins"].toFixed(1);
  const graisse = product.nutriments["saturated-fat"].toFixed(1);
  const sucre = product.nutriments["sugars"].toFixed(1);
  const sel = product.nutriments["salt_100g"].toFixed(1);
  const additifs = product.additives_n;

  return (
    <View>
      <Product product={product} />
      <ProductComplete product={product} />
    </View>
  );
}
