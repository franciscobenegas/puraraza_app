import { View, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "../../hooks";
import { Button, Divider } from "react-native-paper";
import { UserInfo, Menu } from "../../components/Cuentas";

export function UsuarioScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18, flex: 10 }}>
        <UserInfo />
        <Divider />
        <Menu />
      </View>
      <View style={{ padding: 18, flex: 0.8 }}>
        <Button icon="logout" mode="contained" onPress={logout}>
          Cerrar Sesion
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
    //marginHorizontal: 20,
  },
});
