import {View,Text,SafeAreaView,Image,Button} from 'react-native';

export default function LoginScreen() {
    return(
        
        <SafeAreaView className="flex items-center bg-white ">
              <Image source={require('../assets/Logo-color.png')} className="w-10/12 max-h-12"/> 
              <Text className="mt-4 text-xl font-bold">LIBERER LE BIEN ETRE AU TRAVAIL !</Text>
              
              <View className="w-11/12 mt-12">
                <Button 
                  title="CONNEXION"
                  className="bg-white border border-red-300 text-gray-800 w-full py-3 rounded"
                />
                <Button 
                  title="S'INSCRIRE"
                  className="bg-blue-600 text-white w-full py-3 mt-4 rounded"
                />
              </View>
        </SafeAreaView>
        
        
        
        );
    }