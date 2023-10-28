import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LoginForm, RegisterForm } from "../components/Auth";
import logo from "../../assets/Logo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HomeScreen = () => {
  const [showLogin, setShowLogin] = useState(true);
  const onShowLoginRegister = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <View>
            <Image source={logo} style={styles.logo} />
            <LoginForm showRegister={onShowLoginRegister} />
          </View>
        ) : (
          <RegisterForm showLogin={onShowLoginRegister} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "90%",
    height: "60%",
    resizeMode: "cover",
    marginBottom: 20,
    margin: 20,
  },
});

export default HomeScreen;
