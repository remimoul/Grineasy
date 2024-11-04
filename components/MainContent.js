import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet, AppRegistry, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import style from '../style';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

export default function MainContent() {
  const [userName, setUserName] = useState('');
  const fetchToken = async () => {
    const tokenResponse = await SecureStore.getItemAsync('token');
    // Parser la réponse pour obtenir le token en string
    const { token } = JSON.parse(tokenResponse);
    const decoded = jwtDecode(tokenResponse); // Décoder le token
    const user_id = decoded.id;
    if (!token) {
      console.error('Token property not found in response');
      return;
    }
    if (token) {
      const response = await fetch(`${API_URL}/user/get/${user_id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const name = data.firstName; // Assurez-vous que la réponse contient le prénom de l'utilisateur
        setUserName(name); // Mettez à jour l'état avec le nom de l'utilisateur
      } else {
        console.error('Failed to fetch user data');
      }
    }
  };

  fetchToken();

  // Formattez la date comme exemple "jeudi 16 juin 2024"
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', // "jeudi"
    day: 'numeric', // "16"
    month: 'long', // "juin"
    year: 'numeric', // "2024"
  });

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Bonjour, {userName}</Text>
      <View className="rounded-xl p-2 mt-5" style={style.colorTurquoiseBack}>
        <Text className="font-bold text-lg ">{today}</Text>
      </View>

      <View className="flex mt-5 rounded-xl p-3 mx-2" style={style.colorBlueBack}>
        <Text className="text-center text-base font-bold">
          Votre santé mentale est une priorité. Votre bonheur est essentiel. Prendre soin de soi est une nécessité.
        </Text>
      </View>

      <View className="flex flex-row mt-4 mx-3">
        <View className="w-1/2 rounded-xl p-2" style={style.colorBlueBack}>
          <Text className="text-center mt-5 font-bold">Analyse du sommeil</Text>
          <Text className="text-center text-lg font-bold mt-1">7h 30mn</Text>
          <View className="flex justify-center items-center mt-12">
            <Image source={require('../assets/woman.png')} />
          </View>
          <TouchableOpacity className="rounded-xl p-2 mt-8 bg-slate-500">
            <Text className="text-center ">Bientôt Disponible</Text>
          </TouchableOpacity>
        </View>

        <View className="w-1/2 rounded-xl p-2 ml-2" style={style.colorBlueBack}>
          <Text className="text-center mt-5 font-bold">Bien être & relaxation</Text>

          <View className="flex justify-center items-center mt-12">
            <Image source={require('../assets/womanmedit.png')} />
          </View>
          <TouchableOpacity className="rounded-xl p-2 mt-8 bg-slate-500">
            <Text className="text-center ">Bientôt Disponible</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-col rounded-xl p-2 mx-3 mt-4 text-white" style={style.colorBlueBack}>
        <Text className="text-center font-bold mb-2">Activités Sportive</Text>

        <View className="mb-4">
          <Text className="text-center text-base mb-1">Pose de l'enfant</Text>
          <View className="flex flex-row items-center mb-1">
            <Text>• </Text>
            <Text>Mets-toi à genoux sur le sol.</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Text>• Penche-toi en avant en tendant tes bras devant toi et en posant ton front par terre. Respire profondément et détends-toi.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
