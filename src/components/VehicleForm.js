import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import { RadioButton } from "react-native-paper";

export const VehicleForm = ({
  modalParking,
  setModalParking,
  registeredVehicles,
  setRegisteredVehicles,
  setVehicle,
  vehicle: vehicleObj,
}) => {
  const [id, setId] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const [sector, setSector] = useState("");
  const [keys, setKeys] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    console.log("Entrando al useEffect");
    console.log("Informacion del objeto Vehicle: " + vehicleObj.id);

    if (Object.keys(vehicleObj).length > 0) {
      setId(vehicleObj.id);
      setPlate(vehicleObj.plate);
      setType(vehicleObj.type);
      setSector(vehicleObj.sector);
      setKeys(vehicleObj.keys);
      setDateTime(vehicleObj.dateTime);
      setComments(vehicleObj.comments);
    } else {
      setId("");
      setPlate("");
      setType("");
      setSector("");
      setKeys("");
      setDateTime(new Date());
      setComments("");
    }
  }, [vehicleObj]);

  const handleVehicle = () => {
    if (
      [plate, sector, keys].includes("") ||
      type.includes("null") ||
      dateTime > new Date()
    ) {
      Alert.alert("Error", "Hay campos sin diligenciar");
      return;
    }

    const newVehicle = {
      plate,
      type,
      sector,
      keys,
      dateTime,
      comments,
    };

    if (id) {
      newVehicle.id = id;
      const vehiclesEdited = registeredVehicles.map((vehicleState) =>
        vehicleState.id === newVehicle.id ? newVehicle : vehicleState
      );
      setRegisteredVehicles(vehiclesEdited);
    } else {
      newVehicle.id = Date.now();
      setRegisteredVehicles([...registeredVehicles, newVehicle]);
    }

    setUser({});
    setModalParking(!modalParking);
    setPlate("");
    setType("");
    setSector("");
    setKeys("");
    setDateTime(new Date());
    setComments("");
  };

  const dateFormate = (date) => {
    const newDate = new Date(date);
    const optionsFormate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hourCycle: "h12",
      hour: "2-digit",
      minute: "2-digit",
    };
    return newDate.toLocaleDateString("es-ES", optionsFormate);
  };

  return (
    <Modal animationType='slide' visible={modalParking}>
      <ImageBackground
        source={require("../assets/jpg/dev3.jpg")}
        resizeMode='stretch'
        style={styles.backCover}>
        <Pressable
          style={styles.btnExit}
          onPress={() => {
            setModalParking(false);
            setUser({});
          }}>
          <Text style={styles.btnTextExit}>X</Text>
        </Pressable>
        <Image
          style={styles.image}
          source={require("../assets/png/Logos_UAM-08.png")}
        />
        <ScrollView>
          <Text style={styles.title}>
            Registro {""}
            <Text style={styles.titleBold}>Parqueadero UAM</Text>
          </Text>
          <View style={styles.campo}>
            <Text style={styles.text}>Placa</Text>
            <TextInput
              placeholder='Ingrese la Placa'
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType='email-address'
              value={plate}
              onChangeText={setPlate}
              maxLength={6}></TextInput>
          </View>
          <View style={styles.campo}>
            <Text style={styles.text}>Tipo de Vehiculo</Text>
            <Picker
              selectedValue={type}
              style={{
                color: "#FFF",
                borderRadius: 10,
                backgroundColor: "#000000c0",
              }}
              onValueChange={(itemValue) => setType(itemValue)}>
              <Picker.Item label='Seleccionar' value='null' disabled={true} />
              <Picker.Item label='Carro' value='c' />
              <Picker.Item label='Moto' value='m' />
            </Picker>
          </View>
          <View style={styles.radioButtonContent}>
            <Text style={styles.text}>Sector: </Text>
            <RadioButton.Item
              value='vip'
              label='VIP'
              status={sector === "vip" ? "checked" : "unchecked"}
              onPress={() => setSector("vip")}
              labelStyle={styles.radioButtonItem}
              color='#FFF'
            />
            <RadioButton.Item
              value='general'
              label='General'
              status={sector === "general" ? "checked" : "unchecked"}
              onPress={() => setSector("general")}
              labelStyle={styles.radioButtonItem}
              color='#FFF'
            />
          </View>
          <View style={styles.radioButtonContent}>
            <Text style={styles.text}>Llaves: </Text>
            <RadioButton.Item
              value='y'
              label='Si'
              status={keys === "y" ? "checked" : "unchecked"}
              onPress={() => setKeys("y")}
              labelStyle={styles.radioButtonItem}
              color='#FFF'
            />
            <RadioButton.Item
              value='n'
              label='No'
              status={keys === "n" ? "checked" : "unchecked"}
              onPress={() => setKeys("n")}
              labelStyle={styles.radioButtonItem}
              color='#FFF'
            />
          </View>
          <View style={[{ marginTop: 20 }, styles.campo]}>
            <Text style={styles.dateLabel}>Fecha y Hora</Text>
            <Pressable onPress={() => setOpen(true)}>
              <Text style={styles.input}>{dateFormate(dateTime)}</Text>
            </Pressable>
            <DatePicker
              modal
              style={styles.inputDate}
              open={open}
              date={dateTime}
              mode={"datetime"}
              onDateChange={(date) => setDateTime(date)}
              onConfirm={(date) => {
                setOpen(false);
                setDateTime(date);
              }}
              onCancel={() => setOpen(false)}
            />
          </View>
          <View style={styles.campo}>
            <TextInput
              placeholder='Comentarios Adicionales'
              placeholderTextColor={"#F8F9F9"}
              style={[styles.input, styles.inputComments]}
              numberOfLines={6}
              multiline={true}
              value={comments}
              onChangeText={setComments}></TextInput>
          </View>
          <Pressable style={styles.btnNewUser} onPress={handleVehicle}>
            <Text style={styles.btnTextNewUser}>Agregar</Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    padding: 20,
    margin: 15,
    width: 75,
    height: 100,
    marginBottom: 15,
  },
  backCover: {
    position: "absolute",
    marginTop: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: "rgba(52, 52, 52, alpha)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFF",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  titleBold: {
    textAlign: "center",
    fontSize: 22,
    color: "#0069a3",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#000000c0",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 8,
    marginTop: 12,
  },
  dateLabel: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 8,
  },
  campo: {
    marginHorizontal: 30,
  },
  inputComments: {
    height: 100,
  },
  inputDate: {
    borderRadius: 10,
    height: 10,
  },
  btnExit: {
    marginTop: 10,
    marginLeft: 341,
    alignItems: "flex-end",
    marginHorizontal: 20,
    backgroundColor: "#F4D73B",
    borderRadius: 100,
    padding: 5,
  },
  btnTextExit: {
    color: "#FFF",
    marginEnd: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  btnNewUser: {
    marginVertical: 50,
    backgroundColor: "#0069a3",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnTextNewUser: {
    textAlign: "center",
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 16,
  },
  radioButtonContent: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 12,
  },
  radioButtonItem: {
    color: "#FFF",
  },
  inputDate: {
    borderRadius: 10,
    height: 10,
  },
});
