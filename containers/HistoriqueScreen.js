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

export default function HistoriqueScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductScreen");
      }}
    >
      <Text>Clique ici !</Text>
    </TouchableOpacity>
  );
}
