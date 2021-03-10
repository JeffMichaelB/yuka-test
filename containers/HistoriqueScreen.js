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
  SafeAreaView,
  View,
} from "react-native";
import * as HistoriqueManager from "../components/HistoriqueManager";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";
import Constants from "expo-constants";

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
    <SafeAreaView style={styles.loadingPage}>
      <Image style={styles.loading} source={require("../assets/loading.png")} />
      <ActivityIndicator size="large" color="grey" />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
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
                <Product product={product} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  loadingPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#209952",
    height: "100%",
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
