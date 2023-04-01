import React, { useState } from "react";
import { UserForm } from "./src/components/UserForm";
import {
  Pressable,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { User } from "./src/components/User";
import { VehicleForm } from "./src/components/VehicleForm";
import { Vehicle } from "./src/components/Vehicle";
import { VehicleList } from "./src/components/VehicleList";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUserForm, setModalUserForm] = useState(false);
  const [modalParking, setModalParking] = useState(false);
  const [modalParkingList, setModalParkingList] = useState(false);
  const [registeredVehicles, setRegisteredVehicles] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState({});
  const [vehicle, setVehicle] = useState({});

  const editUser = (id) => {
    const editUser = registeredUsers.filter((user) => user.id === id);
    setUser(editUser[0]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Registrate en la {""}
        <Text style={styles.titleBold}>UAM</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.btnNewUser}>
        <Text style={styles.titleButton}>Nuevo Usuario</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setModalUserForm(true);
          setUser({});
        }}
        style={styles.btnNewUser}>
        <Text style={styles.titleButton}>Nuevo Usuario</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setModalParking(true);
          setVehicle({});
        }}
        style={styles.btnNewUser}>
        <Text style={styles.titleButton}>Sistema de Parqueaderos</Text>
      </Pressable>

      <Pressable
        onPress={() => setModalParkingList(true)}
        style={styles.btnNewUser}>
        <Text style={styles.titleButton}>Lista de Vehiculos</Text>
      </Pressable>

      {registeredUsers.length === 0 ? (
        <Text style={styles.textNoUser}>No hay usuarios registrados</Text>
      ) : (
        <FlatList
          style={styles.userList}
          data={registeredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <User
                item={item}
                setModalUserForm={setModalUserForm}
                editUser={editUser}
              />
            );
          }}
        />
      )}

      <VehicleList
        modalParkingList={modalParkingList}
        setModalParkingList={setModalParkingList}
        registeredVehicles={registeredVehicles}
        setModalParking={setModalParking}
        setVehicle={setVehicle}></VehicleList>

      <VehicleForm
        modalParking={modalParking}
        setModalParking={setModalParking}
        registeredVehicles={registeredVehicles}
        setRegisteredVehicles={setRegisteredVehicles}
        vehicle={vehicle}></VehicleForm>
      <UserForm
        modalUserForm={modalUserForm}
        setModalUserForm={setModalUserForm}
        registeredUsers={registeredUsers}
        setRegisteredUsers={setRegisteredUsers}
        user={user}></UserForm>
      <Modal animationType='slide' visible={modalVisible}>
        <Text>Desde modal</Text>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0069a3",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFFFFF",
  },
  titleBold: {
    fontWeight: "900",
    color: "#f4d73b",
  },
  btnNewUser: {
    backgroundColor: "#f4d73b",
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  titleButton: {
    textAlign: "center",
    fontSize: 20,
    color: "#000000",
  },
  userList: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
