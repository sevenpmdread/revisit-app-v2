import React from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList,TouchableHighlight } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
//import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { categoryanswers } from '../dummydata';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_300Light} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import RenderCategoryAnswers from './RenderCategoryAnswers';
import CategoryDrillScreen from './CategoryDrillScreen';
import TimeAgo from 'react-native-timeago';

const RenderExploreFeed = ({post,navigation}) => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "Interlight":Inter_300Light
   });
   //console.log("DATA TDATTADTATDATD",post)

   var category = '#' + post.category
   if(post.answers.length ==0)
   {
     return(
       <View>
      <View style={{flexDirection:"row"}}>
      <Button
title={category}
titleStyle={{fontFamily:'Interlight',fontSize:11,color:'white',opacity:0.7,fontStyle:"italic"}}
buttonStyle={{backgroundColor:'#1A1A1A',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
containerStyle={{width:105,fontFamily:'InterRegular',fontSize:8,marginBottom:6,marginRight:6,marginTop:24}}
/>
      </View>
      <Card containerStyle={{marginVertical:8,marginTop:1,marginBottom:2,marginHorizontal:0,backgroundColor:'#171717',elevation:5,borderRadius:12,borderWidth:0,borderColor:'rgba(255, 255, 255, 0.4)',paddingVertical:18,paddingLeft:22,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate("CategoryDrill",{
        post:post
      })}>
      <Text style={styles.questionText}>{post.question_text}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.questionrow}>
      <TouchableOpacity
      activeOpacity={.7}
      tvParallaxProperties={{enabled:false}}
      style={styles.button}

>
  <Text> Answer</Text>
</TouchableOpacity>


<TouchableOpacity >
<Feather name="more-vertical" size={26} color="white" style={{marginTop:12,textAlign:'left',opacity:0.7}}/>
</TouchableOpacity >
</View>
      </Card>
      <View style={{paddingHorizontal:20,marginVertical:20,backgroundColor:'#121212',padding:12,borderRadius:12}}>
        <Text style={{color:'white',opacity:0.6}}>BE THE FIRST ONE TO ANSWER THIS QUESTION</Text>
      </View>
      </View>

     )
   }
   else {
   var responsecount = post.metadata[0].responsecount + ' responses'
   return  (
    <View >
            <View style={{flexDirection:"row"}}>
            <Button
      title={category}
      titleStyle={{fontFamily:'Interlight',fontSize:11,color:'white',opacity:0.7,fontStyle:"italic"}}
      buttonStyle={{backgroundColor:'#1A1A1A',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
      containerStyle={{width:105,fontFamily:'InterRegular',fontSize:8,marginBottom:6,marginRight:6,marginTop:24}}
      />
      <Button
      title={responsecount}
      titleStyle={{fontFamily:'Interlight',fontSize:11,color:'white',opacity:0.7,fontStyle:"italic"}}
      buttonStyle={{backgroundColor:'#1A1A1A',borderRadius:20,paddingHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8}}
      containerStyle={{width:90,fontFamily:'InterRegular',fontSize:8,marginBottom:6,marginRight:6,marginTop:24}}
      />
      <View style={{backgroundColor:'#1A1A1A',borderRadius:20,paddingHorizontal:0,width:165,height:35,marginBottom:6,marginRight:6,marginTop:24,flexDirection:'row'}}>
      <Text style={{color:'white',fontFamily:'InterRegular',fontSize:11,opacity:0.7,fontStyle:'italic',paddingTop:8,paddingLeft:10}}>Last answered </Text>
      <TimeAgo  style = {{paddingTop:8,color:'white',alignContent:'center',alignItems:'center',textAlign:'center',fontFamily:'InterRegular',fontSize:11,opacity:0.7,fontStyle:'italic'}} time={post.metadata[0].updatedAt} />
      </View>
            </View>
            <Card containerStyle={{marginVertical:8,marginTop:1,marginBottom:2,marginHorizontal:0,backgroundColor:'#171717',elevation:5,borderRadius:12,borderWidth:0,borderColor:'rgba(255, 255, 255, 0.4)',paddingVertical:18,paddingLeft:22,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate("CategoryDrill",{
              post:post
            })}>
            <Text style={styles.questionText}>{post.question_text}</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.questionrow}>
            <TouchableOpacity
            activeOpacity={.7}
            tvParallaxProperties={{enabled:false}}
            style={styles.button}

      >
        <Text> Answer</Text>
      </TouchableOpacity>


<TouchableOpacity >
<Feather name="more-vertical" size={26} color="white" style={{marginTop:12,textAlign:'left',opacity:0.7}}/>
</TouchableOpacity >
</View>
            </Card>


            <FlatList
     contentContainerStyle={{marginLeft:8}}
      horizontal={true}
      style={styles.feed}
       data = {post.answers}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item)=>
       {
         //console.log("itemitemitemitmei",item)
      return <RenderCategoryAnswers question={post.question_text} post={item.item} width={{showfull:false}}/>}
      }
      keyExtractor={item => item.answer_id}
      />
    </View>
  ) }
};

export default RenderExploreFeed;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    marginTop:0,
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
    marginTop:16,

  },
  cardfooter: {
    fontSize:10,
    paddingTop:3,
   // paddingRight:26,
    paddingLeft:36,
   opacity:0.6,
    color:'white',
  // fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
    fontFamily:'Intermedium',
    fontStyle: 'normal',
   // overflow:'ellipsis',
    fontSize: 20,
    opacity:0.9,
   // paddingBottom:24,
    color:'white',

  },
  readmore:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    textDecorationLine:"underline",
     fontSize: 24,
   //  paddingTop:110,
     paddingHorizontal:16,
    // textAlignVertical:'center',
     textAlign:'center',
     opacity:0.8,
    // paddingBottom:24,
     color:'white',

   },
  questionrow: {
    justifyContent:'space-between',
    display:'flex',
    flex:2,
   alignContent:'flex-end',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:8,
   // paddingLeft:16,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:1,
    flexDirection:'row',
  },
});
