import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import axios from "axios";

export default function FavoriteScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <Text>Favoris !</Text>
      {products.map((product, index) => {
        {
          {
            //console.log(products);
          }
        }
        return;
      })}
    </>
  );
}
