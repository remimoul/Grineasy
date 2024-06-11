// MainApp.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MainContent from './MainContent';
import { AuthContext } from './AuthProvider';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

function MainContentWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? <MainContent /> : null;
}

function HomeScreenWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? null : <HomeScreen />;
}

export default function MainApp() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
             {!user ? (
          <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="MainContent" component={MainContentWithAuth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
