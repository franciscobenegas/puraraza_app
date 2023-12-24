import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { Mortandad } from "./Mortandad";

export function MortandadList(props) {
  const { mortandad, onReload } = props;
  return (
    <View style={styles.container}>
      {map(mortandad, (item) => (
        <Mortandad
          key={item.id}
          mortandadId={item.id}
          mortandad={item.attributes}
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
