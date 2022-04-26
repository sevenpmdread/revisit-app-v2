import React,{useState,useRef,useEffect,useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,Button,
  SafeAreaView, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons'
import { Card, withTheme } from 'react-native-elements';
import NavLink from '../comps/NavLink'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { fonts } from 'react-native-elements/dist/config';
import Questionofday from '../comps/Questionofday';
import CategoryQuestion from '../comps/CategoryQuestions';
import { quesdescs } from '../dummydata';
import CardSpacer from '../comps/CardSpacer';
import { withNavigation } from 'react-navigation'
import * as Notifications from 'expo-notifications';
import { Context } from '../context/authContext';
import LoadingScreennew from './Loadingnew';
import { fetchHomedata } from '../context/restapi';
import PushNotification from 'react-native-push-notification';
import { setReminders } from '../context/restapi';

const NewHomeScreen = ({navigation}) => {
  const createChannel  = () => {
    PushNotification.createChannel({
      channelId:'test1',
      channelName:'channelInitial'
    },

    )

  }

  const newnotificationhandler = (item) => {
    PushNotification.localNotification({
      channelId:'test1',
      title:"You cicked on " + item,
      message:"timer set"
    })
  }

  const {state} = useContext(Context)
  const [isLoading,setLoading] = useState(false)
 // const [username,setusername] = useState('')
  const [arrdata,setdata] = useState(null)
  var categoryquesnew = []
  useEffect(() => {

    //setReminders()
   const  fetchHome = async() => {

    //  const data  = await AsyncStorage.getItem('homedate')
    //  if(data)
    //  {
    //    response = JSON.parse(data)
    //    console.log("in asyncstorage")
    //  }
    //  else
    let response = await fetchHomedata()
    // console.log("RESPONSE RESPONSE",response)
     var categorycount = response.nbHits
    //",response)
     for(let i = 0; i <  categorycount;i++)
     {
      let obj = {}
      obj.type = response.questions[i]._id
      obj.questions = response.questions[i].questions
      obj.desc = response.questions[i].questions[0].desc
      categoryquesnew[i] = obj
    //  console.log("obj",obj)
     }
    // console.log("in effect",categoryquesnew)
     setdata(categoryquesnew)
    // setusername(state.username)
    // console.log(username)
     setLoading(true)
   }

    //console.log("state.homescreendata.questions",state)
    fetchHome()
    createChannel()

   },[isLoading])

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      icon:"./assets/notification-icon.png",
      title: "I have created my own personal hell, one step at a time I have reversed into complete ...",
      body: 'Would you like to update this response on "What are you going through right now?"',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);


  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Revisit',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   //console.log(arrdata)
  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;
  return   (

    <ScrollView  style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
    <View style={styles.container}>
    <View style={styles.header}>
    <TouchableOpacity  onPress={async () => {
          await schedulePushNotification();
        }}>
    <Text style= {styles.headerTitle}>Hi, {state.username}!</Text>
    </TouchableOpacity>
    <Feather name="bell" size={24} color="white" style={{marginTop:10}} onPress={()=>newnotificationhandler('hI')}/>
    </View>
    <Questionofday/>
    <CardSpacer/>
    {
      isLoading ?
      <FlatList
      data={arrdata}
      renderItem={(item)=>
      {
       return <CategoryQuestion type={item.item.type} desc={item.item.desc} questions={item.item.questions} navigation={navigation}/>}
      }
      keyExtractor={item => item.type}
      /> :




      <LoadingScreennew/>

    }
    </View>
    </ScrollView>

  )

};

export var arrdata

export default withNavigation(NewHomeScreen);



const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    marginTop:16,
    //opacity:0.6,
    height:32,
    width:100,
    padding:4,
    color:"black",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    marginBottom:32

  },
  qod:{
    color:'white',
    fontSize:12,
    opacity:0.8,
    marginBottom:6,
  //  fontFamily:'InterRegular'
  },
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    paddingHorizontal:16
  },
  header:{
    paddingTop:24,
    paddingBottom:16,
    alignItems:"flex-start",
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingLeft:16,
   // paddingRight:16,
  },
  headerTitle:{
    color:'white',
    fontSize:24,
  //  fontFamily:'Intermedium',

  },
  card:{
    borderWidth:4,
    borderColor:'black',
    backgroundColor:'black'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 28,
   //fontFamily:'Intermedium',
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    opacity:1

  },
  questionrow: {
    paddingTop:20,
    flexDirection:'row',
    paddingBottom:12

  },
})
