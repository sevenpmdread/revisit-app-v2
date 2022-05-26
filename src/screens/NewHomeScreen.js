import React,{useState,useRef,useEffect,useContext,useCallback} from 'react';
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
  ToastAndroid,Modal,Pressable,RefreshControl
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
import LinearGradient from 'react-native-linear-gradient';
import TrendingAnswers from '../comps/TrendingAnswers';
import { storeventnew,getventall,getvent } from '../context/restapi';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const NewHomeScreen = ({navigation}) => {
  const [anonmodalVisible, setanonModalVisible] = useState(false);
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
  const [refreshing, setRefreshing] = useState(false);
  const [ventquestions,setventquestions] = useState([])
 // const [username,setusername] = useState('')
  const [arrdata,setdata] = useState(null)
  var categoryquesnew = []
  useEffect(() => {

    //setReminders()
   const  fetchHome = async() => {


    let response = await fetchHomedata()
    let ventquestions = await getventall()
      setventquestions(ventquestions)
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
     setLoading(false)
   }

    //console.log("state.homescreendata.questions",state)
 //   setLoading(true)
    fetchHome()
    createChannel()

   },[isLoading,refreshing])





  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   //console.log(arrdata)
  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() =>
    {
      setRefreshing(false)
    }
    );
  }, []);
  return   (

    <ScrollView style={{backgroundColor:'black'}} nestedScrollEnabled={true}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>

      <LinearGradient colors={['black', '#0c0c0c',]} style={{flex:1,minHeight:1000,marginBottom:48}}>


    <View style={styles.container}>
    <View style={styles.header}>
    <TouchableOpacity>
    <Text style= {styles.headerTitle}>Hi, {state.username}👋</Text>
    </TouchableOpacity>
    <Feather name="bell" size={24} color="white" style={{marginTop:10}} onPress={()=>navigation.navigate('Notification')}/>
    </View>

    {/* <LinearGradient colors={['#0c0c0c', 'black']} style={{borderWidth:1,borderColor:'black',borderRadius:12,marginHorizontal:0,marginTop:16,marginBottom:6,padding:18,borderBottomColor:'#0c0c0c',borderBottomWidth:0.5}}>
    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,opacity:0.6,paddingBottom:6}}>Here's your answering progress for this week</Text>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View>
        <Text style={{color:'white',fontFamily:'Intermedium',fontSize:16}}>Daily Streak 🔥</Text>
      </View>
      <Text style={{color:'white',fontFamily:'Intermedium',fontSize:16}}>0 days</Text>
    </View>
    <View style={{flexDirection:'row',paddingTop:6,justifyContent:'space-between'}}>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6}}>M</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>T</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>W</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>T</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>F</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>S</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingBottom:6,opacity:0.4}}>S</Text>
      <View style={{borderRadius:120,backgroundColor:'transparent',height:12,width:12,borderWidth:1,borderColor:'white'}}/>
      </View>

    </View>
    </LinearGradient> */}
    <CardSpacer/>

    <Questionofday refresh={refreshing}/>

    {/* <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
        transparent={true}
        visible={anonmodalVisible}
        onRequestClose={() => {

          setanonModalVisible(false);

        }}
      >
        <View style={{alignContent:"center",alignSelf:"center"}}>
        <LinearGradient colors={['white', '#f3f3f3',]}style={styles.anoncenteredView}>
          <View style={styles.anonpostmodalView}>


            <Pressable
            onPress={()=>
              {
                setanonModalVisible(false)
                navigation.navigate('Vent',{fromhome:true})
            }
            }
              >
              <View style={{backgroundColor:'black',padding:20,borderRadius:100,marginHorizontal:20}}>
              <Text style={{color:'white',paddingTop:0}}>Vent on a new topic</Text>
              </View>
              <Text style={{color:'black',paddingVertical:8,alignSelf:'center'}}>or</Text>
            </Pressable>

            <View>
              <Text style={{color:'black',paddingBottom:12,opacity:0.7,}}>Vent on an exisiting topic</Text>

      </View>
            <FlatList
            style={{flex:0,alignContent:'flex-start',alignSelf:'flex-start',flexGrow:0,flexShrink:0}}
data={ventquestions}
inverted={true}
renderItem={(item)=>
  {

    return isLoading ?
     <Text style={{color:'black',fontSize:12,alignSelf:'center',fontFamily:'Intermedium'}}>Fetching...</Text> :
    <Pressable
    onPress={()=>
      navigation.navigate('Vent',{existing:true})
  }
    >
     <View style={{width:240,flexDirection:'column',marginVertical:6,alignSelf:'center',backgroundColor:'black',opacity:1, padding:12,borderRadius:12}}>
    <Text style={{color:'white',fontSize:14,alignSelf:'center',fontFamily:'Intermedium'}}>{item.item.question_text}</Text>
    </View>
    </Pressable>
  }
  }
keyExtractor={item => item.id}
/>




          </View>
        </LinearGradient>
        </View>

      </Modal> */}
    <View style={{flexDirection:'column',justifyContent:'space-between',marginVertical:12}}>
    <TouchableOpacity onPress={()=>
 {
     navigation.navigate('Vent',{fromhome:true})}
      }>
    <LinearGradient colors={['#5A20D4', '#2A0350',]} style={{ flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16,
    marginRight:0,
    marginBottom:18,
    paddingBottom:16,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:'#0c0c0c'
    }}>
<Image
   style={{width: 60, height: 60,alignSelf:'center',paddingTop:32,marginTop:20,paddingLeft:32,padding:24}}
   containerStyle={{paddingTop:32}}
      source={{uri: 'https://revisitapp.s3.amazonaws.com/assets/mind.png'}}
      resizeMode='cover'/>
        <Text style={{color:'white',fontFamily:'Intermedium',fontSize:18,paddingVertical:12,paddingTop:16,alignSelf:'center'}}>VENT</Text>
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingVertical:0,alignSelf:'center',fontStyle:'italic',opacity:0.4}}>Unwind you mind</Text>
</LinearGradient>
</TouchableOpacity>
<TouchableOpacity onPress={()=>
 {
     navigation.navigate('Vent',{openask:true})}
      }>
      <LinearGradient colors={['#140C6D', '#2A1CC1',]} style={styles.linearGradient}>
  {/* <Image source={require('../../assets/ask.png')}/> */}
  <Image
   style={{width: 60, height: 60,alignSelf:'center',paddingTop:32,marginTop:20,paddingLeft:32,padding:24}}
   containerStyle={{paddingTop:32}}
      source={{uri: 'https://revisitapp.s3.amazonaws.com/assets/ask.png'}}
      resizeMode='cover'/>
        <Text style={{color:'white',fontFamily:'Intermedium',fontSize:18,paddingVertical:12,paddingTop:16,alignSelf:'center'}}>ASK</Text>
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,paddingVertical:0,alignSelf:'center',fontStyle:'italic',opacity:0.4}}>What’s on you mind?</Text>
</LinearGradient>
</TouchableOpacity>


    </View>
    <TrendingAnswers  refresh={refreshing} onpress={(item) => navigation.navigate('CreateAnswer',{post:item})}/>
    </View>
    </LinearGradient>
    </ScrollView>

  )

};

export var arrdata

export default withNavigation(NewHomeScreen);



const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
   // elevation: 2
  },
  anonpostmodalView:{
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 5,
    alignItems: "center",
  },
  anoncenteredView:{
    justifyContent: "center",
     alignItems: "center",
     //backgroundColor:"#453AB8",
     //opacity:0.95,
     borderWidth:0,
     borderColor:'white',
     height:300,
     marginTop: 200,
     width:330,
     borderRadius:12,
   //  height:300,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
   }},
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
    backgroundColor: 'transparent',
    paddingHorizontal:16
  },
  header:{
    paddingTop:24,
   // paddingBottom:16,
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom:16,
    borderRadius: 16,
    marginRight:0,
    borderTopWidth:1,
    borderLeftWidth:1,
    minHeight:100,
    marginBottom:12,
    borderRightWidth:1,
    borderColor:'#0c0c0c'

  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})
