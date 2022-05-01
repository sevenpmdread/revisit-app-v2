import { StyleSheet, Text, View,FlatList, ScrollView, Pressable } from 'react-native'
import React,{useState} from 'react'
import { Card,Button } from 'react-native-elements'
import RenderResponseCards from './RenderResponseCards'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { youranswers } from '../dummydata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal'
const RenderReminderQuestions = ({question,questionid,reminddate,navigation,onCancel}) => {
  const [postmodalVisible,setpostModalVisible] = useState(false)
  const [isLoading,setLoading] = useState(false)
  const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric',hour:"numeric",minute:"numeric"};
  const [selectedIds, setSelectedId] = useState([]);
  //console.log("DATEEE ",reminddate,new Date())
  const [date, setDate] = useState(reminddate)
  const [open, setOpen] = useState(false)
  const [reminder,setreminder] = useState(true)
  var getTime = () => {
    let date = new Date();
    var tz = date.toString().split("GMT")[1].split(" (")[0];
    tz = tz.substring(1,5);
    let hOffset = parseInt(tz[0]+tz[1]);
    let mOffset = parseInt(tz[2]+tz[3]);
    let offset = date.getTimezoneOffset() * 60 * 1000;
    let localTime = date.getTime();
    let utcTime = localTime + offset;
    let austratia_brisbane = utcTime + (3600000 * hOffset) + (60000 * mOffset);
    let customDate = new Date(austratia_brisbane);

    let data = {
        day: customDate.getDate(),
        month: customDate.getMonth() + 1,
        year: customDate.getFullYear(),
        hour: customDate.getHours(),
        min: customDate.getMinutes(),
        second: customDate.getSeconds(),
        raw: customDate,
        stringDate: customDate.toString()
    }

    return data;
  }
  // const renderItem = ({ item,index }) => {
  //   const backgroundColor = selectedIds.indexOf(item.id)!=-1 ? "black" : "grey";
  //   const color = selectedIds.indexOf(item.id)!=-1 ? 'white' : 'black';
  //   console.log("itemitemitemiemm",item)
  //   var length = answers.length

  //   return (
  //     <RenderResponseCards
  //      // item={item}
  //       onPress={() => setSelectedId( selectedIds => [...selectedIds,item._id])}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //       answertext={item.answer_text}
  //       answer={item}
  //       zindex={length - index}
  //       scale={1 - 0.1*(length-1) + 0.1*(index)}
  //       opacity={0.8 +  0.2*(index)}
  //       bottom={50*index}

  //     />
  //   );
  // };
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
    <ScrollView>
      <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
     onBackButtonPress={()=> setpostModalVisible(false)}
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
              <Text style={{color:'white',fontFamily:'InterRegualar',fontSize:20,alignSelf:'center',textAlign:'center',paddingBottom:20}}>Are you sure you want to delete this reminder</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:200}}>
              <Pressable
              onPress={()=>
                {

                  setpostModalVisible(false)
                }
              }
              style={{backgroundColor:'white',padding:12,borderRadius:6,opacity:1}}><Text style={{color:'black',fontFamily:'InterRegualar',fontSize:16,opacity:1}}>Cancel</Text></Pressable>
              <Pressable
               onPress={()=> {
                // console.log("PRESSED DELETED")
                onCancel(questionid)
              //   setLoading(true)
              //   await removeventquestion(questionid)
              //   setLoading(false)
              //   setpostModalVisible(false)
              //   setreaload()
               }}
              style={{backgroundColor:'red',padding:12,borderRadius:6}}><Text style={{color:'white',fontFamily:'InterRegualar',fontSize:16,opacity:1}}>Delete</Text></Pressable>
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
      <View style={styles.questioncard}>
      <DatePicker
        modal
        mode={"datetime"}
        open={open}
        date={date}
        onConfirm={async (date) => {
          var d = getTime()
         // console.log(new Date(date) - d.raw)
          setOpen(false)
         // var response = await setReminders({postid:post.item.id,date:date})
         setDate(date)
         newnotificationhandler({question:post.item.text,id:post.item.id},(new Date(date) - d.raw))
        setreminder(true)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Card  containerStyle={{backgroundColor:'black',borderRadius:6,paddingHorizontal:16,paddingTop:12,borderWidth:0,borderBottomWidth:0,paddingBottom:20,borderColor:'white',marginBottom:20,elevation:0}}>
      <Text style={styles.question}>{question}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:12}}>
      <Button
              title='Answer'
      titleStyle={{color:"black",textAlign:"left",opacity:1}}
      buttonStyle={{
        padding:8,
        paddingHorizontal:12,
        backgroundColor:'white',
        borderRadius:6,
        marginTop:6,
        marginVertical:0,
      //  marginBottom:20,
        textAlign:"left",
      //  marginHorizontal:24,
        fontSize:12,
        fontFamily:'InterRegular',

      }}
      onPress={()=>navigation.navigate("CreateAnswer",{post:{_id:questionid,question_text:question}})}
              />
                  <View style={{flexDirection:'row',backgroundColor:"#5D51D1",borderRadius:12,padding:8,opacity:0.8,elevation:0,borderColor:'#5D51D1',borderWidth:0.5,marginTop:6}}>
                    <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons name="clock-check" size={24} color="white" style={{opacity:0.9}} />
                  <Text style={{color:'white',fontSize:12,paddingHorizontal:6,paddingTop:3}}>{new Date(date).toLocaleString(undefined, options).slice(4,11)}{new Date(date).toLocaleString(undefined, options).slice(15)}</Text>
                  </View>
                  <TouchableOpacity onPress={()=>
                    {
                      setpostModalVisible(true)

                    }
                    }>
        <Entypo name="cross" size={20} color="white" style={{alignSelf:'flex-end',paddingVertical:2,paddingLeft:8}}/>
        </TouchableOpacity>
                  </View>
      </View>

      </Card>


      {/* <View style={{marginLeft:20,marginBottom:340,marginTop:0,paddingTop:0}}>
      <FlatList
    data={answers}
    inverted={true}
    renderItem={renderItem}
    keyExtractor={(item) => {
     return  item.answerid
    }}
    extraData={selectedIds}

    />
    </View> */}
      </View>
    </ScrollView>
  )
}

export default RenderReminderQuestions

const styles = StyleSheet.create({
  question:{
      fontFamily:'InterRegular',
      color:'white',
      fontSize:26,
      opacity:0.8
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
  }
})
