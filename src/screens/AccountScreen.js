import React, {useContext,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import {Button} from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import NavSwap from './NavSwap';
import { Context as AuthContext } from '../context/authContext'
//import { getPinsbythisuser } from '../context/restapi';
//import Avatar from 'react-native-boring-avatars';
const AccountScreen = ({navigation}) => {

 // const [state,signout] = useContext(AuthContext)
    const avatarcolors = ['#4B3E4D','#1E8C93','#DBD8A2','#C4AC30','#D74F33']
  useEffect(() => {
    const username =  AsyncStorage.getItem('username')
   // console.log(AsyncStorage.getAllKeys())
   },[AsyncStorage.getAllKeys()])


  const {state,signout} = useContext(AuthContext)
  return (

    <View style={styles.container}>
    <View  style={styles.header}>
      <View style={styles.settings}>
        <TouchableOpacity onPress={signout}>
        <Text style={{color:'white',paddingLeft:12,fontFamily:'InterRegular',fontSize:18}}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:24}}>
      <Text style={styles.username}>{state.username}</Text>
      </View>
      <View style={{flexDirection:'row',paddingBottom:8}}>
      <Button
      title='Existential - 16'
      titleStyle={{fontFamily:'Intermedium',fontSize:11,color:'white'}}
      buttonStyle={{backgroundColor:'#272727',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
      containerStyle={{width:110,fontFamily:'InterRegular',fontSize:8,marginBottom:12,marginRight:12}}
      />
      <Button
    title='Personal - 20'
    titleStyle={{fontFamily:'Intermedium',fontSize:11,color:'white'}}
    buttonStyle={{backgroundColor:'#272727',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
    containerStyle={{width:110,fontFamily:'InterRegular',fontSize:8,marginBottom:12,marginRight:12}}
    />
      <Button
    title='Contrast - 20'
    titleStyle={{fontFamily:'Intermedium',fontSize:11,color:'white'}}
    buttonStyle={{backgroundColor:'#02853E',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
    containerStyle={{width:110,fontFamily:'InterRegular',fontSize:8,marginBottom:12}}
    />
   </View>
    </View>
<NavSwap navigation={navigation} />


</View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  mainContent:{
    //paddingHorizontal:20,
    flexDirection:'row',
   // padding:12,
    paddingTop:24,
  },
  maintext:{
    color:'white',
    fontFamily:'InterRegular',
    opacity:0.5,
    fontSize:16,
    paddingTop:4,
    paddingLeft:8
  },
  username:{
    color:'white',
    fontFamily:'Intermedium',
    fontSize:22,
   textDecorationLine: 'underline',
    paddingTop:42,
    paddingRight:16
  },
  header:{
//    marginTop:32,
    backgroundColor:'black',
    paddingHorizontal:12
   // marginHorizontal:0

  },
  settings:{
    flexDirection:'row',
 //   alignItems:'flex-end',
    alignSelf:'flex-end',
    padding:16,
    paddingTop:54,
    marginHorizontal:0


  },
  container: {
    flex: 1,
    backgroundColor: '#101010',
    marginHorizontal:0,

  },
})
