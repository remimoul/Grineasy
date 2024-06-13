import React, { useState,useContext } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from './AuthProvider';
import style from '../style';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    
const handleSignUp = () => {
    login(email, password);
  };

    return (
        <SafeAreaView >
            <View className="flex justify-center items-center">
                <Image source={require('../assets/logo-g.png')} />
            </View>
            <View className="items-end">

            <Image className="mr-3" source={require('../assets/Ellipse_h.png')}  />
        </View>
        <View className="bg-transparent">
            <View className="flex justify-center items-center z-20">
            <Text className="font-bold text-3xl">Bienvenue</Text>
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
            <TouchableOpacity title="Connexion" onPress={handleSignUp} style={style.colorPinkBack} className="w-3/4 py-1 mt-4 rounded">
                <Text className="text-white text-center text-2xl font-bold">Connexion</Text>
            </TouchableOpacity>
        </View>
        </View>
            <Image className="ml-6 mt-4" source={require('../assets/Ellipse_b.png')}  />
        </SafeAreaView>
    );
}