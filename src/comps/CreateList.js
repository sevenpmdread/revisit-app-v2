import React,{isValidElement, useRef,useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
  ImageBackground,Button,
  TouchableHighlight
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, withTheme } from 'react-native-elements';
import NavLink from '../comps/NavLink'
import CardSpacer from './CardSpacer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fonts } from 'react-native-elements/dist/config';
import { categoryquestions } from '../dummydata';
import RenderCategoryQuestions from './RenderCategoryQuestions';
import RenderCreateQuestions from './RenderCreateQuestions';
//import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const CreateList = ({type,desc,imagesrc,navigation}) => {
  const [visible,setVisible] = useState(false)
  const expanded = true;
  const scrollX = useRef(new Animated.Value(expanded ? 1 : 0)).current
  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
  //console.log(fontsLoaded)
  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
//   console.log(imagesrc,typeof imagesrc)
//   console.log(require('../../assets/categorygrowth.png'))
//  console.log(image)
 var image = type === 'Existential'? require('../../assets/categoryexistential.png') :  type === 'Confrontational' ?  require('../../assets/categoryconfrontational.png') : type === 'Growth' ?   require('../../assets/categorygrowth.png') : require('../../assets/categorypersonal.png')
 // console.log( type.toLowerCase())
  const name = type.toLowerCase()

  return (
    <View>
      <TouchableHighlight onPress={()=>{
      //  console.log(visible)
        return setVisible(!visible)}}>
      <ImageBackground  imageStyle={{borderRadius:26,width:'auto',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)',opacity:0.8,marginHorizontal:24}} resizeMode= 'cover' source={image} style={{marginVertical:0,marginBottom:16,marginHorizontal:0, paddingHorizontal:40,paddingBottom:16,paddingTop:12}}>
            <Text style={styles.qod}>{type}</Text>
            <Text style={styles.questionText}>{type} Questions</Text>
            <Text style={styles.questionsub}>{desc}</Text>
            <View style={styles.questionrow}>
                <TouchableOpacity style={styles.row}>
                <Ionicons name="help" size={20} color="white" />
                <Text style={styles.cardfooter}>20 questions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                <MaterialIcons name="question-answer" size={20} color="white" />
                <Text style={styles.cardfooter}>Anwered 24 times</Text>
             </TouchableOpacity >
                <TouchableOpacity  style={styles.row}>
                <MaterialCommunityIcons name="pin-outline" size={20} color="white" />
                <Text style={styles.cardfooter}>Pinned 24 times</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>
    </TouchableHighlight>


     <FlatList

     contentContainerStyle={{marginLeft:8,display:visible ? "flex": "none"}}
    // horizontal={true}
      style={styles.feed}
       data = {categoryquestions}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item)=>
       {//console.log(item)
       return visible ? <RenderCreateQuestions nav = {navigation} post={item}/> : <></>}
      }
      keyExtractor={item => item.question_id}
      showsVerticalScrollIndicator={false}
      />
    <CardSpacer/>
    </View>
  );
};

export default CreateList;

const styles = StyleSheet.create({
  feed: {
    marginHorizontal:0
   },
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingRight:8,
    opacity:0.8

  },
  cardfooter: {
    fontSize:8,
    paddingTop:3,
    paddingRight:26,
    paddingLeft:4,
  //  opacity:0.8,
    color:'white',
 //   fontFamily:'InterRegular'
  },
  button:{
    backgroundColor:'white',
    marginTop:16,
    //opacity:0.6,
    height:32,
    width:100,
    padding:4,
    color:"black",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    marginBottom:32

  },
  questionsub:{
    color:'white',
    fontSize:10,
    opacity:0.6,
   // fontFamily:'InterRegular'
  },
  qod:{
    color:'white',
    fontStyle:'italic',
    fontSize:14,
    opacity:0.6,
    marginBottom:32,
    //fontFamily:'InterRegular'
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal:16
  },
  header:{
    paddingTop:56,
    paddingBottom:32,
    alignItems:"flex-start",
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingLeft:16,
   // paddingRight:16,
  },
  headerTitle:{
    color:'white',
    fontSize:24,
    //fontFamily:'Intermedium',

  },
  card:{
    borderWidth:4,
    borderColor:'black',
    backgroundColor:'black'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 24,
    //fontFamily:'Intermedium',
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    opacity:1

  },
  questionrow: {
    paddingTop:20,
    //paddingHorizontal:8,
    flexDirection:'row',
    paddingBottom:12

  },
});
