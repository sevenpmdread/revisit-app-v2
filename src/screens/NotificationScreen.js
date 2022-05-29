import { StyleSheet, Text, View,Image, TextInput, FlatList, ScrollView,Pressable,Modal,ToastAndroid,Dimensions,RefreshControl  } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { getnotificationsall } from '../context/restapi';
import LoadingScreennew from './Loadingnew';
import { Entypo } from '@expo/vector-icons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const NotificationScreen = ({route,navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() =>
    {
      setRefreshing(false)
    }
    );
  }, []);
  const windowHeight = Dimensions.get('window').height;
  const [notifs,setnotifs] = useState({notification:[]})
  useEffect(() => {
    let fetchData = async()=> {
      let notifications = await getnotificationsall()
      setnotifs(notifications)
    //  console.log("notificationss",notifications)
    //  setventanswers(ventquestions)
    }
    fetchData()
   // console.log("notificationss",notifs.notification)

  },[notifs]);





  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });

  return (
    <View style={{backgroundColor:'transparent',flex:1,marginBottom:0}}>
    <ScrollView
     refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>

    <LinearGradient colors={['black', '#0c0c0c',]} style={{flex:1,minHeight:1000,marginBottom:48,paddingHorizontal:0}}>
    <View style={styles.header}>
    <Text style={styles.headerText}>Notifications! 🔔</Text>
    </View>
   {
   notifs.notification.length === 0 ?
   <LoadingScreennew/>
   :
   <FlatList
contentContainerStyle={{marginLeft:8,display:'flex'}}
inverted={true}
 style={styles.feed}
data = {notifs.notification}
 snapToAlignment ="start"
 renderItem={(item)=>
{
  console.log("item",item)
  return item.item.type == "share" ?
  <View style={{backgroundColor:'#222222',marginVertical:6,padding:16,marginHorizontal:6,borderRadius:12}}>
  <View style={{flexDirection:'row',paddingBottom:8}}>
  <Entypo name="share" size={12} color="white" style={{paddingRight:6,paddingTop:4}}/>
  <Text style={{color:'white',fontSize:14,opacity:0.8}}>Share!</Text>
  </View>
  <Text style={{color:'white',fontSize:18}}> Your response "{item.item.answer.answer_text}"  was shared!</Text>
  </View> :
  item.item.type === "upvote"
  ?
  <View style={{backgroundColor:'#222222',marginVertical:6,padding:16,marginHorizontal:6,borderRadius:12}}>
  <View style={{flexDirection:'row',paddingBottom:8}}>
  <Entypo name="arrow-with-circle-up" size={12} color="white" style={{paddingRight:6,paddingTop:4}}/>
  <Text style={{color:'white',fontSize:14,opacity:0.8}}>Upvote!</Text>
  </View>
  <Text style={{color:'white',fontSize:18}}> Your question  "{item.item.question.question_text}""  was upvoted!</Text>
  </View>
  :item.item.type === "pin"
  ?
  <View style={{backgroundColor:'#222222',marginVertical:6,padding:16,marginHorizontal:6,borderRadius:12}}>
  <View style={{flexDirection:'row',paddingBottom:8}}>
  <Entypo name="pin" size={12} color="white" style={{paddingRight:6,paddingTop:4}}/>
  <Text style={{color:'white',fontSize:14,opacity:0.8}}>Pinned!</Text>
  </View>
  <Text style={{color:'white',fontSize:18}}> Your answer  "{item.item.answer.answer_text}""  was pinned!</Text>
  </View>
 :item.item.type === "response"
 ?
 <View style={{backgroundColor:'#222222',marginVertical:6,padding:16,marginHorizontal:6,borderRadius:12}}>
 <View style={{flexDirection:'row',paddingBottom:8}}>
 <Entypo name="pin" size={12} color="white" style={{paddingRight:6,paddingTop:4}}/>
 <Text style={{color:'white',fontSize:14,opacity:0.8}}>Pinned!</Text>
 </View>
 <Text style={{color:'white',fontSize:18}}> Your question  "{item.item.question.question_text}""  was has a new response - {item.item.answer_text} by {item.item.responseby}!</Text>
 </View>
 :<></>

}
 }
 keyExtractor={item => item.id}
 showsVerticalScrollIndicator={false}
 extraData={notifs}

 />}
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
