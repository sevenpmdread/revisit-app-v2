import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card,Button } from 'react-native-elements'
import React,{useEffect,useState} from 'react'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { ventanswers } from '../dummydata';
//import RenderCategoryQuestions from './RenderCategoryQuestions';
import RenderVentAnswers from './RenderVentAnswers';
import CardSpacer from './CardSpacer';
import { removeventquestion } from '../context/restapi';
import Modal from 'react-native-modal'
import LoadingScreennew from '../screens/Loadingnew';
const RenderVentQuestions = ({questionid,answer,question,onaddnew,setquestiontext,setreaload,setquestionid}) => {

  useEffect(() => {

    //setReminders()
   const  fetchHome = async() => {


   }
   },[])
  const [postmodalVisible,setpostModalVisible] = useState(false)
  const [error,seterror] = useState(null)
  const [isLoading,setLoading] = useState(false)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (
    <View>
        <CardSpacer/>
        <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
        transparent={true}
        containerStyle={{backgroundColor:"black",}}
        visible={postmodalVisible}
      >
        <View style={{alignContent:"center",alignSelf:"center"}}>
        <View style={styles.postcenteredView}>
          <View style={styles.postmodalView}>
            {

            !isLoading ?
            <>
              <Text style={{color:'white',fontFamily:'InterRegualar',fontSize:20,alignSelf:'center',textAlign:'center',paddingBottom:20}}>Are you sure you want to delete this question</Text>
              <Text style={{color:'white',fontFamily:'InterRegualar',fontSize:10,opacity:0.8,textAlign:'center',paddingBottom:36,paddingHorizontal:30}}>All answers asssociated with this question will be deleted...</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:200}}>
              <TouchableOpacity
              onPress={()=>                setpostModalVisible(false)
              }
              style={{backgroundColor:'white',padding:12,borderRadius:6,opacity:0.8}}><Text style={{color:'black',fontFamily:'InterRegualar',fontSize:16,opacity:0.6}}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity
              onPress={async()=> {
                setLoading(true)
                await removeventquestion(questionid)
                setLoading(false)
                setpostModalVisible(false)
                setreaload()
              }}
              style={{backgroundColor:'red',padding:12,borderRadius:6}}><Text style={{color:'white',fontFamily:'InterRegualar',fontSize:16,opacity:1}}>Delete</Text></TouchableOpacity>
              </View>
            </>
            :
            <>
            <LoadingScreennew/>
            <Text style={{color:'white',fontFamily:'InterRegualar',fontSize:10,opacity:0.8,textAlign:'center',paddingBottom:36,paddingHorizontal:30}}>Deleting answer</Text>
            </>

            }
          </View>
        </View>
        </View>

      </Modal>
       <Card  containerStyle={{backgroundColor:'#111111',borderRadius:12,paddingHorizontal:16,paddingTop:12,borderWidth:3,paddingBottom:20,borderColor:'#202020',marginHorizontal:0}}>
      <Text style={styles.question} onPress={()=> console.log("hello")}>{question}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Button
      onPress={()=>{
        setquestionid(questionid)
     //   console.log(question)
        setquestiontext(question)
        onaddnew()
      }}
       title='Add a new answer'
       titleStyle={{fontFamily:'Intermedium',fontSize:10,color:'black'}}
       buttonStyle={{backgroundColor:'#F5F5F5',borderRadius:6,paddingHorizontal:0,fontFamily:'InterRegular',opacity:0.7}}
       containerStyle={{width:120,fontFamily:'InterRegular',fontSize:8,marginRight:12,marginTop:16,elevation:5}}
       />
       <TouchableOpacity
        onPress={()=>
          setpostModalVisible(true)
          //removeventquestion(questionid)
        }
       style={{paddingTop:20}}>
        <MaterialIcons name="delete-outline" size={24} color="#FF4E4E"  />
        </TouchableOpacity>
       </View>
      </Card>
      <View>
      <CardSpacer/>
      <FlatList
     contentContainerStyle={{marginLeft:8}}
      horizontal={true}
      inverted={true}
      style={styles.feed}
       data = {answer}
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
         //console.log("answer_item",item)
      return <RenderVentAnswers answertext={item.item.answer_text} answerid={item.item.answerId} timestamp={item.item.timestamp}/>}
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
postmodalText: {
  marginBottom: 40,
  marginTop:16,
  textAlign: "center",
  color:'white'

},
postcenteredView: {
 // flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor:"#0C0C0C",
  opacity:0.95,
  borderWidth:2,
  borderColor:'white',
  height:300,
  marginTop: 100,
 // width:300,
  borderRadius:12,
//  height:300,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
postmodalView: {
  margin: 20,
  backgroundColor: "transparent",
  borderRadius: 12,
  padding: 5,
  alignItems: "center",
},
})
