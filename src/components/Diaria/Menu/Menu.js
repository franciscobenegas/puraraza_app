import { View, Text, ScrollView } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function Menu() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader
          style={{ fontSize: 16, fontWeight: "bold", color: "steelblue" }}
        >
          Registro parte Diaria
        </List.Subheader>
        <List.Item
          title="Mortandad"
          description="Registro de las Mortandades de los animales"
          left={(props) => <List.Icon {...props} icon="emoticon-dead" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("mortandad")}
        />
        <List.Item
          title="Nacimiento"
          description="Registro de las Naciminetos de los animales"
          left={(props) => <List.Icon {...props} icon="plus-circle" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("nacimiento")}
        />
        <List.Item
          title="Entrada"
          description="Registro de las Entradas de los animales"
          left={(props) => (
            <List.Icon {...props} icon="arrow-right-bold-circle" />
          )}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("entrada")}
        />
        <List.Item
          title="Salida"
          description="Registro de las Salidas de los animales"
          left={(props) => (
            <List.Icon {...props} icon="arrow-left-bold-circle" />
          )}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("salida")}
        />
        <List.Item
          title="Pesaje"
          description="Registro del Peso de los animales"
          left={(props) => <List.Icon {...props} icon="weight-kilogram" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("pesaje")}
        />
      </List.Section>
    </ScrollView>
  );
}
