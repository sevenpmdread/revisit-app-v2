import React,{useState,useCallback,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,Button,PermissionsAndroid
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
//import { ColorPicker } from 'react-native-color-picker'
import { ColorPicker } from "react-native-btr";
import {Entypo} from '@expo/vector-icons'
import { Card, withTheme } from 'react-native-elements';
import NavLink from '../comps/NavLink'
//import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { fonts } from 'react-native-elements/dist/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { getQod } from '../context/restapi';
import * as navigation from '../navigationRef'
import LoadingScreennew from '../screens/Loadingnew';
import DatePicker from 'react-native-date-picker'
import PushNotification from 'react-native-push-notification';
import ShareCardQuestion from './ShareCardQuestion';

const Questionofday = () => {
  const [selectedColor, setSelectedColor] = useState("#AC2929");
  function setColor(color) {
    setSelectedColor(color);
  }
  const list = [
    { title: 'sfjksdfh', titleStyle:{color:'black'}, containerStyle: {backgroundColor:'black',borderTopRadius:20,marginHorizontal:0,display:"flex",padding:0,marginVertical:0,alignItems:"center"} },
    {
      title: 'Cancel',
      titleStyle:{color:'red'}, containerStyle: {backgroundColor:'black',marginHorizontal:1,height:60,borderColor:"red",borderTopWidth:2},
      onPress: () => setIsVisible(false),
    },
  ];
  const [isVisible, setIsVisible] = useState(false);

  const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"numeric",minute:"numeric"};

  const [isLoading,setLoading] = useState(false)
  const [question,setQuestion] = useState({})
  const [metadata,setmetadata] = useState({})
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [reminder,setreminder] = useState(false)
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
    setLoading(true)
    let response = await getQod()
    console.log(response)
    setQuestion(response.question[0])
    if(response.metadata.length == 0)
    setmetadata(0)
    else
    setmetadata(response.metadata[0])
    setLoading(false)
    // console.log("RESPONSE RESPONSE",response)
    //  var categorycount = response.nbHits
    // //",response)
    //  for(let i = 0; i <  categorycount;i++)
    //  {
    //   let obj = {}
    //   obj.type = response.questions[i]._id
    //   obj.questions = response.questions[i].questions
    //   obj.desc = response.questions[i].questions[0].desc
    //   categoryquesnew[i] = obj
    // //  console.log("obj",obj)
    //  }
    // // console.log("in effect",categoryquesnew)
    //  setdata(categoryquesnew)
    // // setusername(state.username)
    // // console.log(username)
    //  setLoading(true)
   }

    //console.log("state.homescreendata.questions",state)
    fetchHome()

   },[])
  var getTime = () => {
    let date = new Date();
    var tz = date.toString().split("GMT")[1].split(" (")[0];
    tz = tz.substring(1,5);
    let hOffset = parseInt(tz[0]+tz[1]);
    let mOffset = parseInt(tz[2]+tz[3]);
    let offset = date.getTimezoneOffset() * 60 * 1000;
    let localTime = date.getTime();
    let utcTime = localTime + offset;
    let austratia_brisbane = utcTime + (3600000 * hOffset) + (60000 * mOffset);
    let customDate = new Date(austratia_brisbane);

    let data = {
        day: customDate.getDate(),
        month: customDate.getMonth() + 1,
        year: customDate.getFullYear(),
        hour: customDate.getHours(),
        min: customDate.getMinutes(),
        second: customDate.getSeconds(),
        raw: customDate,
        stringDate: customDate.toString()
    }

    return data;
  }
  const [selectedDate, setSelectedDate] = useState('');
  const [showmodal,setshowmodal] = useState(false)
  var todayDate = new Date().toISOString().slice(0, 10).replace(/-/g,"/")

  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const newnotificationhandler = (item,date) => {
  console.log("IN NOTIFICAATION")
  PushNotification.localNotificationSchedule({

    channelId:'test1',
   // id:item.id,
    bigText:item.question,
    title:"Revisit this thought",
    vibrate: true, // (optional) default: true
vibration: 300,
    date:new Date(Date.now()+date),
    actions: ["ReplyInput"],
reply_placeholder_text: "Write your response...", // (required)
reply_button_text: "Answer" ,
    message:"Reminder for revisiting this thought",
  }
  )
}


  return (
    <View>
<DatePicker
        modal
        open={open}
        date={date}
        onConfirm={async (date) => {
          var d = getTime()
          console.log(new Date(date) - d.raw)
          setOpen(false)
         // var response = await setReminders({postid:post.item.id,date:date})
         setDate(date)
         newnotificationhandler({question:question.question_text,id:question._id},(new Date(date) - d.raw))
        setreminder(true)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />


      <ImageBackground imageStyle={{backgroundColor:'#0c0c0c',borderRadius:26,width:'auto',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)', opacity:isLoading ? 0 : 0.7}} resizeMode= 'cover' source={require('../../assets/qod.png')} style={{marginVertical:0,marginHorizontal:0, paddingHorizontal:16,paddingBottom:16,paddingTop:12}}>
           {
             isLoading  ?
             <LoadingScreennew/>
             :
             <>
             <Text style={styles.qod}>Trending</Text>
             <Text style={styles.questionText}>{question.question_text}</Text>
             <TouchableOpacity
             activeOpacity={.7}
             tvParallaxProperties={{enabled:false}}
             style={styles.button}
             onPress={()=>navigation.navigate('CreateAnswer',{post:question})}

       >
         <Text> Answer</Text>
       </TouchableOpacity>
             <View style={styles.questionrow}>
                 <View style={{flexDirection:'row'}}>
                 <TouchableOpacity onPress= {() => setIsVisible(true)} >
                 <Entypo name="share" size={32} color="white" style={{paddingRight:10,paddingTop:4}}/>
                 </TouchableOpacity>
                 {
                  reminder ?
                  <View style={{flexDirection:'row',backgroundColor:"transparent",borderRadius:12,padding:2,opacity:0.8,elevation:5,borderColor:'white',borderWidth:0.5,marginTop:2}}>
                                      <Text style={{color:'white',fontSize:12,paddingHorizontal:6,paddingTop:3}}>{new Date(date).toLocaleString(undefined, options).slice(4,11)}{new Date(date).toLocaleString(undefined, options).slice(15)}</Text>
                  {/* <MaterialCommunityIcons name="clock-check" size={24} color="white" style={{opacity:0.9}} /> */}
                  <TouchableOpacity onPress={()=>
                    {
                      setreminder(false)

                    }
                    }>
        <Entypo name="cross" size={20} color="white" style={{alignSelf:'flex-end',paddingVertical:2,paddingLeft:8}}/>
        </TouchableOpacity>
                  </View>
                   :
                   <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                   <TouchableOpacity  onPress={() => setOpen(true)}>
                  <Feather name="clock" size={32} color="white" style={{paddingHorizontal:8,paddingVertical:2}}/>
                  </TouchableOpacity >
                 </View>
                  }
                 </View>
                 <TouchableOpacity >
                 <Text style={{fontSize:12,opacity:0.8,color:'white',paddingTop:12,paddingRight:6}}>{metadata==0 ? `No responses yet` :  metadata.responsecount + ` responses`} </Text>
                 </TouchableOpacity>
             </View>
             </>

             }

    </ImageBackground>
    <BottomSheet  modalProps={{}} isVisible={isVisible}>
            {/* <ShareableImage text={post.item.answer_text}/> */}

          {list.map((l, i) => {
          //  console.log("sfjksdfk",l,i)
          return <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content style={{padding:0,margin:0}}>
              <View style={{margin:0,padding:0}}>
             { l.title != "Cancel" ?
             <View>
             <ColorPicker colors = {["#ffffff","#121212","#654A8A","#2B7644","#A46F31","#B43A6D","#443AB4","#179089"]} selectedColor={selectedColor} onSelect={setColor} />
             <ShareCardQuestion textcolor = {selectedColor} color={selectedColor} question={question.question_text} count={metadata==0 ? 0 : metadata.responsecount}/>
            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>


    </View>
  );
};

export default Questionofday;

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
    //fontFamily:'InterRegular'
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal:16
  },
  header:{
    paddingTop:56,
    paddingBottom:32,
    alignItems:"flex-start",
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingLeft:16,
   // paddingRight:16,
  },
  headerTitle:{
    color:'white',
    fontSize:24,
    //fontFamily:'Intermedium',

  },
  card:{
    borderWidth:4,
    borderColor:'black',
    backgroundColor:'black'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 28,
   // fontFamily:'Intermedium',
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    opacity:1

  },
  questionrow: {
    paddingTop:20,
    flexDirection:'row',
    justifyContent:"space-between",
    paddingBottom:12

  },
});
