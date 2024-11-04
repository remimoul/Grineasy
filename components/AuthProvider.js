import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    // Récupérer le token au démarrage de l'application
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('token');
        if (userToken) {
          setUser(JSON.parse(userToken)); // Assurez-vous que le token est stocké sous forme de string JSON
        }
      } catch (e) {
        // Restaurer le token a échoué
        console.error('Restoring token failed', e);
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (!tokenChecked) {
      const checkTokenStorage = async () => {
        try {
          const token = await SecureStore.getItemAsync('token');
          if (token !== null) {
            console.log('Token found:', token);
            // Ici, vous pouvez également mettre à jour l'état de l'utilisateur
            // en fonction du token récupéré si nécessaire.
          } else {
            console.log('No token found');
          }
        } catch (error) {
          console.error('Error fetching token from storage:', error);
        }
      };

      checkTokenStorage();
      setTokenChecked(true); // Empêche les appels futurs
    }
  }, [tokenChecked]); // Dépend de tokenChecked pour éviter les appels répétitifs

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Connexion réussie:', data);
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: data.message,
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 16 },
          topOffset: 80,
        });
        await SecureStore.setItemAsync('token', JSON.stringify(data));
        setUser(data);
      } else {
        console.log('Erreur de connexion:', data.message);
        Toast.show({
          type: 'error',
          text1: 'Erreur de connexion',
          text2: data.message,
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 16 },
          topOffset: 80,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la connexion',
        text2: error.message,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 16 },
        topOffset: 80,
      });
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setUser(null);
    } catch (e) {
      console.error('Deleting token failed', e);
      Toast.show({
        type: 'error',
        text1: 'Erreur de déconnexion',
        text2: e.message,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 16 },
        topOffset: 80,
      });
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
