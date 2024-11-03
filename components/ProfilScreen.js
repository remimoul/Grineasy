import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet,Modal } from 'react-native';
import React, { useContext , useState} from 'react';
import style from '../style';
import { AuthContext } from './AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditFieldModal from './EditFieldModal';

export default function ProfilScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  const openModal = (field, value) => {
    setCurrentField(field);
    setFieldValue(value);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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
          <Text style={styles.tableHeader}>Prénom</Text>
         <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Email</Text>
          <TouchableOpacity onPress={()=> openModal('email', '')}>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Password</Text>
          <TouchableOpacity onPress={()=> openModal('le mot de passe', '')}>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View>
  
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Role</Text>
          <Text style={styles.tableCell}>********</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Entreprise</Text>
          <Text style={styles.tableCell}>********</Text>
        </View>
      </View>


      {/* <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Avatar</Text>
          <TouchableOpacity>
          <Icon name='angle-right' size={32} margin={5} />
         </TouchableOpacity>
        </View> */}

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier le Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Changer le Mot de Passe</Text>
      </TouchableOpacity> */}
            <EditFieldModal
        visible={modalVisible}
        onClose={closeModal}
        field={currentField}
        value={fieldValue}
        onChange={setFieldValue}
      />
<View className="mt-64 bottom-0"> 
  <TouchableOpacity>
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
