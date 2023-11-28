import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../hooks";
import { Button, Divider } from "react-native-paper";
import { UserInfo, Menu } from "../../components/Cuentas";
import { globalStyles } from "../../styles";

export function UsuarioScreen() {
  const { logout } = useAuth();

  const CerrarSession = () => {
    Alert.alert(
      "Cerrar Sesion",
      "Esta seguro que desea Salir?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: logout,
        },
      ],
      { canselable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18, flex: 8 }}>
        <UserInfo />
        <Divider />
        <Menu />
      </View>
      <View style={{ padding: 18, flex: 1 }}>
        <Button
          icon="logout"
          mode="contained"
          onPress={CerrarSession}
          style={globalStyles.form.btnSubmit}
        >
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
