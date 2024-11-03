import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react';
import style from '../style';

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Chat avec un Happiness Officer</Text>
      <Text style={{ marginTop: 8, fontSize: 15 }}>Aucun Hapiness Officer à eté attribué par votre entreprise pour le moment.</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 540 }}>
        <View style={styles.chatInputContainer}>
          <TextInput style={styles.chatInput} placeholder="Tapez votre message ici..." />
          <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Message envoyé')}>
            <Text style={styles.sendButtonText}>Bientôt Disponible</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatInputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#cccccc',
    padding: 8,
    backgroundColor: 'white',
  },
  chatInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingLeft: 8,
  },
  sendButton: {
    // backgroundColor: '#007bff', // Example button color
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
  },
});
