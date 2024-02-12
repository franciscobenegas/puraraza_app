import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export function Grafico2() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 100],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
  };

  const chartConfigs = [
    {
      backgroundColor: "#000000",
      backgroundGradientFrom: "#1E2923",
      backgroundGradientTo: "#08130D",
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: "#022173",
      backgroundGradientFrom: "#022173",
      backgroundGradientTo: "#1b3fa0",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: "#ffffff",
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
    {
      backgroundColor: "#26872a",
      backgroundGradientFrom: "#43a047",
      backgroundGradientTo: "#66bb6a",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: "#000000",
      backgroundGradientFrom: "#000000",
      backgroundGradientTo: "#000000",
      color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    },
    {
      backgroundColor: "#0091EA",
      backgroundGradientFrom: "#0091EA",
      backgroundGradientTo: "#0091EA",
      color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    },
    {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: "#b90602",
      backgroundGradientFrom: "#e53935",
      backgroundGradientTo: "#ef5350",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: "#ff3e03",
      backgroundGradientFrom: "#ff3e03",
      backgroundGradientTo: "#ff3e03",
      color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
    },
  ];

  const graphStyle = {
    marginVertical: 8,
    //...chartConfig.style,
  };

  return (
    <View style={{ marginHorizontal: -5 }}>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 10} // from react-native
        height={300}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <BarChart
        width={Dimensions.get("window").width - 10}
        height={300}
        data={data}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={graphStyle}
      />
    </View>
  );
}
