import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { CausaMortandad } from "./CausaMortandad";

export function CausaMortandadList(props) {
  const { causaMortandad, onReload } = props;
  return (
    <View style={styles.container}>
      {map(causaMortandad, (item) => (
        <CausaMortandad
          key={item.id}
          causaMortandadId={item.id}
          causaMortandad={item.attributes}
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
