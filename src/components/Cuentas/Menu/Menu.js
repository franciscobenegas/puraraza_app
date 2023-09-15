import { View, Text } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function Menu() {
  const navigation = useNavigation();
  return (
    <>
      <List.Section>
        <List.Subheader
          style={{ fontSize: 16, fontWeight: "bold", color: "indigo" }}
        >
          Mi Cuenta
        </List.Subheader>
        <List.Item
          title="Cambiar Nombre"
          description="Cambiar nombre y apellido del usuario"
          left={(props) => (
            <List.Icon {...props} icon="emoticon-excited-outline" />
          )}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("cambioNombre")}
        />
        <List.Item
          title="Cambiar Contraseña"
          description="Cambiar credensiales de acceso al Sistema"
          left={(props) => <List.Icon {...props} icon="key" />}
          titleStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate("cambiarContra")}
        />
      </List.Section>
    </>
  );
}
