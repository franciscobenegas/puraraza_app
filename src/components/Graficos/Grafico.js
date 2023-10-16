import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Svg, Circle, Text as SVGText } from "react-native-svg";

const radius = 45;

export function Grafico(props) {
  const {
    size,
    strokeWidth,
    text,
    progressPercent,
    pgColor,
    textColor,
    tituloTxt,
  } = props;

  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "mediumaquamarine",
        borderRadius: 30,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#3d5875" }}>
          {tituloTxt}
        </Text>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke={"#fff"}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{ strokeWidth }}
          />

          {/* Progress Circle */}
          <Circle
            stroke={pgColor ? pgColor : "#3b5998"}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            {...{ strokeWidth }}
          />

          {/* Text */}
          <SVGText
            fontSize={"28"}
            fontWeight={"500"}
            x={size / 2}
            y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
            textAnchor="middle"
            fill={textColor ? textColor : "#333333"}
          >
            {text}
          </SVGText>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGrafico: {
    backgroundColor: "mediumaquamarine", //powderblue
    flexDirection: "row",
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 450,
  },
  txtCirculo: {
    fontSize: 30,
    fontWeight: "500",
    color: "#3d5875",
  },
  txtTituloMortandad: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3d5875",
  },

  izquierda: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  derecha: { flex: 1 },
});
