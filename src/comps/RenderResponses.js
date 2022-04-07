import React,{useState,useEffect} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { categoryanswers } from '../dummydata';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import RenderCategoryAnswers from './RenderCategoryAnswers';
import RenderCategoryDrillAnswers from './RenderCategoryDrillAnswer';
import { getAnswersforid } from '../context/restapi';
const RenderResponses = ({navigation}) => {
  console.log("in here")
  const  question = navigation.getParam('question')
 const answers = navigation.getParam('answers')
 // console.log("fjhsdfjsd = ", navigation.getParam('post'))
//  const  post = navigation.getParam('post')
//  const answerstemp = navigation.getParam('answers')
//  console.log("sdhfvsdfhvsdfsdfsd sdfjhfsd post answer", post,answerstemp)
//  const [answers,setanswers] = useState(answerstemp)
//  const [isLoading,setLoading] = useState(true)
//  const [fetch,setFetch] = useState(0)
//  useEffect(()=>{
//    const fetchData = async (fetch) => {
//    const data  =   await getAnswersforid(post.item.id,10 + fetch*10,0)
//    console.log(data)
//    setanswers(data)
//    setLoading(false)
//   console.log("answers",answers)
//  }
//  fetchData(fetch)

// }, [fetch])


   return (

    <ScrollView  style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
            <Card containerStyle={{marginVertical:0,marginBottom:2,marginHorizontal:12,elevation:0,backgroundColor:'transparent',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)',borderRadius:16,paddingBottom:12,display:'flex',flexGrow:0,flexDirection:'column',paddingHorizontal:24}}>
            <View>
            <Text style={styles.questionText}>{question}</Text>
            </View>

            <View style={styles.questionrow}>
            <TouchableOpacity
            style={styles.contrast}

      >
        <Text style={{color:'white'}}> Contrast</Text>
      </TouchableOpacity>
                <View style={{flexDirection:'row'}}>

                <TouchableOpacity   style={styles.button}>
                <Text>Answer</Text>
                </TouchableOpacity >
                <TouchableOpacity >
                <Feather name="more-vertical" size={26} color="white" style={{marginTop:0,textAlign:'left',opacity:0.7}}/>
                </TouchableOpacity >
                </View>
            </View>
            </Card>
            <FlatList
     contentContainerStyle={{marginLeft:8}}
    //  horizontal={true}
      style={styles.feed}
       data = {answers}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"

          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item)=>
       {console.log(item)
      return <RenderCategoryAnswers post={item} question={question}  width={{showfull:true}}/>}
      }
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      />

    </View>
    </ScrollView>
  )
};
RenderResponses.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

export default RenderResponses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  //  / paddingHorizontal:16
  },
  header:{
    paddingTop:0,
    paddingBottom:16,
    alignItems:"flex-start",
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingLeft:16,
   // paddingRight:16,
  },
  contrast:{
    backgroundColor:'green',
    marginTop:0,
    //opacity:0.6,
    height:32,
    width:100,
    padding:4,
    color:"white",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    marginBottom:0
  },
  button:{
    backgroundColor:'white',
    marginTop:0,
    //opacity:0.6,
    height:32,
    width:100,
    padding:4,
    marginRight:12,
    color:"black",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    marginBottom:0

  },
  cardfooter: {
    fontSize:10,
    paddingTop:3,
   // paddingRight:26,
    paddingLeft:36,
   opacity:0.6,
    color:'white',
  // fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
    fontFamily:'Intermedium',
    fontStyle: 'normal',
   // overflow:'ellipsis',
    fontSize: 22,
    opacity:0.9,
   // paddingBottom:24,
    color:'white',

  },
  readmore:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    textDecorationLine:"underline",
     fontSize: 24,
   //  paddingTop:110,
     paddingHorizontal:16,
    // textAlignVertical:'center',
     textAlign:'center',
     opacity:0.8,
    // paddingBottom:24,
     color:'white',

   },
  questionrow: {
    justifyContent:'space-between',

    flexDirection:'row',
    marginTop:12,
   // paddingLeft:16,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:1,
    flexDirection:'row',
  },
});
