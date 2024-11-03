import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import style from '../style';
import { Calendar } from 'react-native-calendars';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-toast-message';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function JournalScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [entries, setEntries] = useState({});
  const [showEmotions, setShowEmotions] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [journal, setJournal] = useState([]);
  const [bar, setBar] = useState([]);
  const emotions = ['Triste', 'En colère', 'Fatigué', 'Heureux', 'Déprimé'];

  const chartConfig = {
    backgroundGradientFrom: '#9ACEEB',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(144,0,204, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      strokeWidth: 0, // Définir à 0 pour cacher les lignes de l'arrière-plan
    },
    propsForHorizontalLabels: {
      display: 'none', // Cacher les labels verticaux
    },
  };

  const screenWidth = Dimensions.get('window').width;

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Enregistrer👋',
      topOffset: 80,
    });
  };

  const data = {
    labels: ['Triste', 'En colère', 'Fatigué', 'Heureux', 'Déprimé'], // Les émotions
    datasets: [
      {
        data: [5, 2, 10, 4, 3], // Nombre d'occurrences de chaque émotion pour la semaine
      },
    ],
  };

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const tokenResponse = await SecureStore.getItemAsync('token');
        if (!tokenResponse) {
          console.error('Token not found');
          return;
        }
        // Parser la réponse pour obtenir le token en string
        const { token } = JSON.parse(tokenResponse);
        if (!token) {
          console.error('Token property not found in response');
          return;
        }

        // Décoder le token pour obtenir l'ID de l'utilisateur
        const decoded = jwtDecode(tokenResponse); // Décoder le token
        const user_id = decoded.id;

        const response = await fetch(`${API_URL}/journal/get/${user_id}`, {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des émotions, Veuillez vous reconnecter Token Expiré');
        }

        const data = await response.json();
        setJournal(data);
        // const emotions = data.map((entry) => entry.emotion);
        // console.log('Émotions récupérées:', emotions);
        console.log('Journal:', data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEmotions();
  }, []);

  // Fonction pour gérer le clic sur un jour du calendrier
  const handleDayPress = (day) => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    if (day.dateString === formattedCurrentDate) {
      setSelectedDate(day.dateString);
      setIsModalVisible(true);
      setUserInput(entries[day.dateString]?.thoughts || '');
      setSelectedEmotion(entries[day.dateString]?.emotion || '');
    } else {
      // Afficher un message d'erreur ou ne rien faire
      console.error('Vous ne pouvez ajouter une émotion que pour le jour en cours.');
    }
  };

  // Fonction pour enregistrer une entrée dans le calendrier
  const saveEntry = async () => {
    try {
      if (selectedEmotion === '') {
        console.error('Veuillez sélectionner une émotion');
        return;
      } else {
        console.log("Enregistrement de l'émotion:", selectedEmotion);
      }

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

      const response = await fetch(`${API_URL}/journal/send`, {
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
        setEntries({ ...entries, [selectedDate]: selectedEmotion });
        setIsModalVisible(false);
        console.log('Entrée ajoutée avec succès');
      } else {
        console.error('An error occurred while saving the entry-1-');
      }
    } catch (error) {
      console.error('An error occurred while saving the entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      const tokenResponse = await SecureStore.getItemAsync('token');
      const decoded = jwtDecode(tokenResponse); // Décoder le token
      const user_id = decoded.id;
      if (!tokenResponse) {
        console.error('Token not found');
        return;
      }
      const { token } = JSON.parse(tokenResponse);
      if (!token) {
        console.error('Token property not found in response');
        return;
      }

      const response = await fetch(`${API_URL}/journal/delete/${user_id}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'entrée");
      }

      // Mettre à jour l'état du journal après la suppression
      setJournal((prevJournal) => ({
        ...prevJournal,
        data: prevJournal.data.filter((entry) => entry.id !== id),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }, style.colorTurquoise]}>Journal Emotionnel</Text>
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

      <View>
        <Text className="text-lg mb-5 font-bold mt-7" style={style.colorTurquoise}>
          Emotions de la semaine 🙂​
        </Text>
      </View>

      <View className="flex items-center justify-center mt-1 mr-10">
        <BarChart data={data} width={screenWidth} height={200} yAxisLabel="" chartConfig={chartConfig} />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View className=" items-center rounded-xl h-auto py-6 mx-12 my-16 bg-gray-100 ">
          <Text className="text-lg mt-5 font-bold" style={style.colorTurquoise}>
            🌞​ Journée du : {selectedDate}
          </Text>
          <Text className="text-base mt-7 font-bold">Quelle est votre émotion du jour ?</Text>

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

          <Text className="text-base mt-4 font-bold">Et vos pensées du jour ?</Text>
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            keyboardType="default"
            placeholder="Vos pensées du jour ?"
            value={userInput}
            onChangeText={setUserInput}
          />

          <Text className="text-lg font-bold mt-7" style={style.colorTurquoise}>
            Emotion/pensées enregistrée
          </Text>
          <Text className="text-lg mt-4">Emotions</Text>

          {journal.data && journal.data.length > 0 && selectedDate ? (
            <View className="flex flex-col w-full">
              {journal.data.map((entry, index) => (
                <View key={index} className="flex flex-row items-center mb-2 px-3 w-full">
                  <Text className="text-sm flex-1">{entry.emotion}</Text>
                  {/* <TouchableOpacity onPress={() => handleUpdate(entry.id)} className="ml-2">
                    <Icon name="edit" size={22} color="#53BECA" />
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => handleDelete(entry.id)} className="ml-2">
                    <Icon name="trash" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-sm">Aucune emotion enregistrer ce jour</Text>
          )}

          <Text className="text-lg mt-2">Pensées</Text>

          {journal.data && journal.data.length > 0 && selectedDate ? (
            <View className="flex flex-col w-full">
              {journal.data.map((entry, index) => (
                <View key={index} className="flex flex-row items-center mb-2 px-3 w-full">
                  <Text className="text-sm flex-1">{entry.thoughts}</Text>
                  {/* <TouchableOpacity onPress={() => handleUpdate(entry.id)} className="ml-2">
                    <Icon name="edit" size={22} color="#53BECA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(entry.id)} className="ml-2">
                    <Icon name="trash" size={22} color="red" />
                  </TouchableOpacity> */}
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-sm">Aucune pensées enregistrer ce jour</Text>
          )}

          <View className="flex flex-row mt-7">
            <TouchableOpacity
              onPress={() => {
                saveEntry();
                showToast();
              }}
              className="mt-4 p-3 rounded-lg"
              style={{ backgroundColor: '#53BECA' }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Sauvegarder</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)} className="ml-16 mt-4 p-3 rounded-lg" style={{ backgroundColor: 'red' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}> Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
}
