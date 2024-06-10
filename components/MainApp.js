// MainApp.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MainContent from './MainContent';
import { AuthContext } from './AuthProvider';

const Stack = createNativeStackNavigator();

function MainContentWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? <MainContent /> : null;
}

function LoginScreenWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? null : <LoginScreen />;
}

export default function MainApp() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ?
          <Stack.Screen name="MainContent" component={MainContentWithAuth} /> :
          <Stack.Screen name="Login" component={LoginScreenWithAuth} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
