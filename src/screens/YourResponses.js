import { StyleSheet, Text, View,FlatList,RefreshControl } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import RenderResponseQuestion from '../comps/RenderResponseQuestion'
import { yourresponses } from '../dummydata'
import { getResponsesbythisuser } from '../context/restapi'
import { ScrollView } from 'react-native-gesture-handler'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const YourResponses = ({navigation}) => {
  console.log("NAVIAGATION",navigation)
  const [questions,setQuestions] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() =>
    {
      setRefreshing(false)
    }
    );
  }, []);
  useEffect(()=>{
    navigation.addListener('focus', () => {
      onRefresh()
    });
    const fetchData = async () => {
    const data  =   await getResponsesbythisuser()
     console.log("data",data)
     var questionsArr = []
     for(let i = 0; i < data.nHits;i++)
     {
      let obj = {}
     obj.questionid = data.answers[i]._id.question_id
     obj.questiontext = data.answers[i]._id.question_text
     obj.answers = data.answers[i].answer
     questionsArr[i] = obj
     }
     setQuestions(questionsArr)
  //   setanswers(data)
  //   setLoading(false)
  //  console.log("answers",answers)
  }
  fetchData()

}, [refreshing])
  return (
    <ScrollView style={{backgroundColor:"#0C0C0C",flex:1}}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
    <FlatList
    data={questions}
   // contentContainerStyle={{flex:2}}
    //inverted={true}
    renderItem={(item)=>
    {
      //console.log('ITEM IN YOUR RESPONSE',item)
     return <RenderResponseQuestion question={item.item.questiontext} questionid={item.item.questionid} answers= {item.item.answers} navigation={navigation} />}
    }
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    keyExtractor={item => item.questionid}
    />
    </ScrollView>
  )
}

export default YourResponses

const styles = StyleSheet.create({})
