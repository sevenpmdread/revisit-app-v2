import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card,Button } from 'react-native-elements'
import React from 'react'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { ventanswers } from '../dummydata';
//import RenderCategoryQuestions from './RenderCategoryQuestions';
import RenderVentAnswers from './RenderVentAnswers';
import CardSpacer from './CardSpacer';
const RenderVentQuestions = ({question}) => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (
    <View>
        <CardSpacer/>
       <Card  containerStyle={{backgroundColor:'#111111',borderRadius:12,paddingHorizontal:16,paddingTop:12,borderWidth:3,paddingBottom:20,borderColor:'#202020',marginHorizontal:0}}>
      <Text style={styles.question} onPress={()=> console.log("hello")}>{question}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Button
       title='Add a new answer'
       titleStyle={{fontFamily:'Intermedium',fontSize:10,color:'black'}}
       buttonStyle={{backgroundColor:'#F5F5F5',borderRadius:6,paddingHorizontal:0,fontFamily:'InterRegular',opacity:0.7}}
       containerStyle={{width:120,fontFamily:'InterRegular',fontSize:8,marginRight:12,marginTop:16,elevation:5}}
       />
       <TouchableOpacity style={{paddingTop:20}}>
        <MaterialIcons name="delete-outline" size={24} color="#FF4E4E"  />
        </TouchableOpacity>
       </View>
      </Card>
      <View>
      <CardSpacer/>
      <FlatList
     contentContainerStyle={{marginLeft:8}}
      horizontal={true}
      style={styles.feed}
       data = {ventanswers}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item)=>
       {//console.log(item)
      return <RenderVentAnswers answertext={item.item.answertext}/>}
      }
      keyExtractor={item => item.answerid}
      showsVerticalScrollIndicator={false}
      />
    {/* <CardSpacer/> */}
      </View>
    </View>
  )
}

export default RenderVentQuestions

const styles = StyleSheet.create({
  question:{
    fontFamily:'Intermedium',
    color:'white',
    fontSize:24,
    opacity:0.9
},
})
