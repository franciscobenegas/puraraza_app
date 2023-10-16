import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { MotivoEntrada } from "./MotivoEntrada";

export function MotivoEntradaList(props) {
  const { motivoEntrada, onReload } = props;
  return (
    <View style={styles.container}>
      {map(motivoEntrada, (item) => (
        <MotivoEntrada
          key={item.id}
          motivoEntradaId={item.id}
          motivoEntrada={item.attributes}
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
