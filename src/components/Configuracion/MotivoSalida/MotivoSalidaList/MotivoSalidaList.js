import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { MotivoSalida } from "./MotivoSalida";

export function MotivoSalidaList(props) {
  const { motivoSalida, onReload } = props;
  return (
    <View style={styles.container}>
      {map(motivoSalida, (item) => (
        <MotivoSalida
          key={item.id}
          motivoSalidaId={item.id}
          motivoSalida={item.attributes}
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
