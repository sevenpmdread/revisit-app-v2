import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { yourpins } from '../dummydata'
import RenderYourPins from '../comps/RenderYourPins'
import { getPinsbythisuser } from '../context/restapi'

const YourPins = () => {
  const [questions,setQuestions] = useState([])
  useEffect(()=>{
    const fetchData = async () => {
    const data  =   await getPinsbythisuser()
    // console.log("data",data)
     var questionsArr = []
     for(let i = 0; i < data.count;i++)
     {
      let obj = {}
     obj.questionid = data.pins[i]._id.question_id
     obj.questiontext = data.pins[i]._id.question_text
     obj.answers = data.pins[i].answer
     questionsArr[i] = obj
     }
     setQuestions(questionsArr)
  //   setanswers(data)
  //   setLoading(false)
  //  console.log("answers",answers)
  }
  fetchData()

}, [])
  return (
    <View>
    <FlatList
data={questions}
renderItem={(item)=>
{
 return <RenderYourPins question={item.item.questiontext} questionid={item.item.questionid} answers= {item.item.answers}/>}
}
keyExtractor={item => item.questionid}
/>
</View>
  )
}

export default YourPins

const styles = StyleSheet.create({})
