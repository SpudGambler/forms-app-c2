import React, { useState } from "react";
import { FlatList } from "react-native";
import {
  Image,
  Text,
  Modal,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { Vehicle } from "./Vehicle";

export const VehicleList = ({
  modalParkingList,
  setModalParkingList,
  registeredVehicles,
  setRegisteredVehicles,
  setModalParking,
  setVehicle,
}) => {
  const editVehicle = (id) => {
    const editVehicle = registeredVehicles.filter(
      (vehicle) => vehicle.id === id
    );
    setVehicle(editVehicle[0]);
  };

  const deleteVehicle = (id) => {
    const newRegisteredVehicles = registeredVehicles.filter(
      (vehicle) => vehicle.id !== id
    );
    setRegisteredVehicles(newRegisteredVehicles);
  };
  return (
    <Modal animationType='slide' visible={modalParkingList}>
      <ImageBackground
        source={require("../assets/jpg/dev3.jpg")}
        resizeMode='stretch'
        style={styles.backCover}>
        <Pressable
          style={styles.btnExit}
          onPress={() => setModalParkingList(false)}>
          <Text style={styles.btnTextExit}>X</Text>
        </Pressable>
        <Image
          style={styles.image}
          source={require("../assets/png/Logos_UAM-08.png")}
        />
        {registeredVehicles.length === 0 ? (
          <Text style={styles.textNoUser}>No hay vehiculos registrados</Text>
        ) : (
          <FlatList
            data={registeredVehicles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Vehicle
                  item={item}
                  setModalParking={setModalParking}
                  editVehicle={editVehicle}
                  deleteVehicle={deleteVehicle}
                />
              );
            }}
          />
        )}
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
    backgroundColor: "rgba(52, 52, 52, 0.5)",
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
