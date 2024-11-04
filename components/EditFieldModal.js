import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

const EditFieldModal = ({ visible, onClose, field, value, onChange, onUpdate }) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const updateUser = async () => {
    if (field === 'password' && fieldValue !== confirmPassword) {
      // Alert.alert('Error', 'Passwords do not match');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
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
        // Alert.alert('Success', 'Update successful: ' + data.message);
        Toast.show({
          type: 'success',
          text1: data.message + ' 🚀',
          text1Style: { fontWeight: 'bold', fontSize: 16 },
        });
        onUpdate();
        onClose();
      } else {
        const errorData = await response.json();
        // Alert.alert('Error', 'Update failed: ' + errorData.message);
        Toast.show({
          type: 'error',
          text1: 'Veuillez remplir tous les champs 😒',
          text1Style: { fontWeight: 'bold', fontSize: 16 },
        });
      }
    } catch (error) {
      // console.error(error);
      // Alert.alert('Error', 'An error occurred: ' + error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred: ' + error.message,
      });
    }
  };

  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View className="items-center rounded-xl h-auto py-6 mx-12 my-16 bg-gray-100">
          <Text className="text-lg mt-5 font-bold text-cyan-500">Modifier {field}</Text>
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            value={fieldValue}
            onChangeText={setFieldValue}
            placeholder={`Entrer un nouveau ${field}`}
            placeholderTextColor="#888"
            secureTextEntry={field === 'password'}
          />
          {field === 'password' && (
            <TextInput
              className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#888"
              placeholder="Confirmer le mot de passe"
              secureTextEntry={true}
            />
          )}
          <TouchableOpacity className="mt-4 p-3 rounded-lg bg-cyan-500" onPress={updateUser}>
            <Text className="text-center text-white">Mettre à jour</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text className="mt-8 text-center text-red-600">Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

export default EditFieldModal;
