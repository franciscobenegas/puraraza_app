import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenName } from "../../utils";
import {
  HomeStack,
  DiariaStack,
  ConfiguracionStack,
  UsuarioStack,
} from "../stacks";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
        tabBarActiveTintColor: "#000",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screenName.home.root}
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screenName.diaria.root}
        component={DiariaStack}
        options={{ title: "Parte Diaria" }}
      />
      <Tab.Screen
        name={screenName.config.root}
        component={ConfiguracionStack}
        options={{ title: "Configuracion" }}
      />
      <Tab.Screen
        name={screenName.usuario.root}
        component={UsuarioStack}
        options={{ title: "Usuario" }}
      />
    </Tab.Navigator>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  let color = "#fff";

  if (routeStatus.focused) {
    color = "#0098d3";
  }

  if (route.name === screenName.home.root) {
    iconName = "home";
  }

  if (route.name === screenName.diaria.root) {
    iconName = "list-alt";
  }

  if (route.name === screenName.config.root) {
    iconName = "wrench";
  }

  if (route.name === screenName.usuario.root) {
    iconName = "user-circle";
  }

  return <FontAwesome name={iconName} color={color} style={styles.icon} />;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
    backgroundColor: "#16222b",
  },
  tabBar: {
    backgroundColor: "#16222b",
  },
});
