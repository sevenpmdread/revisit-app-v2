import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable,Card } from 'react-native'
import React,{useState} from 'react'
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'
import { postAnswer } from '../context/restapi';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import Modal from "react-native-modal";
import LoadingScreennew from './Loadingnew';
import { AntDesign } from '@expo/vector-icons';

const CreateScreen = ({route,navigation}) => {



  const [modalVisible, setModalVisible] = useState(false);
  const [isAnonymous, setSelection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading,setLoading] = useState(false)
  const  post = route.params?.post
  //console.log(post)
  post.question_text = post.text  ? post.text : post.question_text
  post._id = post.id ? post.id : post._id
  //console.log("RANDOM POST",post._id)

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
    style={{ backgroundColor: '#0C0C0C'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
    <View style={styles.container} >
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.pop()}>
      <EvilIcons name="close" size={36} color="white" style={{padding:8,paddingTop:12}}/>
      </TouchableOpacity>
      <Modal
        animationType="slide"
     //   presentationStyle ="formSheet"
        transparent={true}
        containerStyle={{backgroundColor:"black",}}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={{alignContent:"center",alignSelf:"center"}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {
              isLoading ?
              <>
              <LoadingScreennew/>
            <Text style={styles.modalText}>Publishing your answer</Text>
            </>
            :
            <>
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text style={styles.modalText}>Success! Taking you to explore more questions</Text>
            </>

            }


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
            </Pressable>
          </View>
        </View>
        </View>

      </Modal>
      <TouchableOpacity  >
      <Button
      title='Publish'

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
        setModalVisible(true)
        setLoading(true)
       // console.log("RANDOM POST id",post,post._id)
       await postAnswer(post._id,value,isAnonymous)
        //console.log("RANDOM POST",postnew)
        setLoading(false)
      //  setModalVisible(false)
      setTimeout(()=>{ navigation.navigate("Explore",{refresh:true}) }, 1000)

        }}

      />
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row', paddingHorizontal:26,paddingRight:30,paddingTop:18,justifyContent:"space-between"}}>
        <Text style={styles.questionText}>{post.question_text}</Text>
      </View>
        <CheckBox
        leftTextStyle={{color:'white',fontFamily:'InterRegular'}}
        checkBoxColor="white"
    style={{flex: 1, padding: 10,backgroundColor:isAnonymous ? "#5D51D1" : "transparent",marginHorizontal:20,marginVertical:6,borderRadius:0,opacity:isAnonymous ? 1: 0.6}}
    onClick={()=>{
      setSelection(!isAnonymous)
    }}
    isChecked={isAnonymous}
    leftText={"Post Anonmously"}
/>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
          {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {/* <Button
       title='Post Anonmously'
       titleStyle={{fontFamily:'Intermedium',fontSize:12,color:'white'}}
       buttonStyle={{backgroundColor:'#161611',borderRadius:20,paddingHorizontal:0,marginHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8,borderColor:'#F5F5F5',borderWidth:1}}
       containerStyle={{width:220,backgroundColor:'#161611',fontFamily:'InterRegular',fontSize:8,marginHorizontal:12,marginBottom:12}}
       /> */}

       <View style={{flexDirection:'row'}}>
      <View style={styles.input}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={400}
        //scrollEnabled={true}
        style={styles.secondinput}
        onChangeText={(text)=>{
        setCharCount(text.length)
        return onChangeText(text)
      }}
        value={value}
        multiline={true}
        placeholder="Start typing here"
        placeholderTextColor={'white'}
        //tvParallaxShiftDistanceX={200}
      />
            {/* <Feather style={{opacity:0.6,margin:20}}name="mic" size={18} color="white" /> */}
        <Text style={styles.count} onChangeText={(text) => {
        console.log(text)
        return text === 0 ? 'Char limit reached' : text
      }}>{400 -charCount}</Text>
            {/* <TouchableOpacity style={{backgroundColor:'#5D51D1',padding:12,width:60,borderRadius:40,alignSelf:'center',alignContent:'center',marginTop:200}}>
      <Feather style={{alignSelf:'center'}}name="mic" size={32} color="white" />
      </TouchableOpacity> */}
      </View>
      </View>


    </View>
    </KeyboardAwareScrollView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  count: {
    fontFamily:'InterRegular',
    fontSize:12,
    opacity:0.4,
    color:'white',
    paddingVertical:6,
    marginTop:12
   // paddingVertical:'',
  },
  secondinput:{
    fontFamily:'InterRegular',
    fontSize:20,
    opacity:0.8,
    color:'white',
   // padding:12

  },
  input:{
    minHeight:100,
   flex:1,
    paddingHorizontal:6,
   // paddingVertical:12,
    marginHorizontal:20,
    marginRight:0,
    borderColor:'#D8D8D8',
    marginTop:10,
    opacity:1,
   //borderWidth:2,
    elevation:0,
   // backgroundColor:'grey',
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
   // paddingHorizontal:16
  },
  header:{
    marginTop:0,
    height:80,
    padding:12,
    backgroundColor: '#222222',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    marginTop:16,
    textAlign: "center",
    color:'white'

  },
  centeredView: {
   // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0C0C0C",
    opacity:1,
    marginTop: 22,
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
  modalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },

})
