import { Animated,StyleSheet, Text, View, TouchableOpacity,PanResponder } from 'react-native'
import React, { useState,useRef } from 'react'
import { Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const RenderResponseCards = ({onPress,backgroundColor,textColor,answertext,answer,zindex,scale,opacity,bottom}) => {
  console.log("RECIEVED ITEMS AT RENDERREPONSE CARDS",zindex)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });

  return (
    <View

    style={{height:10}}
    >
      <View


    style={{
  minWidth:360,
 // minHeight:300,
   marginHorizontal:0,
   borderWidth:1,
   borderColor:'#414141',
   //bottom:bottom,
    position: 'absolute',
   // zIndex: zindex,
    padding:20,
    overflow:'scroll',
    borderRadius:12,
    backgroundColor: '#222222', // Red
   // opacity: opacity,
    elevation:-5,



  }} >
        <View >
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:18,opacity:0.8,overflow:'hidden'}} >{answertext}</Text>
        </View>
        <View style={{flexDirection:'row',paddingVertical:8,justifyContent:'space-between'}}>
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,opacity:0.4,paddingTop:16}} >by {answer.isAnonymous ? answer.username : 'anonymous'}</Text>
        <View style={{paddingTop:12,flexDirection:'row'}}>
        </View>

        </View>
    </View>
   </View>
  )
}

export default RenderResponseCards

const styles = StyleSheet.create({})
