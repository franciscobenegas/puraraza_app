import { View, StyleSheet, Text, Pressable, Platform } from "react-native";
import React, { useEffect, useState, useFocusEffect, useCallback } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditNacimientoScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import {
  nacimientoCtrl,
  tiposRazaCtrl,
  clasificacionCtrl,
} from "../../../../api";
import { useAuth } from "../../../../hooks";
import DateTimePiker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { map } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const AddEditNacimientoScreen = (props) => {
  const {
    route: { params },
  } = props;
  const nacimientoId = params?.nacimientoId;
  const navigation = useNavigation();
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tiposRaza, setTiposRaza] = useState(null);
  const [clasificacionMenor, setClasificacionMenor] = useState([]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onCahnge = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        formik.setFieldValue("fecha", currentDate.toISOString().slice(0, 10));
      }
    } else {
      toggleDatePicker();
    }
  };

  useEffect(() => {
    if (nacimientoId) {
      navigation.setOptions({
        title: "Editar Nacimiento",
      });
    } else {
      navigation.setOptions({
        title: "Crear Nacimiento",
      });
    }
  }, []);

  useEffect(() => {
    if (nacimientoId) {
      retornaNacimiento();
    }
  }, [nacimientoId]);

  useEffect(() => {
    recuperaTiposRaza();
  }, []);

  useEffect(() => {
    recuperaClasificacion();
  }, []);

  const recuperaClasificacion = async () => {
    const response = await clasificacionCtrl.getAll(user.establesimiento.id);
    const result = await response.data;
    const dataMenor = result.filter(
      (item) => item.attributes.dosAnhos === "Recien Nacido"
    );
    setClasificacionMenor(dataMenor);
  };

  const recuperaTiposRaza = async () => {
    const response = await tiposRazaCtrl.getAll(user.establesimiento.id);
    setTiposRaza(response?.data || []);
  };

  const retornaNacimiento = async () => {
    const response = await nacimientoCtrl.getId(nacimientoId);
    await formik.setFieldValue("fecha", response.fecha);
    await formik.setFieldValue("nroCaravana", response.nroCaravana);
    await formik.setFieldValue("nroCaravanaMadre", response.nroCaravanaMadre);
    await formik.setFieldValue("peso", response.peso);
    await formik.setFieldValue("sexo", response.sexo);
    await formik.setFieldValue("tipo_Parto", response.tipo_Parto);
    await formik.setFieldValue("tipo_raza", response.tipo_raza.data.id);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (nacimientoId) {
          //TODO: Actualizar Datos
          await nacimientoCtrl.update(nacimientoId, formValue);
        } else {
          let body = {
            data: {
              fecha: formValue.fecha,
              nroCaravana: formValue.nroCaravana,
              nroCaravanaMadre: formValue.nroCaravanaMadre,
              peso: formValue.peso,
              sexo: formValue.sexo ? formValue.sexo : "Macho",
              tipo_Parto: formValue.tipo_Parto
                ? formValue.tipo_Parto
                : "Normal",
              tipo_raza: formValue.tipo_raza,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await nacimientoCtrl.create(body);

          try {
            const resultData = clasificacionMenor.filter((item) =>
              item.attributes.nombre
                .toLowerCase()
                .match(body.data.sexo.toLowerCase())
            );
            let bodyCla = {
              stock: parseInt(resultData[0]?.attributes.stock) + 1,
            };
            let idClasificacion = resultData[0]?.id;
            if (idClasificacion !== 0) {
              await clasificacionCtrl.update(idClasificacion, bodyCla);
            }
          } catch (error) {
            Toast.show("Error al actualizar el Stock", error, {
              position: Toast.positions.CENTER,
            });
          }
        }
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al Editar o Actualizar el dato", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView extraScrollHeight={10}>
      <View style={styles.container}>
        {showPicker && (
          <DateTimePiker
            mode="date"
            display="spinner"
            value={date}
            onChange={onCahnge}
          />
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              label="Fecha Nacimiento"
              style={globalStyles.form.input}
              onChangeText={(text) => formik.setFieldValue("fecha", text)}
              value={formik.values.fecha}
              error={formik.errors.fecha}
              editable={false}
            />
            <HelperText
              style={{ marginTop: -15 }}
              type="error"
              visible={formik.errors.fecha ? true : false}
            >
              Debe cargar algun dato
            </HelperText>
          </Pressable>
        )}
        <TextInput
          label="Peso en Kg."
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("peso", text)}
          value={formik.values.peso}
          error={formik.errors.peso}
          keyboardType="numeric"
        />
        <HelperText
          style={{ marginTop: -15 }}
          type="error"
          visible={formik.errors.peso ? true : false}
        >
          Debe cargar algun dato
        </HelperText>
        <Text style={{ paddingBottom: -15 }}>Seleccione Sexo:</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.sexo}
          onValueChange={(itemValue) => formik.setFieldValue("sexo", itemValue)}
          mode="dialog"
        >
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Hembra" value="Hembra" />
        </Picker>
        <Text style={{ paddingBottom: -15 }}>Seleccione Tipo Parto:</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.tipo_Parto}
          onValueChange={(itemValue) =>
            formik.setFieldValue("tipo_Parto", itemValue)
          }
          mode="dialog"
        >
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="Distocico" value="Distocico" />
        </Picker>

        <Text style={{ paddingBottom: -15 }}>Seleccione Tipo Raza:</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.tipo_raza}
          onValueChange={(itemValue) =>
            formik.setFieldValue("tipo_raza", itemValue)
          }
          mode="dialog"
        >
          {map(tiposRaza, (item, index) => (
            <Picker.Item
              key={index}
              label={item.attributes.nombre}
              value={item.id}
            />
          ))}
        </Picker>

        <TextInput
          label="Nro de Caravana"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("nroCaravana", text)}
          value={formik.values.nroCaravana}
          error={formik.errors.nroCaravana}
        />
        <HelperText
          style={{ marginTop: -15 }}
          type="error"
          visible={formik.errors.nroCaravana ? true : false}
        >
          Debe cargar algun dato
        </HelperText>
        <TextInput
          label="Nro Caravana Madre"
          style={globalStyles.form.input}
          onChangeText={(text) =>
            formik.setFieldValue("nroCaravanaMadre", text)
          }
          value={formik.values.nroCaravanaMadre}
          error={formik.errors.nroCaravanaMadre}
        />
        <HelperText
          style={{ marginTop: -15 }}
          type="error"
          visible={formik.errors.nroCaravanaMadre ? true : false}
        >
          Debe cargar algun dato
        </HelperText>
        <Button
          mode="contained"
          style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          {nacimientoId ? "Actualizar" : "Guardar"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    //marginTop: 10,
  },
  btnSubmit: {
    //marginTop: 10,
  },
  combo: {
    backgroundColor: "#E9E3F0",
    marginBottom: 20,
  },
});
