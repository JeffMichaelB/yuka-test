import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";
import Constants from "expo-constants";

export default function FavoriteScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Item
  const deleteItem = async (code) => {
    return await FavoriteManager.DeleteDataFavorite(code);
  };

  useEffect(() => {
    const fetchData = async () => {
      const datas = await FavoriteManager.LoadFavorite();

      setProducts(
        await Promise.all(
          datas.map(async (data) => {
            const response = await axios.get(
              `https://world.openfoodfacts.org/api/v0/product/${data}.json`
            );

            return response.data.product;
          })
        )
      );
      setIsLoading(false);
    };

    fetchData();
  });

  return isLoading ? (
    <SafeAreaView>
      <Text>Chargement</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text>Favoris</Text>
        {products.map((product, index) => {
          return (
            <View key={index}>
              <StatusBar barStyle="dark-content" />
              <TouchableOpacity
                data={product}
                onPress={() => {
                  deleteItem(product.code);
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Product product={product} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
