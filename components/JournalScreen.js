import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import style from '../style';
import { Calendar } from 'react-native-calendars';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { FontAwesome } from '@expo/vector-icons';

export default function JournalScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [entries, setEntries] = useState({});
  const [showEmotions, setShowEmotions] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const emotions = ['Triste', 'En colère', 'Fatigué', 'Heureux', 'Déprimé'];

  const handleDayPress = (day) => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    if (day.dateString === formattedCurrentDate) {
      setSelectedDate(day.dateString);
      setIsModalVisible(true);
      setUserInput(entries[day.dateString] || '');
    } else {
      // Afficher un message d'erreur ou ne rien faire
      console.error('Vous ne pouvez ajouter une émotion que pour le jour en cours.');
    }
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
          emotion: selectedEmotion,
          thoughts: userInput,
        }),
      });
      if (response.ok) {
        setEntries({ ...entries, [selectedDate]: selectedEmotion, thoughts: userInput });
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
        <View className=" items-center rounded-xl h-1/2 mx-12 my-16 bg-gray-100">
          <Text className="text-lg mt-7">Quelle est votre émotion du jour ?</Text>

          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Votre émotion du jour ?"
            value={selectedEmotion}
            onChangeText={(text) => setSelectedEmotion(text)}
            onFocus={() => setShowEmotions(true)}
            onBlur={() => setTimeout(() => setShowEmotions(false), 200)} // Cacher après 200ms d'inactivité
          />
          {showEmotions && (
            <View className="bg-white w-10/12 rounded-2xl text-green-600">
              {emotions.map((emotion, index) => (
                <Button
                  key={index}
                  title={emotion}
                  onPress={() => {
                    setSelectedEmotion(emotion);
                    setShowEmotions(false); // Fermer le menu après sélection
                  }}
                />
              ))}
            </View>
          )}

          <Text className="text-lg mt-4">Et vos pensées du jour ?</Text>
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            keyboardType="default"
            placeholder="Vos pensées du jour ?"
            value={userInput}
            onChangeText={setUserInput}
          />

          <View className="flex flex-row mt-7">
            {/* <Button title="Enregistrer" onPress={saveEntry} />
          <Button title="Annuler" onPress={() => setIsModalVisible(false)} /> */}
            <TouchableOpacity onPress={saveEntry}>
              <Text>
                <FontAwesome name="save" size={40} color="#53BECA" />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)} className="ml-16">
              <Text>
                <FontAwesome name="times-circle" size={40} color="red" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
