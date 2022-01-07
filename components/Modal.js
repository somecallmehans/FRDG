import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormModal = (props) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.containerView}>
      <Modal
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={styles.containerView}>
          <View style={styles.modalView}>
            <Text>I'm a modal</Text>
            <Pressable onPress={() => setShow(!show)}>
              <Text>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Ionicons name="ios-add" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.75,
    borderBottomColor: "lightgray",
    borderTopWidth: 0.75,
    borderTopColor: "lightgray",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FormModal;
