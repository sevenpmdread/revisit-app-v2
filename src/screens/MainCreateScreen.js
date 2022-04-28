import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { quesdescs } from '../dummydata';
import CreateList from '../comps/CreateList';
import { categoryquestions } from '../dummydata';
import RenderCreateQuestions from '../comps/RenderCreateQuestions';
import { fetchHomedata,getAllQuestions,getRandomQuestion } from '../context/restapi';
import RenderCategoryQuestions from '../comps/RenderCategoryQuestions';
import LoadingScreennew from './Loadingnew';
import CategoryQuestion from '../comps/CategoryQuestions';
//import CategoryQuestion from '../comps/CategoryQuestions';
const MainCreateScreen = ({navigation}) => {
  var categoryquesnew = []
  let arr = []
  const [skip,setskip]  = useState(0)
  const [allanswers,setallanswers] = useState([])
  const [arrdata,setdata] = useState(null)
  const [isLoading,setLoading] = useState(false)



  useEffect(() => {

    //setReminders()

    const fetchquestions = async() => {
      let data = {}
      let questionsasync = await AsyncStorage.getItem('createscreenquestions')
      if(questionsasync && skip == 0)
      {
      data = JSON.parse(questionsasync)
      }
      else
      data =  await getAllQuestions(skip)
      console.log("data post post post ",data)
      let arr = [...allanswers,...data.questions]
    // setLoading(false)
     setallanswers(arr)
     // console.log("explore explore",exploreques,exploreques.length)
    //  console.log("ar ar ar ar r",arr)


    }
   const  fetchHome = async() => {
    let response = {}
     const data  = await AsyncStorage.getItem('homedate')
     if(data)
     {
       response = JSON.parse(data)
       console.log("in asyncstorage")
     }
     else
     response = await fetchHomedata()
    // console.log("RESPONSE RESPONSE",response)
     var categorycount = response.nbHits
    //",response)
     for(let i = 0; i <  categorycount;i++)
     {
      let obj = {}
      obj.type = response.questions[i]._id
      obj.questions = response.questions[i].questions
      obj.desc = response.questions[i].questions[0].desc
      categoryquesnew[i] = obj
    //  console.log("obj",obj)
     }
    // console.log("in effect",categoryquesnew)
     setdata(categoryquesnew)
    // setusername(state.username)
    // console.log(username)
     setLoading(true)
   }

    //console.log("state.homescreendata.questions",state)
    fetchHome()
    fetchquestions()
    //createChannel()

   },[skip,isLoading])

  const [isVisible, setIsVisible] = useState(false);
  const [visible,setVisible] = useState(false)

  const list = [
    { title: 'Share this question', titleStyle:{color:'white'}, containerStyle: {backgroundColor:'black',borderTopRadius:20,marginHorizontal:2} },
    { title: 'Set a reminder',titleStyle:{color:'white'}, containerStyle: {backgroundColor:'black',marginHorizontal:1} },
    {
      title: 'Cancel',
      titleStyle:{color:'white'}, containerStyle: {backgroundColor:'#DF3939',marginHorizontal:1},
      onPress: () => setIsVisible(false),
    },
  ];
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   const [value, onChangeText] = useState('');
  const [charCount,setCharCount] = useState(value.length)
  var opacity = charCount > 0 ? 1 : 0.4
  return (
    <KeyboardAwareScrollView
    style={{ backgroundColor: '#101010'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
    <View style={styles.container} >
      <View>
      <Button
      title='Get a random question'
      titleStyle={{color:"white"}}
      containerStyle={{
        paddingRight:0,
        paddingTop:2,
       // opacity:1,
        opacity:1,
        fontSize:12,
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'black',
        borderRadius:12,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        marginHorizontal:24,
        fontSize:12,
        fontFamily:'InterRegular',
        borderWidth:1,
        borderColor:'grey'

      }}
      onPress={async()=>{
        console.log("I AM PRESSED")
        let postrandom = await getRandomQuestion()
        console.log("RANDOM POST",postrandom)
        navigation.navigate("CreateAnswer",{post:postrandom})
        }}
      />
      <Button
      title='Browse all questions'
      titleStyle={{color:"white",textAlign:"left"}}
      containerStyle={{
        paddingRight:0,
        paddingTop:2,
       // opacity:1,
        opacity:1,
        fontSize:12,
        textAlign:"left",
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'black',
        borderRadius:12,
        paddingHorizontal:0,
        paddingVertical:12,
        marginVertical:8,
        marginBottom:20,
        textAlign:"left",
        marginHorizontal:24,
        fontSize:12,
        fontFamily:'InterRegular',
        borderWidth:1,
        borderColor:'grey'

      }}
      onPress={()=>{
        console.log(visible)
        return setVisible(!visible)}}
      />

<FlatList
contentContainerStyle={{marginLeft:8,display:visible ? "flex": "none"}}
 style={styles.feed}
data = {allanswers}
 snapToAlignment ="start"
 renderItem={(item)=>
{
 // console.log("item",item)
  return visible ? <RenderCategoryQuestions nav = {navigation} post={item} width={true} onpress={true}/> : <></>}
 }
 keyExtractor={item => item.id}
 showsVerticalScrollIndicator={false}
 extraData={allanswers}

 />
 {
   visible ?
   <TouchableOpacity onPress={()=>setskip(skip+1)}>
   <Text style={{color:'white',alignSelf:'center',marginBottom:10}}>Load more</Text>
 </TouchableOpacity>
 : <></>
 }
  {/* {
      isLoading ?
      <FlatList
      data={arrdata}
      renderItem={(item)=>
      {
       return <CategoryQuestion type={item.item.type} desc={item.item.desc} questions={item.item.questions} navigation={navigation}/>}
      }
      keyExtractor={item => item.type}
      /> :




      <LoadingScreennew/>

    } */}
  <FlatList
    data={arrdata}
    renderItem={(item)=>
    {
     return <CreateList type={item.item.type} desc={item.item.desc} questions={item.item.questions} navigation={navigation}/>}
     }
    keyExtractor={item => item.desc}
    />
      </View>


    </View>
    </KeyboardAwareScrollView>
  )
}

export default MainCreateScreen

const styles = StyleSheet.create({
  count: {
    fontFamily:'InterRegular',
    fontSize:12,
    opacity:0.4,
    color:'black',
    paddingVertical:6,
    marginTop:12
   // paddingVertical:'',
  },
  secondinput:{
    fontFamily:'InterRegular',
    fontSize:20,
    opacity:0.8,
    color:'black',
   // padding:12

  },
  input:{
    minHeight:270,
    paddingHorizontal:20,
    paddingVertical:12,
    marginHorizontal:20,
    borderColor:'#D8D8D8',
    marginTop:10,
   //borderWidth:2,
    elevation:5,
    backgroundColor:'#F3F3F3',
    //opacity:0.9,
    borderRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 28,
    fontFamily:'InterRegular',
    color:'white',
   // marginRight:0,
  // paddingHorizontal:24,
  //  paddingLeft:16,
  //  paddingTop:20,
    paddingBottom:12,
   // marginRight:34,
   paddingRight:2,
   // alignContent:'center',
   // justifyContent:'center',
    //display:'flex',
    //opacity:0.9

  },
  buttonrow:{
    flexDirection:'row',
    //justifyContent:''
  },
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    paddingTop:42
   // paddingHorizontal:16
  },
  header:{
    marginTop:36,
    height:80,
    padding:12,
    textAlign:"right",
    backgroundColor: '#222222',
    flexDirection:'row',
    justifyContent:'space-between'
  }

})
