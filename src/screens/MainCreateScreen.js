import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList } from 'react-native'
import React,{useState} from 'react'
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { quesdescs } from '../dummydata';
import CreateList from '../comps/CreateList';
import { categoryquestions } from '../dummydata';
import RenderCreateQuestions from '../comps/RenderCreateQuestions';
//import CategoryQuestion from '../comps/CategoryQuestions';
const MainCreateScreen = ({navigation}) => {
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
      title='Browse all categories'
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
        backgroundColor:'#222222',
        borderRadius:12,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:16,
        marginHorizontal:24,
        fontSize:12,
        fontFamily:'InterRegular'

      }}
      onPress={()=>{
        console.log(visible)
        return setVisible(!visible)}}
      />
<FlatList
contentContainerStyle={{marginLeft:8,display:visible ? "flex": "none"}}
 style={styles.feed}
data = {categoryquestions}
 snapToAlignment ="start"
 renderItem={(item)=>
{
  return visible ? <RenderCreateQuestions nav = {navigation} post={item}/> : <></>}
 }
 keyExtractor={item => item.question_id}
 showsVerticalScrollIndicator={false}
 />
 <FlatList
    data={quesdescs}
    renderItem={(item)=>
      {//console.log(item)
    console.log(item.item.type)
     return <CreateList type={item.item.type} desc={item.item.desc} imagesrc={item.item.src} navigation={navigation}/>}
     }
    keyExtractor={item => item.type}
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
    backgroundColor: '#101010',
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
