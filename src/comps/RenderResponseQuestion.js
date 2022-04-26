import { StyleSheet, Text, View,FlatList, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Card,Button } from 'react-native-elements'
import RenderResponseCards from './RenderResponseCards'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { youranswers } from '../dummydata';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RenderResponseQuestion = ({question,questionid,answers,navigation}) => {
  const [selectedIds, setSelectedId] = useState([]);
  const renderItem = ({ item,index }) => {
    const backgroundColor = selectedIds.indexOf(item.id)!=-1 ? "black" : "grey";
    const color = selectedIds.indexOf(item.id)!=-1 ? 'white' : 'black';
    console.log("itemitemitemiemm",item)
    var length = answers.length

    return (
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
    data={answers}
    inverted={true}
    renderItem={renderItem}
    keyExtractor={(item) => {
     return  item.answerid
    }}
    extraData={selectedIds}

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
