import React,{useState,useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,Button
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


const Questionofday = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showmodal,setshowmodal] = useState(false)
  var todayDate = new Date().toISOString().slice(0, 10).replace(/-/g,"/")

  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
  return (
    <View>

    <Modal isVisible={showmodal}>
        <View style={{ flex: 1,marginVertical:220 }}>
        <View style={{backgroundColor:'#0C0C0C',padding:12,flexDirection:'row'}}>

        <TouchableOpacity onPress={()=>setshowmodal(false)}>
        <Entypo name="cross" size={24} color="#F4722B" style={{alignSelf:'flex-end'}}/>
        </TouchableOpacity>
        </View>
        <DatePicker
           //   selected={todayDate}
           minimumDate={todayDate}
              mode="datepicker"
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
         console.log(date)
          setSelectedDate(date)
          if(date.substring(11) != '00:00')
          setshowmodal(false)
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
                  <View style={{flexDirection:'row',backgroundColor:"transparent",borderRadius:12,padding:8,opacity:0.8,elevation:5,borderColor:'white',borderWidth:1.5}}>
                  <MaterialCommunityIcons name="clock-check" size={24} color="white" style={{opacity:0.8}} />
                  <Text style={{color:'white',fontSize:12,paddingHorizontal:6,paddingTop:2}}>{new Date(selectedDate).toUTCString().slice(0,-18)}{new Date(selectedDate).toUTCString().substring(16,22)}</Text>
                   <TouchableOpacity onPress={()=>setSelectedDate('')}>
                   <Entypo name="cross" size={20} color="white" style={{alignSelf:'flex-end',paddingVertical:2,paddingLeft:8}}/>
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
