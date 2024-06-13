import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet, AppRegistry } from 'react-native';
import React, { useContext } from 'react';
import style from '../style';

export default function MainContent() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Main Content</Text>
    </SafeAreaView>
  );
}
