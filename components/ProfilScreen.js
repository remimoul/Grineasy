import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import style from '../style';
import { AuthContext } from './AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProfilScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="flex flex-row items-center px-5">
      <Text className="px-7" style={[{ fontSize: 35, fontWeight: 'bold' }, style.colorTurquoise]}>Profil</Text>
      <TouchableOpacity className="rounded-xl p-2" style={style.colorBlueBack}>
            <Text className="text-center text-white">Déconnexion</Text>
          </TouchableOpacity>
      </View>


<View className="px-5 w-full">
      <View className="mt-5">
        <View style={styles.tableRow}>
          
          <Text style={styles.tableHeader}>Nom</Text>
         <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Email</Text>
          <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Password</Text>
          <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Avatar</Text>
          <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier le Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Changer le Mot de Passe</Text>
      </TouchableOpacity> */}
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
});
