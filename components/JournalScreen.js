import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import style from '../style';
import { Calendar } from 'react-native-calendars';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export default function JournalScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [entries, setEntries] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsModalVisible(true);
    setUserInput(entries[day.dateString] || '');
  };

  const saveEntry = async () => {
    try {
        // Récupérer le token
      const token = await SecureStore.getItemAsync('token');
      let userId;
    // Décoder le token pour obtenir l'ID de l'utilisateur
      if (token) {
        try {
          const decoded = jwtDecode(token);
          userId = decoded.id;
        } catch (error) {
          console.error('Error decoding token:', error);
          return;
        }
      } else {
        console.error('Token is not available');
        return;
      }

      if (!userId) {
        console.error('User ID is undefined');
        return;
      }

      const response = await fetch('https://grineasy-api-e4fd78b384a5.herokuapp.com/journal/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          date: selectedDate,
          emotion: userInput,
          thoughts: '',
        }),
      });
      if (response.ok) {
        setEntries({ ...entries, [selectedDate]: userInput });
        setIsModalVisible(false);
      } else {
        console.error('An error occurred while saving the entry-1-');
      }
    } catch (error) {
      console.error('An error occurred while saving the entry-2-');
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }, style.colorTurquoise]}>Calendrier Emotionnel</Text>
      <Calendar
        onDayPress={handleDayPress}
        style={{
          height: 350,
          width: 360,
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#735BF2',
          selectedDayTextColor: '#735BF2',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e',
          indicatorColor: 'blue',
        }}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            className="input border border-gray-300 rounded-lg w-3/4 h-1/6 bg-gray-100"
            keyboardType="default"
            placeholder="Votre émotion du jour"
            value={userInput}
            onChangeText={setUserInput}
          />

          <Button title="Enregistrer" onPress={saveEntry} />
          <Button title="Annuler" onPress={() => setIsModalVisible(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
