import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";

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
    <View>
      <Text>Chargement</Text>
    </View>
  ) : (
    <ScrollView>
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
            <View style={styles.productInformations}>
              <View>
                <Image
                  style={styles.productPicture}
                  source={{
                    uri: product.image_front_small_url,
                  }}
                />
              </View>
              <View style={styles.productDescription}>
                <Text style={styles.productTitle}>{product.product_name}</Text>
                <Text>{product.brands}</Text>
                <Text>{product.ecoscore_data.score} / 100</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productPicture: {
    height: 120,
    width: 120,
    marginTop: 5,
  },

  productInformations: {
    flexDirection: "row",
  },
  productDescription: {
    paddingLeft: 20,
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
