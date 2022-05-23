import { StyleSheet, Text, View,Image, TextInput, FlatList, ScrollView,Pressable,Modal,ToastAndroid,Dimensions  } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Button, Card,FAB  } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import VentQuestion from './VentQuestion';
import CardSpacer from '../comps/CardSpacer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import { createVentQuestion } from '../context/restapi';
import LoadingScreennew from './Loadingnew';
//import Modal from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { storeventnew,getventall,getvent } from '../context/restapi';
import { ventcreate,addventstore } from '../context/restapi';
const VentScreen = ({route,navigation}) => {
  const windowHeight = Dimensions.get('window').height;

  var clearParams = () => {
    navigation.setParams({openask: null, fromhome: null})
    console.log("SDHFGSDHSDF SDHJS DFJSDFH ",route)
    route.params.fromhome = false
    console.log("SDHFGSDHSDF SDHJS DFJSDFH ",route)
  }
 // console.log(navigation)
 //console.log("hello")
 const [disablequestion,setdisable] = useState(false)
 const [addnew,setaddnew] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [postmodalVisible, setpostModalVisible] = useState(false);
  const [ventmodalVisible, setventModalVisible] = useState(false);
  const [anonmodalVisible, setanonModalVisible] = useState(false);
  const [ventquestions,setventquestions] = useState([])
 //[] const [ventanswers, setventanswers] = useState([])
  const [reload,setreaload] = useState(false)
  useFocusEffect(
    React.useCallback(() => {
      console.log("IN FOCUS")
      const fromhome = route.params?.fromhome
      const openask = route.params?.openask
      console.log("truturturturturt ",fromhome,openask)
      if(openask)
      {
        onChageQuestion('')
        setModalVisible(true)
        clearParams()

      }
      else if(fromhome)
       {

        setventModalVisible(true)
        clearParams()
      //  navigation.setParams({fromhome:null})

       }

    })
  );
  useEffect(() => {
    let fetchData = async()=> {
      let ventquestions = await getventall()
      setventquestions(ventquestions)

    //  setventanswers(ventquestions)
    }
    fetchData()
  }, [reload])

  //setventModalVisible(!ventmodalVisible);
  const [isLoading,setLoading] = useState(false)

  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   const [value, onChangeText] = useState('');
   const [questionid,setquestionid] = useState(null)
   const [error,seterror] = useState(false)
   const [isAnonymous, setSelection] = useState(false);
   const [questionValue,onChageQuestion] = useState("")
   const [qcharcount,setqcharcount] = useState(questionValue)
   const [charCount,setCharCount] = useState(value.length)
   var opacity = qcharcount>0 ? 1 : 0.4
   var opacityvent = qcharcount>0 && charCount > 0 ? 1 : 0.4

  return (
    <View style={{backgroundColor:'#0C0C0C',flex:1,marginBottom:56}}>
    <ScrollView>

    <View style={styles.container}>

      <View>
        <Card containerStyle={styles.discoverCard}>
        <View style={{flexDirection:'row',}}>
        <Image  source={require('../../assets/VentVectorNew.png')} containerStyle={{height:80}} imageStyle={{height:80}}resizeMode='contain'/>
        <View style={styles.textArea}>
          <Text style={{fontFamily:'InterSemi',color:'white',fontSize:16}}>VENT</Text>
          <Text  style={{fontFamily:'InterRegular',color:'white',fontSize:11,opacity:0.7}}>Ask a question about what’s bothering you, answer it to process it.You can come back and reflect on your thoughts. This part of the app is only visible to you. </Text>
        </View>
        </View>
        </Card>

        <CardSpacer/>

      <TouchableOpacity
      onPress={()=>
      {  onChageQuestion('')
        setModalVisible(true)
      }
      }
      style={{
         backgroundColor:'black',
         borderRadius:12,
        // paddingHorizontal:12,
        // paddingVertical:12,
         padding:16,
         marginVertical:8,
         marginBottom:0,
         marginHorizontal:0,
         textAlign:"left",
      }}>
        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <Text style={{color:'white',fontFamily:"Intermedium",
        fontSize:12}}>
ASK A QUESTION
        </Text>
        <AntDesign name="plus" size={16} color="white" />
        </View>
      </TouchableOpacity>


        <VentQuestion
        setquestionid={setquestionid}
        setreaload={()=>setreaload(!reload)}
        questions = {ventquestions}
        setquestiontext={onChageQuestion}
        onaddnew={()=>

      {
        setventModalVisible(true)
        onChangeText('')
        setdisable(true)
        setaddnew(true)
        }
          }/>
        <Modal
        containerStyle={{backgroundColor:"black",
        opacity:0.2
      }}
      style={{backgroundColor:"black",
      opacity:0.2
    }}
        animationType="slide"
        presentationStyle ="overFullScreen"
        //transparent={true}
        visible={ventmodalVisible}
        backgroundColor="black"
        onRequestClose={() => {

           var writedata = async() =>{
            if(value!="" && questionValue !="" && !addnew)
           {
             var response = await storeventnew({question_text:questionValue,answer_text:value,publised:false})
             console.log("ASYNC RESPONSE",response)
             ToastAndroid.show('Saved', ToastAndroid.SHORT)
             setreaload(!reload)
          }
          else if(value!="" && questionValue !="" && addnew)
          {
           var response = await addventstore({question_text:questionValue,answer_text:value,publised:false,id:questionid})
           console.log("ASYNC RESPONSE",response)
           ToastAndroid.show('Saved', ToastAndroid.SHORT)
           setreaload(!reload)
          }
           setventModalVisible(!ventmodalVisible)
           navigation.setParams({ fromhome: null })
         }
         writedata()
        }}
      >
        <View style={styles.headernew}>
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async() =>

               {
                 if(value!="" && questionValue !="" && !addnew)
                {
                  var response = await storeventnew({question_text:questionValue,answer_text:value,publised:false})
                  console.log("ASYNC RESPONSE",response)
                  ToastAndroid.show('Saved', ToastAndroid.SHORT)
                  setreaload(!reload)
               }
               else if(value!="" && questionValue !="" && addnew)
               {
                var response = await addventstore({question_text:questionValue,answer_text:value,publised:false,id:questionid})
                console.log("ASYNC RESPONSE",response)
                ToastAndroid.show('Saved', ToastAndroid.SHORT)
                setreaload(!reload)
               }
                setventModalVisible(!ventmodalVisible)
              }
              }
            >
                <View style={{flexDirection:'row'}}>
                <Ionicons name="arrow-back" size={28} color="white" />
                <Text style={{fontFamily:'InterRegular',color:'white',fontSize:14,paddingTop:4,paddingLeft:6,opacity:0.6}}>Save</Text>
                </View>
            </Pressable>
            <TouchableOpacity>
            <Button
      title='Publish'
        disabled={value!='' && questionValue != ''? false :true }
      containerStyle={{
        paddingRight:8,
        paddingTop:2,
       // opacity:1,
        opacity:1,
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'#5D51D1',
        borderRadius:36,
        paddingHorizontal:20,
        paddingVertical:12,
        fontFamily:'Intermedium'

      }}
      onPress={
        ()=>
        {

        setanonModalVisible(true)

      }
      }
      // onPress={async()=>{
      //   setpostModalVisible(true)
      //   setLoading(true)
      //  // console.log("RANDOM POST id",post,post._id)
      //   let postnew = await createVentQuestion(questionValue,isAnonymous)

      //   if(postnew!='error')
      //   {
      //     seterror(false)
      //     setTimeout(()=>{ setpostModalVisible(false)}, 2000)
      //   }
      //   else
      //   seterror(true)

      //   setLoading(false)


      //   }}

      />
      </TouchableOpacity>
        </View>
        <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
        transparent={true}
        containerStyle={{backgroundColor:"black",}}
        visible={anonmodalVisible}
        onRequestClose={() => {

          setanonModalVisible(!anonmodalVisible);

        }}
      >
        <View style={{alignContent:"center",alignSelf:"center"}}>
        <View style={styles.anoncenteredView}>
          <View style={styles.anonpostmodalView}>


            <Pressable
              style={[styles.button]}
              onPress={async () =>
                {
                  setpostModalVisible(true)
        setLoading(true)
       // console.log("RANDOM POST id",post,post._id)
        let postnew = await ventcreate(questionValue,value,false)
        var response = await storeventnew({id:Math.floor(Math.random() * 10),question_text:questionValue,answer_text:value,publised:true,isAnonymous:false})
                 // console.log("ASYNC RESPONSE",response)
                  //ToastAndroid.show('Saved', ToastAndroid.SHORT)

        if(postnew!='error')
        {
          seterror(false)
          setTimeout(()=>{ setpostModalVisible(false)}, 2000)
        }
        else
        seterror(true)

        setLoading(false)
        setanonModalVisible(false)
        setModalVisible(false)

                }
              }
            >
              <View style={{backgroundColor:'white',padding:20,borderRadius:100,marginHorizontal:20}}>
              <Text style={{color:'black',paddingTop:0}}>Post with username</Text>
              </View>
              <Text style={{color:'white',paddingVertical:8,alignSelf:'center'}}>or</Text>
            </Pressable>

            <Pressable
              style={[styles.button]}
              onPress={async () =>
                {
                  console.log("ORESSED")
                  setpostModalVisible(true)
                  setLoading(true)
                 // console.log("RANDOM POST id",post,post._id)
                  let postnew = await ventcreate(questionValue,value,true)
                  var response = await storeventnew({id:Math.floor(Math.random() * 10),question_text:questionValue,answer_text:value,publised:true,isAnonymous:true})


                  if(postnew!='error')
                  {
                    seterror(false)
                    setTimeout(()=>{ setpostModalVisible(false)}, 2000)
                  }
                  else
                  seterror(true)

                  setLoading(false)
                  setanonModalVisible(false)


              }
              }
            >
              <Text style={{color:'white',paddingTop:0,opacity:0.7,textDecorationLine:'underline'}}>Post anonymously</Text>
            </Pressable>



          </View>
        </View>
        </View>

      </Modal>
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
              !error ?
              isLoading ?
              <>
              <LoadingScreennew/>
            <Text style={styles.postmodalText}>Publishing your answer</Text>
            </>
            :
            <>
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text style={styles.postmodalText}>Success! Your question will be visible on the feed</Text>
            </>
            :
            <>
            <AntDesign name="exclamation" size={40} color="red" />
            <Text style={styles.postmodalText}>Looks like you have already asked this question</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setpostModalVisible(!postmodalVisible)}
            >
              <Text style={{color:'red',paddingTop:20}}>Close</Text>
            </Pressable>
            </>


            }
          </View>
        </View>
        </View>

      </Modal>
        <View style={styles.maincontent}>

        <KeyboardAwareScrollView
    style={{ backgroundColor: '#101010'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
     {/* <CheckBox
        leftTextStyle={{color:'white',fontFamily:'InterRegular'}}
        checkBoxColor="white"
    style={{ padding: 20,backgroundColor:isAnonymous ? "#5D51D1":'black',marginHorizontal:0,marginVertical:0,borderRadius:0,opacity:isAnonymous ? 1: 0.6,
  paddingHorizontal:24}}
    onClick={()=>{
      setSelection(!isAnonymous)
    }}
    isChecked={isAnonymous}
    leftText={"Ask Anonmously"}
/> */}
         <View style={styles.ventquestionadd}>
        <TextInput
        disabled={disablequestion}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={400}
        //scrollEnabled={true}
        style={styles.ventsecondinput}
        onChangeText={(text)=>{
        if(!disablequestion)
        {setqcharcount(text.length)
        return onChageQuestion(text)}
      }}
        value={questionValue}
        multiline={true}
       // fontSize={32}
        placeholder='Enter your question or title here'
        placeholderTextColor={'grey'}
        //tvParallaxShiftDistanceX={200}
      />
      </View>
      <View style={{height:2,width:1,color:'white',paddingVertical:20}}/>
      <View style={styles.answeradd}>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={600}
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
        </View>
      </KeyboardAwareScrollView>
</View>
      </Modal>
        <Modal
        containerStyle={{backgroundColor:"black",
        opacity:0.2
      }}
      style={{backgroundColor:"black",
      opacity:0.2
    }}
        animationType="slide"
        presentationStyle ="overFullScreen"
        //transparent={true}
        visible={modalVisible}
        backgroundColor="black"
        onRequestClose={() => {
          navigation.setParams({fromhome:null})
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.headernew}>
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >

              <AntDesign name="close" size={32} color="white" />

            </Pressable>
            <Button
      title='Ask'
        disabled={opacity < 1 ? true :false }
      containerStyle={{
        paddingRight:8,
        paddingTop:2,
       // opacity:1,
        opacity:opacity,
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'#5D51D1',
        borderRadius:36,
        paddingHorizontal:20,
        paddingVertical:12,
        fontFamily:'Intermedium'

      }}
      onPress={async()=>{
        setpostModalVisible(true)
        setLoading(true)
       // console.log("RANDOM POST id",post,post._id)
        let postnew = await createVentQuestion(questionValue,isAnonymous)

        if(postnew!='error')
        {
          seterror(false)
          setTimeout(()=>{ setpostModalVisible(false)}, 2000)
        }
        else
        seterror(true)

        setLoading(false)


        }}

      />
        </View>

        <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
        transparent={true}
        containerStyle={{backgroundColor:"black",}}
        visible={postmodalVisible}
        onRequestClose={() => {
         setModalVisible(!modalVisible);
        }}
      >
        <View style={{alignContent:"center",alignSelf:"center"}}>
        <View style={styles.postcenteredView}>
          <View style={styles.postmodalView}>
            {
              !error ?
              isLoading ?
              <>
              <LoadingScreennew/>
            <Text style={styles.postmodalText}>Publishing your answer</Text>
            </>
            :
            <>
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text style={styles.postmodalText}>Success! Your question will be visible on the feed</Text>
            </>
            :
            <>
            <AntDesign name="exclamation" size={40} color="red" />
            <Text style={styles.postmodalText}>Looks like you have already asked this question</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setpostModalVisible(!postmodalVisible)}
            >
              <Text style={{color:'red',paddingTop:20}}>Close</Text>
            </Pressable>
            </>


            }
          </View>
        </View>
        </View>

      </Modal>
        <View style={styles.maincontent}>

        <KeyboardAwareScrollView
    style={{ backgroundColor: '#101010'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
     <CheckBox
        leftTextStyle={{color:'white',fontFamily:'InterRegular'}}
        checkBoxColor="white"
    style={{ padding: 20,backgroundColor:isAnonymous ? "#5D51D1":'black',marginHorizontal:0,marginVertical:0,borderRadius:0,opacity:isAnonymous ? 1: 0.6,
  paddingHorizontal:24}}
    onClick={()=>{
      setSelection(!isAnonymous)
    }}
    isChecked={isAnonymous}
    leftText={"Ask Anonmously"}
/>
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
       // fontSize={32}
        placeholder='"Enter your question here"'
        placeholderTextColor={'white'}
        //tvParallaxShiftDistanceX={200}
      />
      </View>
      </KeyboardAwareScrollView>
</View>
      </Modal>

      </View>

    </View>
    </ScrollView>
    <FAB
    title="+ VENT"
    onPress={()=>

    {
      onChangeText('')
      onChageQuestion('')
      setventModalVisible(true)
      setdisable(false)
    }
    }
  //  overlayColor="white"
    //placement="right"
    color="white"
    titleStyle={{color:'black',fontSize:20,padding:0,textAlign:'left'}}
    size="large"
   // visible={true}
   // overlayColor="black"
    containerStyle={{
      padding:1,
     // height:60,
      //width:200,
      borderRadius:30,
      borderWidth:0,
      borderColor:'white',
      backgroundColor:'white',

    }}
    style={{
      position:'absolute',
    marginTop:windowHeight-120,
    marginLeft:250,
    borderWidth:1,
    borderColor:'#453AB8',

  }}
    />
    </View>
  )
}

export default VentScreen

const styles = StyleSheet.create({
  ventsecondinput:{
    fontFamily:'InterRegular',
    fontSize:18,
    opacity:0.9,
    fontStyle:'normal',
    color:'white',
  },
  secondinput:{
    fontFamily:'Intermedium',
    fontSize:36,
    opacity:0.9,
    fontStyle:'italic',
    color:'white',
   // padding:12

  },
  answerinput:{
    fontFamily:'InterRegular',
    fontSize:16,
   // opacity:0.7,
    color:'white',
   // padding:12

  },
  ventquestionadd:{
    padding:18,
    borderBottomWidth:2,
    borderBottomColor:'grey',
    marginHorizontal:16,
    marginTop:20,
    flexDirection:'column',
    justifyContent:'space-between'
  },


  questionadd:{
   // minHeight:70,
   // paddingHorizontal:20,
    //paddingVertical:12,
   // marginHorizontal:20,
  // borderColor:'#303030',
  // borderWidth:2,
    marginTop:10,
    padding:24,
    marginHorizontal:24,
    marginTop:50,
    //fontFamily:'Intermedium',
    //fontSize:24,
   //borderWidth:2,
    //elevation:5,
   // backgroundColor:'#1A1A1A',
    //opacity:0.9,
    //borderTopLeftRadius:16,
    //borderTopRightRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  answeradd:{
    minHeight:180,
    marginHorizontal:16,
    paddingHorizontal:20,
    paddingVertical:6,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  textArea:{
    paddingTop:4,
    width:210,
    paddingLeft:15
  },
  discoverCard:{
    backgroundColor:'transparent',
    marginHorizontal:0,
    borderRadius:20,
    flexDirection:'row',
    borderWidth:0,
    padding:16,

    elevation:5,
    marginTop:20,
    marginBottom:6
  },
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    paddingHorizontal:16
  },
  header:{
    marginTop:60
  },
  headernew:{
    marginTop:0,
    height:80,
    padding:12,
    backgroundColor: '#222222',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  maincontent:{
    backgroundColor: '#0C0C0C',
    flex:1

  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  },
  anoncenteredView:{
   justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#453AB8",
    //opacity:0.95,
    borderWidth:2,
    borderColor:'white',
    height:300,
    marginTop: 200,
   // width:300,
    borderRadius:12,
  //  height:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
  }},
  centeredView: {
    flex: 1,
   // justifyContent: "center",
   // alignItems: "center",
    marginTop: 0,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
   // elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "transparent",
    marginLeft:6
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
    marginTop: 200,
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
  anonpostmodalView:{
    margin: 20,
    backgroundColor: "#453AB8",
    borderRadius: 12,
    padding: 5,
    alignItems: "center",
  },
  postmodalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 5,
    alignItems: "center",
  },
})
