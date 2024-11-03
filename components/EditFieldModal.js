import React from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet,SafeAreaView } from 'react-native';
import style from '../style';
const EditFieldModal = ({ visible, onClose, field, value, onChange }) => {
  return (
    <SafeAreaView>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Modifier {field}</Text>
        <TextInput
          style={styles.input}
          placeholder={field}
          value={value}
          onChangeText={onChange}
        />
        <Button title="Enregistrer" style={styles.buttonText} onPress={onClose} />
        <Button title="Annuler" onPress={onClose} />
      </View>
    </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop:60,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default EditFieldModal;