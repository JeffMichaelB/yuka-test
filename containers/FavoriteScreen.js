import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, Text, View } from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import axios from "axios";

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
    <>
      {products.map((product, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              data={product}
              onPress={() => {
                deleteItem(product.code);
              }}
            >
              <Text>x</Text>
            </TouchableOpacity>
            <Text>{product.product_name}</Text>
          </View>
        );
      })}
    </>
  );
}
