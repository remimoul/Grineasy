import { View, Text, SafeAreaView, TouchableOpacity,TextInput, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import style from '../style';
import { AuthContext } from './AuthProvider';

export default function MainContent() {
    const { logout } = useContext(AuthContext);
    return(
        
        <SafeAreaView className="flex-1 items-center bg-white"> 
                <Text style={[{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }, style.colorTurquoise]}>Main Content</Text>
            <TouchableOpacity
                onPress={logout}
                style={{
                    marginTop: 20,
                    backgroundColor: 'turquoise',
                    padding: 10,
                    borderRadius: 5
                }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Déconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView> 
    );
}