import { View, StyleSheet } from "react-native";
import { map } from "lodash";
//import { PotreroList } from "./PotreroList";
import { Potrero } from "./Potrero";

export function PotreroList(props) {
  const { potrero, onReload } = props;
  return (
    <View style={styles.container}>
      {map(potrero, (item) => (
        <Potrero
          key={item.id}
          potreroId={item.id}
          potrero={item.attributes}
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
