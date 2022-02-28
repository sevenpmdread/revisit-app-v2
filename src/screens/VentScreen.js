import { StyleSheet, Text, View,Image, TextInput, FlatList, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Button, Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import VentQuestion from './VentQuestion';
import CardSpacer from '../comps/CardSpacer';
const VentScreen = () => {

  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   const [value, onChangeText] = useState('');
   const [questionValue,onChageQuestion] = useState("")
   const [qcharcount,setqcharcount] = useState(questionValue)
   const [charCount,setCharCount] = useState(value.length)
   var opacity = qcharcount>0 && charCount  > 0 ? 1 : 0.4
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>VENT</Text>
      </View>
      <View>
        <Card containerStyle={styles.discoverCard}>
        <View style={{flexDirection:'row',}}>
        <Image  source={require('../../assets/VentVectorNew.png')} containerStyle={{height:80}} imageStyle={{height:80}}resizeMode='contain'/>
        <View style={styles.textArea}>
          <Text style={{fontFamily:'InterSemi',color:'white',fontSize:16}}>Untangle your mind!</Text>
          <Text  style={{fontFamily:'InterRegular',color:'white',fontSize:11,opacity:0.7}}>Ask a question about what’s bothering you, answer it to process it.You can come back and reflect on your thoughts. This part of the app is only visible to you. </Text>
        </View>
        </View>
        </Card>
        <CardSpacer/>
        <KeyboardAwareScrollView
    style={{ backgroundColor: '#101010'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
        <View style={styles.questionadd}>
        <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={400}
        //scrollEnabled={true}
        style={styles.secondinput}
        onChangeText={(text)=>{
        setqcharcount(text.length)
        return onChageQuestion(text)
      }}
        value={questionValue}
        multiline={true}
        placeholder="Enter your question here"
        placeholderTextColor={'white'}
        //tvParallaxShiftDistanceX={200}
      />
      </View>
      {/* <View style={{height:1,backgroundColor:'white',elevation:2}}/> */}
      <View style={styles.answeradd}>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={400}
        //scrollEnabled={true}
        style={styles.answerinput}
        onChangeText={(text)=>{
        setCharCount(text.length)
        return onChangeText(text)
      }}
        value={value}
        multiline={true}
        placeholder="Enter your answer here"
        placeholderTextColor={'white'}
        //tvParallaxShiftDistanceX={200}
      />
      <Button
       title='Add'
       titleStyle={{fontFamily:'Intermedium',fontSize:12,color:'black'}}
       buttonStyle={{backgroundColor:'white',borderRadius:6,paddingHorizontal:0,fontFamily:'InterRegular',opacity:0.7}}
       containerStyle={{width:90,fontFamily:'InterRegular',fontSize:8,marginRight:12,marginTop:12,opacity:opacity,marginBottom:16}}
       />
        </View>
        </KeyboardAwareScrollView>
        <VentQuestion/>
      </View>
    </View>
    </ScrollView>
  )
}

export default VentScreen

const styles = StyleSheet.create({
  secondinput:{
    fontFamily:'Intermedium',
    fontSize:20,
    opacity:0.8,
    color:'white',
   // padding:12

  },
  answerinput:{
    fontFamily:'InterRegular',
    fontSize:16,
    opacity:0.7,
    color:'white',
   // padding:12

  },


  questionadd:{
    minHeight:70,
    paddingHorizontal:20,
    paddingVertical:12,
   // marginHorizontal:20,
   borderColor:'#303030',
   borderWidth:2,
    marginTop:10,
   //borderWidth:2,
    elevation:5,
    backgroundColor:'#1A1A1A',
    //opacity:0.9,
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  answeradd:{
    minHeight:180,
    paddingHorizontal:20,
    paddingVertical:12,
   // marginHorizontal:20,
    borderColor:'#303030',
    borderWidth:2,
   // marginTop:10,
   //borderWidth:2,
    elevation:5,
    backgroundColor:'#1A1A1A',
    //opacity:0.9,
    borderBottomLeftRadius:16,
    borderBottomRightRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  textArea:{
    paddingTop:4,
    width:210,
    paddingLeft:15
  },
  discoverCard:{
    backgroundColor:'#222222',
    marginHorizontal:0,
    borderRadius:20,
    flexDirection:'row',
    borderWidth:0,
    padding:16,
    elevation:5,
    marginBottom:6
  },
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal:16
  },
  header:{
    marginTop:60
  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  }

})
