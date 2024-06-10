import {View,Text,SafeAreaView,Image,Pressable} from 'react-native';
import style from '../style';

export default function LoginScreen() {
    return(
        
        <SafeAreaView className="flex-1 items-center bg-white">
              <Image source={require('../assets/Logo-color.png')} className="mt-20 w-10/12 max-h-12"/> 
              <Text className="mt-4 text-xl font-bold" style={style.colorTurquoise}>LIBERER LE BIEN ETRE AU TRAVAIL !</Text>
              
              <View className="w-11/12 mt-32 items-center">
                <Pressable 
                  title="CONNEXION"
                  style={style.colorPinkBack}
                  className="w-10/12 py-4 mt-4 rounded"
                > 
                    <Text className="text-white text-center text-2xl font-bold">CONNEXION</Text>
                </Pressable>

                <Pressable 
                  title="S'INSCRIRE"
                  style={style.colorPinkBack}
                  className="w-10/12 py-4 mt-10 rounded"
                >
                    <Text className="text-white text-center text-2xl font-bold">S'INSCRIRE</Text>
                </Pressable>
              </View>

              <View className="w-11/12 mt-10 items-center">
                <Text className="text-lg font-bold" style={style.colorTurquoise}>NOUS CONTACTER</Text>
                <Text className="text-xl font-extrabold" style={style.colorPink}>@</Text>
                <Text className="text-lg font-bold" style={style.colorTurquoise}>grineasy@contact.com</Text>
                </View>
            <View className="flex-row w-11/12 mt-10 items-center justify-center">
               
                <Image source={require('../assets/instagram-logo.png')} />
                <Image className="ml-5" source={require('../assets/linkedin-logo.png')} />
            </View>
        </SafeAreaView>
        
        
        
        );
    }