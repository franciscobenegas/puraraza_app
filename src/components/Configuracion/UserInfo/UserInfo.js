import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../../../hooks";
import { Avatar } from "react-native-paper";

export function UserInfo() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <View style={styles.containerText}>
          <Text style={styles.name}>
            {user.nombre && user.apellido
              ? `${user.nombre} ${user.apellido}`
              : user.email}
          </Text>
          <Text>Usuario: {user.username}</Text>
          <Text>{user.rol}</Text>
        </View>
        <View style={styles.containerAvatar}>
          <Avatar.Text
            size={50}
            style={{ backgroundColor: "steelblue" }}
            label={
              user.nombre && user.apellido
                ? `${user.nombre[0]}${user.apellido[0]}`
                : `${user.email[0]}${user.email[1]}`
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 15,
    //backgroundColor: "red",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  name: {
    fontSize: 18,
    color: "steelblue",
    fontWeight: "400",
  },
  containerUser: {
    flexDirection: "row",
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
  },
  containerAvatar: {
    flex: 1,
    alignItems: "flex-end",
  },
});
