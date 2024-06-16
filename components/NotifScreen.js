import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react';
import style from '../style';

export default function NotifScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Notification</Text>
      <Text style={{ marginTop: 20, fontSize: 15 }}>Vous n'avez pas de notification pour le moment.</Text>
    </SafeAreaView>
  );
}
