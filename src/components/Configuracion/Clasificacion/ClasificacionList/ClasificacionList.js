import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { Clasificacion } from "./Clasificacion";

export function ClasificacionList(props) {
  const { clasificacion, onReload } = props;
  return (
    <View style={styles.container}>
      {map(clasificacion, (item) => (
        <Clasificacion
          key={item.id}
          clasificacionId={item.id}
          clasificacion={item.attributes}
          onReload={onReload}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 70,
  },
});
