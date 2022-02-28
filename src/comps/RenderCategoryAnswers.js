import React from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';

const RenderCategoryAnswers = ({post,nav}) => {
  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
  console.log(post)
   return (
    <View >
            <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:8,backgroundColor:'transparent',borderWidth:2,borderColor:'#171717',width:280,minHeight:285,borderRadius:16,padding:20,display:'flex',flexGrow:2,flexDirection:'column',elevation:0}}>
            <View>
            <Text style={styles.questionText}>{post.item.answer_text}</Text>
            <View style={styles.questionrow}>
                <Text style={styles.cardfooter}>by anon229</Text>
                <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white',}}>23 hours ago</Text>
            </View>
            </View>
            </Card>
    </View>
  )
};

export default RenderCategoryAnswers;

const styles = StyleSheet.create({
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
    height:230,
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
    display:'flex',
    flex:2,
   //SalignContent:'',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:8,
    //paddingTop:30,
    paddingBottom:0,
   marginBottom:8,
    flexDirection:'column',
  },
});
