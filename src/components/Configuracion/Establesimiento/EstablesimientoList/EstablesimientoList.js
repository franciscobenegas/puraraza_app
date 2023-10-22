import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { Establesimiento } from "./Establesimiento";

export function EstablesimientoList(props) {
  const { establesimiento, onReload } = props;
  return (
    <View style={styles.container}>
      {map(establesimiento, (item) => (
        <Establesimiento
          key={item.id}
          establesimientoId={item.id}
          establesimiento={item.attributes}
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
