import React from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

export const User = ({ item, setModalUserForm, editUser }) => {
  const { userName, date, id } = item;
  const dateFormate = (date) => {
    const newDate = new Date(date);
    const optionsFormate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("es-ES", optionsFormate);
  };
  //console.log(item);
  return (
    <View style={styles.content}>
      <Text style={styles.label}>Paciente: </Text>
      <Text style={styles.text}>{userName}</Text>
      <Text style={styles.dateFormat}>{dateFormate(date)}</Text>
      <View style={styles.buttons}>
        <Pressable
          style={[styles.btn, styles.btnEdit]}
          onPress={() => {
            setModalUserForm(true);
            editUser(id);
          }}>
          <Text style={styles.text}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnDeleteOne]}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  label: {
    color: "#000000",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  dateFormat: {
    color: "#000000",
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
