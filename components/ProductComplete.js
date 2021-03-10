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
import * as FavoriteManager from "../components/FavoriteManager";

const ProductComplete = ({ product }) => {
  const AddFavorite = async () => {
    const code = product.code;
    await FavoriteManager.AddDataFavorite(code);
  };

  const cal = product.nutriments["energy-kcal_100g"];
  const prot = product.nutriments["proteins"].toFixed(1);
  const graisse = product.nutriments["saturated-fat"].toFixed(1);
  const sucre = product.nutriments["sugars"].toFixed(1);
  const sel = product.nutriments["salt_100g"].toFixed(1);
  const additifs = product.additives_n;

  return (
    <View>
      {cal === undefined ? (
        <Text>Aucune information sur ce produit</Text>
      ) : (
        <View>
          <Text>Qualités</Text>
          <Text>Pour 100g</Text>
          {cal <= 360 && (
            <View>
              <Text>Calories</Text>
              <Text>{cal} kCal</Text>
              <View
                style={cal <= 160 ? styles.roundGreen : styles.roundLightGreen}
              ></View>
              {cal <= 160 ? (
                <Text>Peu calorique</Text>
              ) : (
                (cal = 0 ? (
                  <Text>Aucune calorie</Text>
                ) : (
                  <Text>Faible impact</Text>
                ))
              )}
            </View>
          )}

          {prot > 5 && (
            <View>
              <Text>Protéines</Text>
              <Text>{prot}g</Text>
              <View
                style={
                  prot > 5 && prot <= 8
                    ? styles.roundGreen
                    : styles.roundLightGreen
                }
              ></View>
              {prot > 5 && prot <= 8 ? (
                <Text>Quelques protéines</Text>
              ) : (
                <Text>Excellente quantité de protéines</Text>
              )}
            </View>
          )}

          {graisse <= 4 && (
            <View>
              <Text>Graisses Saturées</Text>
              <Text>{graisse}g</Text>
              <View
                style={
                  graisse <= 2 ? styles.roundGreen : styles.roundLightGreen
                }
              ></View>
              {graisse <= 2 ? (
                <Text>Peu de graisses sat.</Text>
              ) : graisse === 0 ? (
                <Text>Pas de graisses sat.</Text>
              ) : (
                <Text>Faible impact</Text>
              )}
            </View>
          )}

          {sucre <= 5 && (
            <View>
              <Text>Sucres</Text>
              <Text>{sucre}g</Text>
              <View
                style={sucre <= 3 ? styles.roundGreen : styles.roundLightGreen}
              ></View>
              {sucre <= 3 ? (
                <Text>Peu de sucre</Text>
              ) : sucre === 0 ? (
                <Text>Pas de sucre</Text>
              ) : (
                <Text>Faible impact</Text>
              )}
            </View>
          )}

          {sel <= 0.9 && (
            <View>
              <Text>Sel</Text>
              <Text>{sel}g</Text>
              <View
                style={sel <= 0.5 ? styles.roundGreen : styles.roundLightGreen}
              ></View>
              {sel <= 0.5 ? (
                <Text>Peu de sel</Text>
              ) : sel === 0 ? (
                <Text>Pas de sel</Text>
              ) : (
                <Text>Faible impact</Text>
              )}
            </View>
          )}

          <Text>Défauts</Text>
          <Text>Pour 100g</Text>
          {cal > 360 && (
            <View>
              <Text>Calories</Text>
              <Text>{cal} kCal</Text>
              <View
                style={
                  cal > 360 && cal <= 560 ? styles.roundOrange : styles.roundRed
                }
              ></View>
              {cal > 360 && cal <= 560 ? (
                <Text>Un peu trop calorique</Text>
              ) : (
                <Text>Trop calorique</Text>
              )}
            </View>
          )}
        </View>
      )}
      {graisse > 4 && (
        <View>
          <Text>Graisses Saturées</Text>
          <Text>{graisse}g</Text>
          <View
            style={graisse <= 7 ? styles.roundOrange : styles.roundRed}
          ></View>
          {graisse <= 7 ? (
            <Text>Un peu trop gras</Text>
          ) : (
            <Text>Trop gras</Text>
          )}
        </View>
      )}

      {sucre > 5 && (
        <View>
          <Text>Sucres</Text>
          <Text>{sucre}g</Text>
          <View
            style={sucre <= 8 ? styles.roundOrange : styles.roundRed}
          ></View>
          {sucre <= 8 ? (
            <Text>Un peu trop sucré</Text>
          ) : (
            <Text>Trop sucré</Text>
          )}
        </View>
      )}

      {sel > 0.9 && (
        <View>
          <Text>Sel</Text>
          <Text>{sel}g</Text>
          <View
            style={sel <= 1.6 ? styles.roundOrange : styles.roundRed}
          ></View>
          {sel <= 1.6 ? (
            <Text>Un peu trop de sel</Text>
          ) : (
            <Text>Trop de sel</Text>
          )}
        </View>
      )}

      <Text>Additifs</Text>
      <Text>{additifs}</Text>

      <TouchableOpacity onPress={AddFavorite}>
        <Text>Ajouter aux favoris</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  roundRed: {
    height: 12,
    width: 12,
    backgroundColor: "#D1011D",
    borderRadius: 50,
    marginRight: 5,
  },
  roundGreen: {
    height: 12,
    width: 12,
    backgroundColor: "#209952",
    borderRadius: 50,
    marginRight: 5,
  },
  roundOrange: {
    height: 12,
    width: 12,
    backgroundColor: "#E67F22",
    borderRadius: 50,
    marginRight: 5,
  },
  roundLightGreen: {
    height: 12,
    width: 12,
    backgroundColor: "#2BD171",
    borderRadius: 50,
    marginRight: 5,
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProductComplete;
