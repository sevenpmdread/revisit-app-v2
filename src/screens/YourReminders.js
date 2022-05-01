import { StyleSheet, Text, View,FlatList,RefreshControl } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import RenderResponseQuestion from '../comps/RenderResponseQuestion'
import { yourresponses } from '../dummydata'
import { getResponsesbythisuser } from '../context/restapi'
import { ScrollView } from 'react-native-gesture-handler'
import PushNotification from 'react-native-push-notification'
import RenderReminderQuestions from '../comps/RenderRemindersQuestions'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const YourReminders = ({navigation}) => {
  console.log("NAVIAGATION",navigation)
  const [questions,setQuestions] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const [reminder,setreminder] = useState(false)
  const [date, setDate] = useState(new Date())
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() =>
    {
      setRefreshing(false)
    }
    );
  }, []);
  useEffect(() => {

    let arr = []
    const  fetchHome = async() => {
     await PushNotification.getScheduledLocalNotifications((response) =>

     {
//       console.log("response notifications",response)

       for(let i = 0;i < response.length;i++)
       {
         if(response[i].date > new Date())
         {
          arr.push(
            {
              _id:response[i].id,
              question_text:response[i].title,
              date:response[i].date
            }
            )
         }
       }
       setQuestions(arr)
       console.log(questions)
    //    for(let i = 0;i < response.length;i++)
    //    {
    //    if(response[i].id == post.item.id)
    //    {
    //      console.log("truth",response[i].date > new Date())
    //      if(response[i].date > new Date())
    //      {
    //      setreminder(true)
    //      setDate(response[i].date)
    //     }
    //     else
    //     {
    //      setreminder(false)
    //     }
    //    }
    //  }

    }
    );


    }
      fetchHome()

    },[refreshing])
  return (
    <ScrollView style={{backgroundColor:"#0C0C0C",flex:1}}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>

     {
       questions && questions.length ?

       <FlatList
    data={questions}
   // contentContainerStyle={{flex:2}}
    inverted={true}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    renderItem={(item)=>
    {
      console.log('ITEM IN YOUR RESPONSE',item)
     return <RenderReminderQuestions question={item.item.question_text} questionid={item.item._id}  reminddate={item.item.date} navigation={navigation} onCancel={(id)=>{
      PushNotification.cancelLocalNotification(id)
      onRefresh()
    }}/>}
    }
    keyExtractor={item => item.questionid}
    />
    :
    <View style={{backgroundColor:'white',padding:12,borderRadius:6,width:200,alignSelf:'center',marginTop:150,opacity:0.8}}>
      <Text style={{fontFamily:'InterRegular',fontSize:16,color:'black',alignSelf:'center'}}>No reminders set</Text>
    </View>
  }
    </ScrollView>
  )
}
export default YourReminders

const styles = StyleSheet.create({})
