import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { API_URL } from '@env';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

const EditFieldModal = ({ visible, onClose, field, value, onChange }) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const updateUser = async () => {
    if (field === 'password' && fieldValue !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const tokenResponse = await SecureStore.getItemAsync('token');
    const { token } = JSON.parse(tokenResponse);
    const decoded = jwtDecode(tokenResponse);
    const userId = decoded.id;
    try {
      const response = await fetch(`${API_URL}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: fieldValue }),
      });

      if (response.ok) {
        const data = await response.json();
        onChange(fieldValue);
        Alert.alert('Success', 'Update successful: ' + data.message);
        onClose();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', 'Update failed: ' + errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred: ' + error.message);
    }
  };

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
            value={fieldValue}
            onChangeText={setFieldValue}
            placeholder={`Enter new ${field}`}
            secureTextEntry={field === 'password'}
          />
                    {field === 'password' && (
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry={true}
            />
          )}
          <Button title="Enregistrer" style={styles.buttonText} onPress={updateUser} />
          <Button title="Annuler" onPress={onClose} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 60,
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