import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BottomSheet } from "react-native-btr";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setVisible(!visible);
    setData(data);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${data}.json`
        );
        console.log(response.data.product.ingredients);
        setProduct(response.data);
        setIsLoading(false);
        setErrorMessages(false);
      } catch (error) {
        //console.log(error.response.data.error);

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
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.containers}>
        <View style={styles.containers}>
          <BottomSheet visible={visible} enabledInnerScrolling={true}>
            <View style={styles.bottomNavigationView}>
              <Button title="x" onPress={closeBottomNavigationView} />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {scanned && !errorMessages ? (
                  <View>
                    <Text>{product.product.product_name}</Text>
                    <Text>{product.product.brands}</Text>
                    {product.product.ingredients.map((score, index) => {
                      return <Text key={index}>{score.percent_estimate}</Text>;
                    })}
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
    flexDirection: "column",
  },
  centeredView: {
    marginTop: 100,

    justifyContent: "center",
  },
  modal: {
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    justifyContent: "center",

    width: "100%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containers: {
    backgroundColor: "red",
  },

  bottomNavigationView: {
    backgroundColor: "white",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});
