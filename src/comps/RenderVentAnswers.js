import React from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import { Dimensions } from 'react-native';

const RenderVentAnswers = ({answertext}) => {
  const windowWidth = Dimensions.get('window').width;
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular
   });
   return  (
    <View >
            <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:0,marginRight:12,elevation:5,backgroundColor:'#202020',width:370,height:440,borderWidth:3,borderColor:'#303030',minHeight:265,borderRadius:16,paddingBottom:5,dispplay:'flex',flex:2,flexDirection:'column'}} style={{padding:0}}>
            <View style={{paddingLeft:0}}>
            <Text style={styles.questionText}>{answertext}</Text>
            <View style={styles.questionrow}>
                <Text style={styles.cardfooter}>23 days ago</Text>
            </View>
            </View>
            </Card>
    </View>

  )
};

export default RenderVentAnswers;

const styles = StyleSheet.create({
  cardfooter: {
    fontFamily:'InterRegular',
    fontSize:12,
    paddingTop:3,
   // paddingRight:26,
  //  paddingLeft:36,
   opacity:0.6,
    color:'white',
  // fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
   fontFamily:'InterRegular',
    fontStyle: 'normal',
    width:300,
    fontSize: 18,
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
    //display:'flex',
   //alignContent:'flex-end',
  // textAlign:'justify',
  // alignItems:'baseline',
    //textAlignVertical:'bottom',
    //flexDirection:'column',
    marginTop:350,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:5,
    flexDirection:'row',
  },
});
