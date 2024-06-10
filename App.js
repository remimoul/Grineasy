import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import MainContent from './components/MainContent';
import { AuthProvider, AuthContext } from './components/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MainContentWithAuth() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation(); // Assurez-vous d'importer useNavigation

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  return user ? <MainContent /> : null;
}

function LoginScreenWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? null : <LoginScreen />;
}

export default function App() {
  const isLoggedIn = useContext(AuthContext);
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ?
          <Stack.Screen name="MainContent" component={MainContentWithAuth} /> :
          <Stack.Screen name="Login" component={LoginScreenWithAuth} />
  }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
