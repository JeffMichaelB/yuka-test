import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BottomSheet } from "react-native-btr";
import axios from "axios";
import * as HistoriqueManager from "../components/HistoriqueManager";
import { Camera } from "expo-camera";
import Product from "../components/Product";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [minus, setMinus] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setVisible(!visible);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${data}.json`
        );

        if (response.data.status === 0) {
          throw response.data.status_verbose;
        }

        setProduct(response.data.product);
        setIsLoading(false);
        setErrorMessages(false);
        await HistoriqueManager.AddData(data);
      } catch (error) {
        console.log(error);

        setIsLoading(false);
        setScanned(true);
        setErrorMessages(true);
      }
    };

    fetchData();
  };

  const closeBottomNavigationView = () => {
    setVisible(false);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return isLoading ? (
    <ActivityIndicator size="large" color="grey" />
  ) : (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          flashMode="on"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.containers}>
        <View style={styles.containers}>
          <BottomSheet visible={visible} enabledInnerScrolling={true}>
            <TouchableOpacity
              style={styles.minus}
              onPress={() => {
                setMinus(!minus);
              }}
            >
              <FontAwesome5 name="minus" size={30} color="#D9D9D9" />
            </TouchableOpacity>
            <View
              style={
                minus === true
                  ? styles.bottomNavigationViewTrue
                  : styles.bottomNavigationViewFalse
              }
            >
              <TouchableOpacity
                style={styles.close}
                onPress={closeBottomNavigationView}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {scanned && !errorMessages ? (
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
                ) : (
                  scanned && errorMessages && <Text>Produit inconnu</Text>
                )}

                <View style={{ flex: 1, flexDirection: "row" }}></View>
              </View>
            </View>
          </BottomSheet>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },

  bottomNavigationViewFalse: {
    backgroundColor: "white",
    width: "100%",
    height: 250,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomNavigationViewTrue: {
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    paddingRight: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  minus: {
    alignItems: "center",
  },
  close: {
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingTop: 15,
  },
});
