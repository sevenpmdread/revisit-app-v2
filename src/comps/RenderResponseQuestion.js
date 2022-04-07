import { StyleSheet, Text, View,FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Card,Button } from 'react-native-elements'
import RenderResponseCards from './RenderResponseCards'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { youranswers } from '../dummydata';
import { TouchableOpacity } from 'react-native-gesture-handler';
const RenderResponseQuestion = ({question,questionid,answers,navigation}) => {
 console.log("NAVIGATION",navigation)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   var length = answers.length
   var marginbottom =  32
  //console.log(length)
var count = 0
  return (
    <View>
      <View style={styles.questioncard}>
      <Card  containerStyle={{backgroundColor:'black',borderRadius:12,paddingHorizontal:16,paddingTop:12,borderWidth:1,paddingBottom:20,borderColor:'#434343',marginBottom:marginbottom}}>
      <Text style={styles.question} onPress={()=>
      {
        console.log("NAVIGATION ON PRESS",navigation)
        return navigation.navigate("RenderResponses",{
              question,questionid,
              answers
      })}
        }>{question}</Text>
      <Button
       title='Contrast'
       titleStyle={{fontFamily:'Intermedium',fontSize:12,color:'white'}}
       buttonStyle={{backgroundColor:'#02853E',borderRadius:6,paddingHorizontal:0,fontFamily:'InterRegular',opacity:0.7}}
       containerStyle={{width:90,fontFamily:'InterRegular',fontSize:8,marginRight:12,marginTop:12}}
       />
      </Card>

      <View style={{marginHorizontal:20,marginBottom:340,marginTop:0,paddingTop:0,marginTop:-20}}>
      <FlatList
    //  onPress={()=> console.log("hello")}
      //  onStartShouldSetResponderCapture={() => {return true}}
        data={answers}
    contentContainerStyle={{

   //   backgroundColor:'red'
     // marginTop:20,
     // zIndex:9999999
    }}
    style={{
   //   height:300
      //marginTop:10,
    //  marginHorizontal:20,
     // zindex:1000

    }}
    renderItem={(item)=>
    {

     // return <ResponderTest />
     // return <Sample answer={item.item.answertext} scale={1 - 0.1*(length-1) + 0.1*(item.index)} />
     return <RenderResponseCards  answertext={item.item.answer_text} answer={item.item} zindex={length - item.index} scale={1 - 0.1*(length-1) + 0.1*(item.index)} opacity={0.8 +  0.2*(item.index)} bottom={130*item.index}/>
    }
    }
    keyExtractor={(item) => {
    //  console.log(item.answerid)
     return  item.answerid
    }}
    />
    </View>
      </View>
    </View>
  )
}

export default RenderResponseQuestion

const styles = StyleSheet.create({
  question:{
      fontFamily:'InterRegular',
      color:'white',
      fontSize:22,
      opacity:0.8
  },
  questionCard:{

  }
})
