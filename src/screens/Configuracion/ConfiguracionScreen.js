import { View, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "../../hooks";
import { Button, Divider } from "react-native-paper";
import { UserInfo, Menu } from "../../components/Configuracion";

export function ConfiguracionScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18, flex: 10 }}>
        <UserInfo />
        <Divider />
        <Menu />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
