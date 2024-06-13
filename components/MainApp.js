// MainApp.js
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MainContent from './MainContent';
import { AuthContext } from './AuthProvider';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import JournalScreen from './JournalScreen';
import ChatScreen from './ChatScreen';
import NotifScreen from './NotifScreen';
import ProfilScreen from './ProfilScreen';
import style from '../style';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainContentWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? <MainContent /> : null;
}

function HomeScreenWithAuth() {
  const { user } = useContext(AuthContext);
  return user ? null : <HomeScreen />;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconPath;

          if (route.name === 'MainContent') iconPath = require('../assets/logo-g.png');
          else if (route.name === 'Chat') iconPath = require('../assets/icon-msg.png');
          else if (route.name === 'Notif') iconPath = require('../assets/icon-notif.png');
          else if (route.name === 'Profil') iconPath = require('../assets/icon-people.png');
          else if (route.name === 'Journal') iconPath = require('../assets/icon-cal.png');

          return <Image source={iconPath} style={{ width: 40, height: 45 }} />;
        },
        tabBarStyle: style.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Journal" component={JournalScreen} />
      <Tab.Screen options={{ headerShown: false }} name="MainContent" component={MainContent} />
      <Tab.Screen options={{ headerShown: false }} name="Notif" component={NotifScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function MainApp() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />

            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="MainContent" component={MainContentWithAuth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
