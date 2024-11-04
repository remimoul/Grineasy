import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import style from '../style';
import { AuthContext } from './AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditFieldModal from './EditFieldModal';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

export default function ProfilScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [getDataProfil, setDataProfil] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const openModal = (field) => {
    setCurrentField(field);
    setFieldValue(profileData[field]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFieldChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const { logout } = useContext(AuthContext);


    const fetchProfileData = async () => {
      const tokenResponse = await SecureStore.getItemAsync('token');
      const { token } = JSON.parse(tokenResponse);
      const decoded = jwtDecode(tokenResponse);
      const userId = decoded.id;

      try {
        const response = await fetch(`${API_URL}/user/get/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDataProfil({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            company_name: data.company_name,
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching profile data:', error);
      }
    };

    useEffect(() => {
    fetchProfileData();
  }, []);

  const deleteAccount = async () => {
    const tokenResponse = await SecureStore.getItemAsync('token');
    const { token } = JSON.parse(tokenResponse);
    const decoded = jwtDecode(tokenResponse);
    const userId = decoded.id;

    try {
      const response = await fetch(`${API_URL}/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Account deleted:', data.message);
        logout();
      } else {
        const errorData = await response.json();
        Alert.alert(errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the account:', error.message);
      Alert.alert(error.message);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: deleteAccount },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="flex flex-row items-center px-5">
        <Text className="px-7" style={[{ fontSize: 35, fontWeight: 'bold' }, style.colorTurquoise]}>
          Profil
        </Text>
        <TouchableOpacity className="rounded-xl p-2" style={style.colorBlueBack} onPress={logout}>
          <Text className="text-center text-white">Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 w-full">
        <View className="mt-5">
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Nom</Text>
            <Text style={styles.tableCell}>{getDataProfil.lastName}</Text>
            <TouchableOpacity onPress={() => openModal('lastName')}>
              <Icon name="angle-right" size={32} margin={5} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Prénom</Text>
            <Text style={styles.tableCell}>{getDataProfil.firstName}</Text>
            <TouchableOpacity onPress={() => openModal('firstName')}>
              <Icon name="angle-right" size={32} margin={5} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Email</Text>
            <Text style={styles.tableCell}>{getDataProfil.email}</Text>
            <TouchableOpacity onPress={() => openModal('email')}>
              <Icon name="angle-right" size={32} margin={5} />
            </TouchableOpacity>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Password</Text>
            <TouchableOpacity onPress={() => openModal('password')}>
              <Icon name="angle-right" size={32} margin={5} />
            </TouchableOpacity>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Role</Text>
            <Text style={styles.tableCell}>{getDataProfil.role}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Entreprise</Text>
            <Text style={styles.tableCell}>{getDataProfil.company_name}</Text>
          </View>
        </View>

        <EditFieldModal
          visible={modalVisible}
          onClose={closeModal}
          field={currentField}
          value={fieldValue}
          onUpdate={fetchProfileData}
          onChange={(value) => {
            setFieldValue(value);
            handleFieldChange(currentField, value);
          }}
        />
        <View className="mt-64 bottom-0">
          <TouchableOpacity onPress={confirmDeleteAccount}>
            <Text className="text-center text-red-600">Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'turquoise',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 2,
    padding: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
});
