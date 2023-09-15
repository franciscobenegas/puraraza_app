import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LoginForm, RegisterForm } from "../../../components/Auth";
import logo from "../../../../assets/Logo.png";

export function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const onShowLoginRegister = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <LoginForm showRegister={onShowLoginRegister} />
        ) : (
          <RegisterForm showLogin={onShowLoginRegister} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    height: "25%",
    resizeMode: "cover",
    marginBottom: 20,
  },
});
