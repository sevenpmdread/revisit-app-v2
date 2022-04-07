import React, {useEffect,useContext} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/authContext'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import LottieView from "lottie-react-native";
const LoadingScreen = () => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });

  const {tryLocalSignin} = useContext(AuthContext)

  useEffect(() => {
   tryLocalSignin()
  },[])
  return (
    <View style={styles.container}>
        <LottieView
        source={require("../../assets/loading.json")}
        style={styles.animation}
        autoPlay
      />

    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  animation:{
    alignSelf:'center',
    marginHorizontal:100,
    marginTop:100,
    width: 100,
    height: 100,
    backgroundColor:'transparent'
  },
  container:{
    flex:1,
    backgroundColor:'#121212'
  },
  loadinginput:{
    color:'white',
    opacity:0.3,
    fontSize:18,
    fontFamily:'InterRegular',
    alignContent:'center',
    alignSelf:'center',
    marginHorizontal:10,
    marginTop:650,
    textAlignVertical:'center'

  }
})
