import { StyleSheet, Text, View,Image, TextInput, FlatList, ScrollView,Pressable,Modal,ToastAndroid,Dimensions  } from 'react-native'
import React,{useState,useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import messaging from '@react-native-firebase/messaging';

const NotificationScreen = ({route,navigation}) => {
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const checkMessage = async () => {
      messaging().onMessage(async remoteMessage => {
        console.log('[FCMService] a new FCM message arrived!', remoteMessage);
        if (remoteMessage) {
         let notification = null;
        notification = remoteMessage.notification;
        console.log(notification)
         //onNotification(notification);
        }
       })
     }
    checkMessage();
  });





  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });

  return (
    <View style={{backgroundColor:'transparent',flex:1,marginBottom:0}}>
    <ScrollView>

    <LinearGradient colors={['black', '#0c0c0c',]} style={{flex:1,minHeight:1000,marginBottom:48,paddingHorizontal:0}}>
    <View style={styles.header}>
    <Text style={styles.headerText}>Notifications! 🔔</Text>
    </View>

    </LinearGradient>
    </ScrollView>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  ventsecondinput:{
    fontFamily:'InterRegular',
    fontSize:18,
    opacity:0.9,
    fontStyle:'normal',
    color:'white',
  },
  secondinput:{
    fontFamily:'Intermedium',
    fontSize:36,
    opacity:0.9,
    fontStyle:'italic',
    color:'white',
   // padding:12

  },
  answerinput:{
    fontFamily:'InterRegular',
    fontSize:16,
   // opacity:0.7,
    color:'white',
   // padding:12

  },
  ventquestionadd:{
    padding:18,
    borderBottomWidth:2,
    borderBottomColor:'grey',
    marginHorizontal:16,
    marginTop:20,
    flexDirection:'column',
    justifyContent:'space-between'
  },


  questionadd:{
   // minHeight:70,
   // paddingHorizontal:20,
    //paddingVertical:12,
   // marginHorizontal:20,
  // borderColor:'#303030',
  // borderWidth:2,
    marginTop:10,
    padding:24,
    marginHorizontal:24,
    marginTop:50,
    //fontFamily:'Intermedium',
    //fontSize:24,
   //borderWidth:2,
    //elevation:5,
   // backgroundColor:'#1A1A1A',
    //opacity:0.9,
    //borderTopLeftRadius:16,
    //borderTopRightRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  answeradd:{
    minHeight:180,
    marginHorizontal:16,
    paddingHorizontal:20,
    paddingVertical:6,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  textArea:{
    paddingTop:4,
    width:210,
    paddingLeft:15
  },
  discoverCard:{
    backgroundColor:'transparent',
    marginHorizontal:0,
    borderRadius:20,
    flexDirection:'row',
    borderWidth:0,
    padding:16,

    elevation:5,
    marginTop:20,
    marginBottom:6
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal:16
  },
  header:{
    marginTop:20,
    padding:12
  },
  headerText:{
    fontFamily:'Intermedium',
    fontSize:16
  },
  headernew:{
    marginTop:0,
    height:80,
    padding:12,
    backgroundColor: '#222222',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  maincontent:{
    backgroundColor: '#0C0C0C',
    flex:1

  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  },
  anoncenteredView:{
   justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#453AB8",
    //opacity:0.95,
    borderWidth:2,
    borderColor:'white',
    height:300,
    marginTop: 200,
   // width:300,
    borderRadius:12,
  //  height:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
  }},
  centeredView: {
    flex: 1,
   // justifyContent: "center",
   // alignItems: "center",
    marginTop: 0,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
   // elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "transparent",
    marginLeft:6
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  postmodalText: {
    marginBottom: 40,
    marginTop:16,
    textAlign: "center",
    color:'white'

  },
  postcenteredView: {
   // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0C0C0C",
    opacity:0.95,
    borderWidth:2,
    borderColor:'white',
    height:300,
    marginTop: 200,
   // width:300,
    borderRadius:12,
  //  height:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  anonpostmodalView:{
    margin: 20,
    backgroundColor: "#453AB8",
    borderRadius: 12,
    padding: 5,
    alignItems: "center",
  },
  postmodalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 5,
    alignItems: "center",
  },
})
