import { View, Text, StyleSheet } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const data = [
  { value: 50, label: "Toro" },
  { value: 80, label: "Vaquilla", frontColor: "#177AD5" },
  { value: 90, label: "Vaca" },
  { value: 70, label: "Buey", frontColor: "#177AD5" },
];

export function BarraGrafico() {
  return (
    <View style={{ margin: 50 }}>
      <Text
        style={{
          padding: 10,
          fontSize: 20,
          color: "#3d5875",
          fontWeight: "500",
          marginBottom: 20,
        }}
      >
        Grafico de Clasificacion
      </Text>
      <View>
        <BarChart data={data} frontColor="lightgray" />
      </View>
    </View>
  );
}
