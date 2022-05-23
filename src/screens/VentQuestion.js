import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
//import { ventquestions } from '../dummydata'
import RenderVentQuestions from '../comps/RenderVentQuestions'
import { getvent } from '../context/restapi'
const VentQuestion = ({questions,setquestiontext,onaddnew,setreaload,setquestionid}) => {

  return (
         <FlatList
        // contentContainerStyle={{flex:1,backgroundColor:'#0C0C0C'}}
     // style={{flex:1,backgroundColor:'#0C0C0C'}}
      data={questions}
      inverted={true}
      renderItem={(item)=>
        {
       //  console.log("ITEM",item)
         return <RenderVentQuestions
         setquestionid={setquestionid}
         setreaload={setreaload}
         setquestiontext={setquestiontext}
         onaddnew={onaddnew}
         answer = {item.item.answer}
         questionid = {item.item.id}
         question={item.item.question_text}/>}
        }
      keyExtractor={item => item.id}
      />
  )
}

export default VentQuestion

const styles = StyleSheet.create({})
