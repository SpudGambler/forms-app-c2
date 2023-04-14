import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

export const Vehicle = ({
  item,
  setModalParking,
  editVehicle,
  deleteVehicle,
}) => {
  const { plate, type, sector, keys, dateTime, comments, id } = item;
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
  console.log(item);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.plateText}>{plate}</Text>
        {type === "c" ? <Text>Carro</Text> : <Text>Moto</Text>}
        {sector === "general" ? <Text>General</Text> : <Text>VIP</Text>}
        {keys === "y" ? (
          <Text>Dejó llaves</Text>
        ) : (
          <Text style={styles.noKeys}>No dejó llaves</Text>
        )}
        <Text>Fecha Ingreso: {dateFormate(dateTime)}</Text>
        <Text>
          Comentarios: {"<-"}
          {comments}
          {"->"}
        </Text>
        <View style={styles.buttons}>
          <Pressable
            style={[styles.btn, styles.btnEdit]}
            onPress={() => {
              setModalParking(true);
              editVehicle(id);
            }}>
            <Text style={styles.text}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnDeleteOne]}
            onPress={() => deleteVehicle(id)}>
            <Text style={styles.text}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 3,
    marginBottom: 3,
  },
  plateText: {
    color: "#F4D73B",
    fontSize: 25,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  content: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    borderRadius: 40,
    flex: 1,
    backgroundColor: "rgba(0, 105, 163, 1)",
    padding: 20,
    margin: 10,
  },
  noKeys: {
    color: "#a60000",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: "#0090D0",
  },
  btnDeleteOne: {
    backgroundColor: "#E63D17",
  },
});
