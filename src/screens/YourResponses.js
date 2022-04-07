import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import RenderResponseQuestion from '../comps/RenderResponseQuestion'
import { yourresponses } from '../dummydata'
import { getResponsesbythisuser } from '../context/restapi'
const YourResponses = ({navigation}) => {
  console.log("NAVIAGATION",navigation)
  const [questions,setQuestions] = useState([])
  useEffect(()=>{
    const fetchData = async () => {
    const data  =   await getResponsesbythisuser()
    // console.log("data",data)
     var questionsArr = []
     for(let i = 0; i < data.nHits;i++)
     {
      let obj = {}
     obj.questionid = data.answers[i]._id
     obj.questiontext = data.answers[i].question_text
     obj.answers = data.answers[i].answersnew
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
      //console.log('ITEM IN YOUR RESPONSE',item)
     return <RenderResponseQuestion question={item.item.questiontext} questionid={item.item.questionid} answers= {item.item.answers} navigation={navigation}/>}
    }
    keyExtractor={item => item.questionid}
    />
    </View>
  )
}

export default YourResponses

const styles = StyleSheet.create({})
