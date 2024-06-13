import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import style from '../style';

export default function JournalScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>JOURNAL</Text>
    </SafeAreaView>
  );
}
