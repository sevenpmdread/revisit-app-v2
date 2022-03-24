import React from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';

const RenderCategoryAnswers = ({post,nav}) => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular
   });
  console.log("Contrast answersss ", post.item.contrast)
  return !post.item.contrast ?
   (
    <View >
            <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:8,backgroundColor:'transparent',borderWidth:2,borderColor:'#171717',width:280,minHeight:380,borderRadius:16,padding:20,flexDirection:'column', justifyContent:"space-between",
elevation:0}}>
            <View style={{flexDirection:'column', justifyContent:"space-between"}}>
            <Text style={styles.questionText}>{post.item.answer_text}</Text>
            <View style={styles.questionrow}>
                <Text style={styles.cardfooter}>by anon229</Text>
                <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white',}}>23 hours ago</Text>
            </View>
            </View>
            </Card>
    </View>
  )
  :(
    <View >
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:8,backgroundColor:'transparent',borderWidth:3,borderColor:'green',width:280,minHeight:285,borderRadius:16,padding:0,display:'flex',flexGrow:2,flexDirection:'column',   justifyContent:"space-between",
elevation:0}}>
    <View>
    <Text style={styles.contrasttexttop}>{post.item.contrast.prevanswer.answer}</Text>
    <TouchableOpacity>
    <Text style={{ backgroundColor : "#02853E",
    color : "white",
    textAlign : "center",
    paddingVertical :8,
    marginVertical : 0
    }}>SEE FULL CONTRAST</Text>
    </TouchableOpacity>
        <Text style={styles.contrasttextbottom}>{post.item.contrast.newanswer.answer}</Text>
    <View style={styles.questionrow}>
        <Text style={styles.cardfootercontrast}>by anon229</Text>
        <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white', paddingHorizontal:20,paddingBottom:10}}>23 hours ago</Text>
    </View>
    </View>
    </Card>
</View>
  )
};

export default RenderCategoryAnswers;

const styles = StyleSheet.create({
  contrasttexttop:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:13,
    opacity:0.8,
    marginBottom:8,
    paddingTop:20,
    paddingHorizontal:20,
    paddingBottom:4,
    color:'white',
  },
  contrasttextbottom:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:13,
    opacity:0.8,
    marginBottom:8,
    paddingTop:6,
    paddingHorizontal:20,
   // paddingBottom:24,
    color:'white',
  },

  cardfootercontrast:{
    fontSize:12,
    paddingHorizontal:20,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  cardfooter: {
    fontSize:12,
    paddingTop:3,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
   fontFamily:'InterRegular',
    fontStyle: 'normal',
    //height:230,
    overflow:'scroll',
    fontSize: 14.5,
    opacity:0.8,
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
  //  display:'flex',
   // flex:2,
  // justifyContent:"space-between",
   //SalignContent:'',
  // textAlign:'justify',
   //alignItems:'baseline',
   // textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:8,
    //paddingTop:30,
    paddingBottom:0,
  // marginBottom:8,
    flexDirection:'column',
  },
});
