import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import { Nacimiento } from "./Nacimiento";

export const NacimientoList = (props) => {
  const { nacimiento, onReload, clasificacionMenor } = props;
  return (
    <View style={styles.container}>
      {map(nacimiento, (item) => (
        <Nacimiento
          key={item.id}
          nacimientoId={item.id}
          nacimiento={item.attributes}
          clasificacionMenor={clasificacionMenor}
          onReload={onReload}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
  },
});
