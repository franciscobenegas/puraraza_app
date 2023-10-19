import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { useAuth } from "../../../hooks";

export function ClasificacionScreen() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>ClasificacionScreen</Text>
    </View>
  );
}
