import React,{useState,useEffect} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,Alert,ToastAndroid } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
//import { ColorPicker } from 'react-native-color-picker'
import { ColorPicker } from "react-native-btr";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import ShareCardQuestion from './ShareCardQuestion';
//import DatePicker from 'react-native-modern-datepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker'
import { getAllreminders,getReminders,setReminders } from '../context/restapi';

const RenderCategoryQuestions = ({post,nav,width,onpress}) => {
  //console.log("POST POST POST POST POST",post)
  post.item.text = post.item.question_text  ? post.item.question_text : post.item.text
  const newwidth = width ? 'auto': 240
  const newheight = width ? 10 : 170
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [reminder,setreminder] = useState(false)
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

  const createChannel  = () => {
    PushNotification.createChannel({
      channelId:'test2',
      channelName:'channelInitial'
    },

    )

  }

  const newnotificationhandler = (item,date) => {
    console.log("IN NOTIFICAATION")
    PushNotification.localNotificationSchedule({

      channelId:'test1',
     // id:item.id,
      title:item.question,
     // title:"Write a response",
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
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
      console.log("IMAGE -> ",image);
    }
  };
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

  useEffect(() => {


   const  fetchHome = async() => {
    PushNotification.getScheduledLocalNotifications((response) =>

    //console.log("PUSH NOTIFICATION SCHEDULED",response)
    {
      for(let i = 0;i < response.length;i++)
      {
        //console.log(response)
      if(response[i].id == post.item.id)
      {
        console.log("truth",response[i].date > new Date())
        if(response[i].date > new Date())
        {
        setreminder(true)
        setDate(response[i].date)
       }
       else
       {
        setreminder(false)
       }
      }
    }}
   );

   // await AsyncStorage.removeItem('Reminders');
    // let response = await getReminders(post.item.id)

    // if(response)
    // {

    //   console.log("RESOPNSE",response)
    //   setreminder(true)
    //  // setDate(response.date)

    // }
   }

    //console.log("state.homescreendata.questions",state)
    fetchHome()

   },[])
   const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"numeric",minute:"numeric"};

  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
 // console.log(post)
   var count  = post.item.count ? post.item.count.responsecount : 0
   return post.item.type !== "more" ?  (
    <View >
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
         newnotificationhandler({question:post.item.text,id:post.item.id},(new Date(date) - d.raw))
        setreminder(true)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

            <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:0,backgroundColor:'transparent',borderWidth:1,borderColor: reminder ? 'green' : 'rgba(255, 255, 255, 0.2)',width:newwidth,minHeight:newheight,borderRadius:16,paddingBottom:5,flexDirection:'column',justifyContent:'space-between'}}>
            <View style={{flexDirection:'column',justifyContent:'space-between',minHeight:newheight}}>
            <Text style={styles.questionText}>{post.item.text}</Text>
            <View style={styles.questionrow}>
                <TouchableOpacity   onPress= {() => setIsVisible(true)}>
                <Entypo name="share" size={20} color="white" style={{paddingRight:12}}/>
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
                  <Feather name="clock" size={20} color="white" style={{paddingHorizontal:8}}/>
                  </TouchableOpacity >
                 <Text style={styles.cardfooter}>Answered {count} times</Text>
                 </View>
                  }
            </View>
            </View>
            {
              onpress ? <Button
              title='Answer'
      titleStyle={{color:"white",textAlign:"left"}}
      containerStyle={{
        paddingRight:0,
        paddingTop:2,
       // opacity:1,
        opacity:1,
        fontSize:12,
        textAlign:"left",
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'black',
        borderRadius:12,
        paddingHorizontal:0,
        paddingVertical:12,
        marginVertical:8,
        marginBottom:20,
        textAlign:"left",
      //  marginHorizontal:24,
        fontSize:12,
        fontFamily:'InterRegular',
        borderWidth:1,
        borderColor:'grey'

      }}
      onPress={()=>nav.navigate("Create",{post:post.item})}
              /> : <></>
            }
            </Card>
             <BottomSheet  modalProps={{}} isVisible={isVisible}>

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
             <ShareCardQuestion textcolor = {selectedColor} sentimage={image} color={selectedColor} question={post.item.text} count={count}/>
            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>
    </View>
  ) : (
    <View >
    <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:5,backgroundColor:'black',borderWidth:1,borderColor:'rgba(255, 255, 255, 0.4)',width:240,minHeight:265,borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
    <View>
    <TouchableOpacity>
    <Text style={styles.readmore}>{post.item.question_text}</Text>
    </TouchableOpacity>
    </View>
    </Card>
</View>
  )
};

export default RenderCategoryQuestions;

const styles = StyleSheet.create({
  cardfooter: {
    fontSize:10,
    paddingTop:0,
   // paddingRight:26,
    paddingLeft:20,
   opacity:0.6,
    color:'white',
  // fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
 //  fontFamily:'Intermedium',
    fontStyle: 'normal',

    fontSize: 22,
    opacity:0.9,
   // paddingBottom:24,
    color:'white',

  },
  readmore:{
  //  fontFamily:'InterRegular',
    fontStyle: 'normal',
     fontSize: 12,
     paddingTop:110,
     paddingHorizontal:16,
    // textAlignVertical:'center',
     textAlign:'center',
     opacity:0.6,
    // paddingBottom:24,
     color:'white',

   },
  questionrow: {
   // display:'flex',
   // flex:2,
   //alignContent:'flex-end',
  // textAlign:'justify',
   //alignItems:'baseline',
   // textAlignVertical:'bottom',
    //flexDirection:'column',
    marginTop:15,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:5,
  // justifyContent:"space-between",
    flexDirection:'row',
  },
});
