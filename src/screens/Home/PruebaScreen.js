import { View, Text, StyleSheet } from "react-native";

export function PruebaScreen() {
  return (
    <View style={styles.container}>
      <Text>PruebaScreen222</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
});
