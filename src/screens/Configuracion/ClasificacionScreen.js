import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { useAuth } from "../../hooks";
import { Button, Divider } from "react-native-paper";
import { UserInfo, Menu } from "../../components/Configuracion";

export function ClasificacionScreen() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>ClasificacionScreen</Text>
    </View>
  );
}
