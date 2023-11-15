import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { Propietario } from "./Propietario";

export function PropietarioList(props) {
  const { propietario, onReload } = props;
  return (
    <View style={styles.container}>
      {map(propietario, (item) => (
        <Propietario
          key={item.id}
          propietarioId={item.id}
          propietario={item.attributes}
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
