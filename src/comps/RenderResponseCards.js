import { Animated,StyleSheet, Text, View, TouchableOpacity,PanResponder } from 'react-native'
import React, { useState,useRef } from 'react'
import { Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const RenderResponseCards = ({answer,zindex,scale,opacity,bottom}) => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });

  return (
    <View

    style={{minHeight:22}}
    >
      <View


    style={{
  minWidth:360,
   marginHorizontal:6,
   borderWidth:1,
   borderColor:'#414141',
    position: 'absolute',
    zIndex: zindex,
    padding:20,
    overflow:'scroll',
    borderRadius:12,
    backgroundColor: '#222222', // Red
    opacity: opacity,
    elevation:-5,
    transform: [


       { scale: scale }
      ]


  }} >
        <View style={{height:240}}>
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:18,opacity:0.8,overflow:'hidden'}} >{answer}</Text>
        </View>
        <View style={{flexDirection:'row',paddingVertical:8}}>
        <Text style={{color:'white',fontFamily:'InterRegular',fontSize:12,opacity:0.4,paddingTop:16}} >by anonen899</Text>
        <View style={{paddingTop:12,flexDirection:'row',paddingLeft:120}}>
        <TouchableOpacity >
        <MaterialCommunityIcons name="pin-outline" size={36} color="white" style={{paddingRight:8}} />
        </TouchableOpacity>
        <TouchableOpacity >
        <Entypo name="share" size={36} color="white" />
        </TouchableOpacity>
        </View>

        </View>
    </View>
   </View>
  )
}

export default RenderResponseCards

const styles = StyleSheet.create({})
