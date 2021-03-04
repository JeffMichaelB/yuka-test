import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import * as HistoriqueManager from "../components/HistoriqueManager";
import axios from "axios";

export default function HistoriqueScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Delete Item
  const deleteItem = async (code) => {
    await HistoriqueManager.DeleteData(code);
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      const datas = await HistoriqueManager.Load();

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
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/logo-carotte.png")}
      />
      <ActivityIndicator size="large" color="grey" />
    </View>
  ) : (
    <>
      {/*<Image
        source={{
          uri: products.selected_images.front.display.en,
        }}
      />*/}
      {products.map((product, index) => {
        return (
          <>
            <TouchableOpacity
              data={product}
              onPress={() => {
                deleteItem(product.code);
              }}
            >
              <Text>x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductScreen", product);
              }}
            >
              <View>
                <Text>{product.product_name}</Text>
                <Text>{product.brands}</Text>
                {product.ingredients.map((score, index) => {
                  return <Text key={index}>{score.percent_estimate}/100</Text>;
                })}
              </View>
            </TouchableOpacity>
          </>
        );
      })}
    </>
  );
}
