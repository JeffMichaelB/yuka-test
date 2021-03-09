import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  StatusBar,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import * as HistoriqueManager from "../components/HistoriqueManager";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import * as Product from "../components/Product";

export default function HistoriqueScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Delete Item
  const deleteItem = async (code) => {
    return await HistoriqueManager.DeleteData(code);
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
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <Text>Historique</Text>
      {products.map((product, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              data={product}
              onPress={() => {
                deleteItem(product.code);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductScreen", product);
              }}
            >
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
                  <Text style={styles.productTitle}>
                    {product.product_name}
                  </Text>
                  <Text>{product.brands}</Text>
                  <Text>{product.ecoscore_data.score} / 100</Text>
                </View>
              </View>
            </TouchableOpacity>
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
