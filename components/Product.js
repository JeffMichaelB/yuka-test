import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
} from "react-native";

const Product = () => {
  return (
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
  );
};

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

export default Product;
