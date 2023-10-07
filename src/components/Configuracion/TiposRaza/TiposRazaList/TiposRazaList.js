import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { TipoRaza } from "./TipoRaza";

export function TiposRazaList(props) {
  const { tiposRaza, onReload } = props;

  return (
    <View style={styles.container}>
      {map(tiposRaza, (tipoRaza) => (
        <TipoRaza
          key={tipoRaza.id}
          tipoRazaId={tipoRaza.id}
          tipoRaza={tipoRaza.attributes}
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
