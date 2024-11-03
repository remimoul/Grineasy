import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from '../style';
import { API_URL } from '@env';

export default function RegisterScreen() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigation = useNavigation();

  const options = ['Employé', 'Entreprise', 'Happiness Officer'];

  const register = async () => {
    let data;
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastName: name,
          firstName: surname,
          email: email,
          password: password,
          role: selectedRole,
        }),
      });
      data = await response.json();
      if (!response.ok) {
        // Si la réponse n'est pas ok, lancez une erreur avec le message de l'API
        throw new Error(data.message || "Une erreur est survenue lors de l'enregistrement.");
      }

      // Si la réponse est ok, utilisez le message de succès de l'API ou un message par défaut
      const successMsg = data.message || 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
      Alert.alert('Inscription réussie', successMsg, [
        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }, // Utilisez navigation.navigate pour aller à la page d'accueil
      ]);
    } catch (error) {
      console.error(error.message || "Erreur lors de la communication avec l'API.");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex justify-center items-center">
        <Image source={require('../assets/logo-g.png')} />
      </View>
      <View className="items-end">
        <Image className="mr-3 -z-10" source={require('../assets/Ellipse_h.png')} />
      </View>
      <View className="bg-transparent">
        <View className="flex -mt-36 items-center z-20">
          <Text className="font-bold text-3xl">Inscription</Text>
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Nom"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Prénom"
            value={surname}
            onChangeText={setSurname}
            keyboardType="email-address"
          />

          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Votre rôle dans l'entreprise ?"
            value={selectedRole}
            onChangeText={(text) => setSelectedRole(text)}
            onFocus={() => setShowOptions(true)}
            onBlur={() => setTimeout(() => setShowOptions(false), 200)} // Cacher après 200ms d'inactivité
          />
          {showOptions && (
            <View style={style.dropdown}>
              {options.map((option, index) => (
                <Button
                  key={index}
                  title={option}
                  onPress={() => {
                    setSelectedRole(option);
                    setShowOptions(false); // Fermer le menu après sélection
                  }}
                />
              ))}
            </View>
          )}

          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="input border border-gray-300 rounded-lg p-2 w-3/4 my-2"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
          <TouchableOpacity title="Inscription" onPress={register} style={style.colorPinkBack} className="w-3/4 py-1 mt-4 rounded">
            <Text className="text-white text-center text-2xl font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image className="ml-6 mt-4 -z-10" source={require('../assets/Ellipse_b.png')} />
    </SafeAreaView>
  );
}
