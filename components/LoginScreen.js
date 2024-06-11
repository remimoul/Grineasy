import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, StyleSheet } from 'react-native';
import style from '../style';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Ici, vous pouvez ajouter la logique pour envoyer les données d'inscription à votre API
        console.log('Inscription avec:', email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title]}>Connexion</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Connexion" onPress={handleSignUp} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});