import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = async () => {
    navigation.navigate("Home");
    await setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        // bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../assets/animations/boost.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Pura Raza S.A.",
            subtitle:
              "Bienvenido!!! a tu asistente Gandero Digital, la plataforma que integra Inteligencia Artificial para ayuda del Genadero",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../assets/animations/work.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Información en la NUBE!!!",
            subtitle:
              "Toda la información en la Nube en tiempo real, en cualquier parte del mundo",
          },
          {
            backgroundColor: "#a78bfa",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../assets/animations/achieve.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Análisis en tiempo REAL!!!",
            subtitle:
              "Toda la información disponible en tiempo real en cualquier parte del mundo",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: 'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%'
  },
});
