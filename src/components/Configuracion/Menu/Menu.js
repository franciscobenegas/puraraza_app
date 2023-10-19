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
          Configuraciones
        </List.Subheader>
        <List.Item
          title="Clasificacion"
          description="Cambiar las clasificaicones del sistema"
          left={(props) => <List.Icon {...props} icon="application-cog" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("clasificacion")}
        />
        <List.Item
          title="Tipo de Razas"
          description="Cambiar Tipos de Razas del Sistema"
          left={(props) => <List.Icon {...props} icon="atom" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("tipoRaza")}
        />
        <List.Item
          title="Causa Mortandad"
          description="Cambiar Causas de Mortandad del Sistema"
          left={(props) => <List.Icon {...props} icon="emoticon-dead" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("causaMortandad")}
        />
        <List.Item
          title="Motivo Pesaje"
          description="Registrar Motivo de Pesaje en el Sistema"
          left={(props) => <List.Icon {...props} icon="weight-kilogram" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("motivoPesaje")}
        />
        <List.Item
          title="Motivo Entrada"
          description="Registrar Motivo de Entrada en el Sistema"
          left={(props) => (
            <List.Icon {...props} icon="arrow-left-bold-circle" />
          )}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("motivoEntrada")}
        />
        <List.Item
          title="Motivo Salida"
          description="Registrar Motivo de Salida en el Sistema"
          left={(props) => (
            <List.Icon {...props} icon="arrow-right-bold-circle" />
          )}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("motivoSalida")}
        />
        <List.Item
          title="Establesimiento"
          description="Registrar Establesimiento en el Sistema"
          left={(props) => <List.Icon {...props} icon="home-circle" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("establesimiento")}
        />
      </List.Section>
    </ScrollView>
  );
}
