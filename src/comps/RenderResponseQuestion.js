import { StyleSheet, Text, View,FlatList, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Card,Button } from 'react-native-elements'
import RenderResponseCards from './RenderResponseCards'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { youranswers } from '../dummydata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import { AntDesign } from '@expo/vector-icons';
const RenderResponseQuestion = ({question,questionid,answers,navigation,reminders}) => {
 // console.log("ANSWERS", answers)
  const [selectedIds, setSelectedId] = useState([]);
  const renderItem = ({ item,index }) => {
    const backgroundColor = selectedIds.indexOf(item.id)!=-1 ? "black" : "grey";
    const color = selectedIds.indexOf(item.id)!=-1 ? 'white' : 'black';
    //console.log("itemitemitemiemm",item)
    var length = answers.length

    return (
      <ScrollView>
      <RenderResponseCards
       // item={item}
        onPress={() => setSelectedId( selectedIds => [...selectedIds,item._id])}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        answertext={item.answer_text}
        answer={item}
        zindex={length - index}
        scale={1 - 0.1*(length-1) + 0.1*(index)}
        opacity={0.8 +  0.2*(index)}
        bottom={50*index}

      />
      </ScrollView>
    );
  };
 //console.log("NAVIGATION",navigation)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   var marginbottom =  32
  //console.log(length)
var count = 0
  return (
    <ScrollView >
      <View style={styles.questioncard}>
      <Card  containerStyle={{backgroundColor:'black',borderRadius:6,paddingHorizontal:16,paddingTop:12,borderWidth:0,borderBottomWidth:0,paddingBottom:20,borderColor:'white',marginBottom:20,elevation:0}}>
      <Text style={styles.question} onPress={()=>
      {
       // console.log("NAVIGATION ON PRESS",navigation)
        return navigation.navigate("RenderResponses",{
              question,questionid,
              answers
      })}
        }>{question}</Text>
      </Card>
      <TouchableOpacity onPress={()=>
      {
       // console.log("NAVIGATION ON PRESS",navigation)
        return navigation.navigate("RenderResponses",{
              question,questionid,
              answers
      })}
        }>
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:"#DADADA",padding:12,marginHorizontal:20,borderRadius:6,marginVertical:8}}>

        <View style={{flexDirection:'column',justifyContent:'space-between',opacity:1}}>
        <Text style={{fontFamily:'InterRegular',fontSize:16,color:'black'}}>{answers[0].answer_text}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style = {{color:'black',opacity:0.6,fontFamily:'InterRegular',fontSize:9}}>Last answered </Text>
        <TimeAgo  style = {{color:'black',opacity:0.6,fontFamily:'InterRegular',fontSize:9}} time={answers[0].updatedAt} />
        </View>
        </View>
        <AntDesign name="rightcircleo" size={24} color="black" style={{paddingVertical:12}}/>
        </View>
        </TouchableOpacity>
      {/* <View style={{marginLeft:20,marginBottom:340,marginTop:0,paddingTop:0}}>
      <FlatList
    data={answers}
    inverted={true}
    renderItem={renderItem}
    keyExtractor={(item) => {
     return  item.answerid
    }}
    extraData={selectedIds}

    />
    </View> */}
      </View>
    </ScrollView>
  )
}

export default RenderResponseQuestion

const styles = StyleSheet.create({
  question:{
      fontFamily:'InterRegular',
      color:'white',
      fontSize:26,
      opacity:0.8
  },
  questionCard:{

  }
})
