import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet, AppRegistry, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import style from '../style';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export default function MainContent() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        // Ensure token is not null or undefined
        const decoded = jwtDecode(token); // Now passing the actual token string
        const name = decoded.firstName; // Obtenez le nom de l'utilisateur
        setUserName(name); // Mettez à jour l'état avec le nom de l'utilisateur
      }
    };

    fetchToken();
    console.log('userName:', userName);
  }, [userName]);

  // Formattez la date comme exemple "jeudi 16 juin 2024"
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', // "jeudi"
    day: 'numeric', // "16"
    month: 'long', // "juin"
    year: 'numeric', // "2024"
  });

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Bonjour, </Text>
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
          <View className="flex justify-center items-center">
            <Image source={require('../assets/woman.png')} />
          </View>
          <TouchableOpacity className="rounded-xl p-2 mt-2" style={style.colorTurquoiseBack}>
            <Text className="text-center text-white">Bientôt Disponible</Text>
          </TouchableOpacity>
        </View>

        <View className="w-1/2 rounded-xl p-2 ml-2" style={style.colorBlueBack}>
          <Text className="text-center mt-5 font-bold ">Bien être & relaxation</Text>

          <View className="flex justify-center items-center">
            <Image source={require('../assets/womanmedit.png')} />
          </View>
          <TouchableOpacity className="rounded-xl p-2 mt-2" style={style.colorTurquoiseBack}>
            <Text className="text-center text-white">Bientôt Disponible</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-col rounded-xl p-2 mx-2 mt-2" style={style.colorBlueBack}>
        <Text className="text-center font-bold ">Activités Sportive</Text>
        <Text className="text-center mt-1 text-base mb-1">Pose de l'enfant</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>• </Text>
          <Text>Mets-toi à genoux sur le sol.</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>• </Text>
          <Text>Penche-toi en avant en tendant tes bras devant toi et en posant ton front par terre. Respire profondément et détends-toi.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
