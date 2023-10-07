import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { MotivoPesaje } from "./MotivoPesaje";

export function MotivoPesajeList(props) {
  const { motivoPesaje, onReload } = props;
  return (
    <View style={styles.container}>
      {map(motivoPesaje, (item) => (
        <MotivoPesaje
          key={item.id}
          motivoPesajeId={item.id}
          motivoPesaje={item.attributes}
          onReload={onReload}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
