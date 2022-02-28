import React from 'react';
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

const Questionofday = () => {
  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular,
  //   "InterSemi":Inter_600SemiBold
  //  });
   //console.log(fontsLoaded)
  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
  return (
    <View>
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
                <TouchableOpacity >
                <Entypo name="share" size={32} color="white" style={{paddingRight:10}}/>
                </TouchableOpacity>
                <TouchableOpacity >
                <Feather name="clock" size={32} color="white" style={{paddingHorizontal:8}}/>
                </TouchableOpacity >
                <TouchableOpacity >
                <Text style={{fontSize:14,opacity:0.8,color:'white',paddingLeft:145,paddingTop:10}}> 23 resposes</Text>
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
    paddingBottom:12

  },
});
