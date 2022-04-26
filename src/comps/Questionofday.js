import React,{useState,useCallback} from 'react';
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
import {Entypo} from '@expo/vector-icons'
import { Card, withTheme } from 'react-native-elements';
import NavLink from '../comps/NavLink'
//import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { fonts } from 'react-native-elements/dist/config';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';


const Questionofday = () => {
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
  const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"numeric",minute:"numeric"};
  const [selectedDate, setSelectedDate] = useState('');
  const [showmodal,setshowmodal] = useState(false)
  var todayDate = new Date().toISOString().slice(0, 10).replace(/-/g,"/")

  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

  return (
    <View>

    <Modal isVisible={showmodal}>
        <View style={{ flex: 1,marginVertical:220 }}>
        <View style={{backgroundColor:'#0C0C0C',padding:12,flexDirection:'row'}}>
        <TouchableOpacity onPress={requestCameraPermission} style={{color:'white',fontSize:12,paddingHorizontal:6,paddingTop:2}}>
          <Text>Request Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setshowmodal(false)}>
        <Entypo name="cross" size={24} color="#F4722B" style={{alignSelf:'flex-end'}}/>
        </TouchableOpacity>
        </View>
        <DatePicker
           //   selected={todayDate}
           minimumDate={todayDate}
           mode="datepicker"
           minuteInterval={1}
             // mode="datepicker"
     options={{
      backgroundColor: '#0C0C0C',
      textHeaderColor: '#F4722B',
      textDefaultColor: '#F3F3F3',
      selectedTextColor: '#fff',
      mainColor: '#F4722B',
      textSecondaryColor: '#D6C7A1',
      borderColor: 'rgba(122, 146, 165, 0.1)',
    }}
    onSelectedChange={date =>
       {

          var d = getTime()
          //var n = new Date(date)
          //n = new Date(n.getTime() - n.getTimezoneOffset() * 60000)
          console.log(new Date(date) - d.raw)
          // console.log("LOCAL TIME",new Date())
         // setSelectedDate(date)
        //   console.log("date",date)
        //   var d = new Date(date)
        //   console.log(d,new Date())
        //   d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        //  console.log(d - new Date())
        //   //console.log("converted to",new Date(date).toLocaleString(undefined, options).slice(10,16))
        //   if(date.substring(11) != '00:00')
        //   setshowmodal(false)
        }
      }
    />
        </View>
      </Modal>

      <ImageBackground imageStyle={{borderRadius:26,width:'auto',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)', opacity:0.7}} resizeMode= 'cover' source={require('../../assets/qod.png')} style={{marginVertical:0,marginHorizontal:0, paddingHorizontal:16,paddingBottom:16,paddingTop:12}}>
            <Text style={styles.qod}>Question of the day</Text>
            <Text style={styles.questionText}>What does it mean to be in love? Can you be with somebody for life and be happy?</Text>
            <TouchableOpacity
            activeOpacity={.7}
            tvParallaxProperties={{enabled:false}}
            style={styles.button}

      >
        <Text> Answer</Text>
      </TouchableOpacity>
            <View style={styles.questionrow}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity >
                <Entypo name="share" size={32} color="white" style={{paddingRight:10,paddingTop:4}}/>
                </TouchableOpacity>
                {
                  selectedDate ?
                  <View style={{flexDirection:'row',backgroundColor:"transparent",borderRadius:12,padding:6,opacity:0.8,elevation:5,borderColor:'white',borderWidth:1}}>
                  <MaterialCommunityIcons name="clock-check" size={24} color="white" style={{opacity:0.8}} />
                  <Text style={{color:'white',fontSize:12,paddingHorizontal:6,paddingTop:2}}>{new Date(selectedDate).toLocaleString(undefined, options).slice(0,11)}{new Date(selectedDate).toLocaleString(undefined, options).slice(15)}</Text>
                   <TouchableOpacity onPress={()=>setSelectedDate('')}>
                   <Entypo name="cross" size={20} color="white" style={{alignSelf:'flex-end',paddingVertical:2,paddingLeft:4}}/>
                   </TouchableOpacity>
                   </View>


                   :
                   <TouchableOpacity onPress={() => setshowmodal(true)}>
                  <Feather name="clock" size={32} color="white" style={{paddingHorizontal:8,paddingTop:4}}/>
                  </TouchableOpacity >

                  }
                </View>
                <TouchableOpacity >
                <Text style={{fontSize:12,opacity:0.8,color:'white',paddingTop:12,paddingRight:6}}> 23 resposes</Text>
                </TouchableOpacity>
            </View>

    </ImageBackground>


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
