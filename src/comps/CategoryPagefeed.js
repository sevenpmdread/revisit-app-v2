import React,{useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
  ImageBackground,Button,
  TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CardSpacer from './CardSpacer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RenderCategoryfeed from './RenderCategoryfeed';
const Categoryfeed = ({type,desc,questions,navigation}) => {
  //console.log("in rendercategroy feed",questions)

  const expanded = true;
 var image = type === 'Existential'? require('../../assets/categoryexistential.png') :  type === 'Confrontational' ?  require('../../assets/categoryconfrontational.png') : type === 'Growth' ?   require('../../assets/categorygrowth.png') :  type === 'Vent' ?   require('../../assets/categoryvent.png') : require('../../assets/categorypersonal.png')
//  console.log( type.toLowerCase())
  const name = type.toLowerCase()

  return (
    <View>
      <TouchableHighlight>
      <ImageBackground  imageStyle={{borderRadius:26,width:'auto',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)',opacity:0.8}} resizeMode= 'cover' source={image} style={{marginVertical:0,marginBottom:16,marginHorizontal:0, paddingHorizontal:16,paddingBottom:16,paddingTop:12}}>
            <Text style={styles.qod}>{type}</Text>
            <Text style={styles.questionText}>{type} Questions</Text>
            <Text style={styles.questionsub}>{desc}</Text>
            <View style={styles.questionrow}>
                <TouchableOpacity style={styles.row}>
                <Ionicons name="help" size={20} color="white" />
                <Text style={styles.cardfooter}>20 questions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                <MaterialIcons name="question-answer" size={20} color="white" />
                <Text style={styles.cardfooter}>Anwered 24 times</Text>
             </TouchableOpacity >
                <TouchableOpacity  style={styles.row}>
                <MaterialCommunityIcons name="pin-outline" size={20} color="white" />
                <Text style={styles.cardfooter}>Pinned 24 times</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>
    </TouchableHighlight>


     <FlatList
     contentContainerStyle={{marginLeft:8}}
      style={styles.feed}
       data = {questions}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
      renderItem={(item)=>
       {
       //  console.log("in rendercategroy feed",item)
      return <RenderCategoryfeed navigation={navigation} post={item}/>}
      }
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      />
    <CardSpacer/>
    </View>
  );
};

export default Categoryfeed;

const styles = StyleSheet.create({
  feed: {
    marginHorizontal:0
   },
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingRight:8,
    opacity:0.8

  },
  cardfooter: {
    fontSize:8,
    paddingTop:3,
    paddingRight:26,
    paddingLeft:4,
  //  opacity:0.8,
    color:'white',
 //   fontFamily:'InterRegular'
  },
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
  questionsub:{
    color:'white',
    fontSize:10,
    opacity:0.6,
   // fontFamily:'InterRegular'
  },
  qod:{
    color:'white',
    fontStyle:'italic',
    fontSize:14,
    opacity:0.6,
    marginBottom:32,
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
    fontSize: 24,
    //fontFamily:'Intermedium',
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    opacity:1

  },
  questionrow: {
    paddingTop:20,
    //paddingHorizontal:8,
    flexDirection:'row',
    paddingBottom:12

  },
});
