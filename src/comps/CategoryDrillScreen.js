import React,{useState,useEffect,useCallback} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList,RefreshControl } from 'react-native';
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
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const CategoryDrillScreen = ({route,navigation}) => {
 // console.log("fjhsdfjsd = ", navigation.getParam('post'))
 //console.log("route params",route.params)
 const  post = route.params?.post
 const answerstemp = route.params?.answers
 console.log("POST AND ANSWERS FROM home page  CLICK",post)
 //console.log("sdhfvsdfhvsdfsdfsd sdfjhfsd post answer",post)
 const [answers,setanswers] = useState(answerstemp || [])
 const [isLoading,setLoading] = useState(true)
 const [fetch,setFetch] = useState(0)
 let arr = []

 useEffect(()=>{
   const fetchData = async (fetch) => {
   const data  =   await getAnswersforid(post._id ? post._id : post.item.id,10 + fetch*10,0)
   console.log("answersf or id",data)

  arr = [...answers,...data]
   setanswers(arr)
   setLoading(false)
  console.log("answers",answers)
 }

fetchData(fetch)

}, [fetch])
  //const post = item

  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
//  console.log("post",post)

   return (

    <ScrollView  style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
            <Card containerStyle={{marginVertical:8,marginTop:1,marginBottom:2,marginHorizontal:12,backgroundColor:'#171717',elevation:5,borderRadius:12,borderWidth:0,borderColor:'rgba(255, 255, 255, 0.4)',paddingVertical:18,paddingLeft:22,flexDirection:'column'}}>
            <View>
            <Text style={styles.questionText}>{post.question_text? post.question_text : post.item.text}</Text>
            </View>

            <TouchableOpacity
            style={styles.button}
            onPress={()=>

{
  navigation.navigate('CreateAnswer',{post : {_id:post.item ? post.item.id : post._id,question_text:post.item ? post.item.text : post.question_text}})
}            }


      >
        <Text> Answer</Text>
      </TouchableOpacity>

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
       {
         //console.log("iteitietietetnet",item)
      return isLoading ? <Text style={{fontFamily:'Intermedium',fontSize:12,color:'white'}}>Loading...</Text> :
       <RenderCategoryAnswers post={item} question={post.question_text}  width={{showfull:true}}/>}
      }
      keyExtractor={item => item._id}
      extraData={answers}
      showsVerticalScrollIndicator={false}
      />
    <View>
      <TouchableOpacity onPress={()=>setFetch(fetch+1)}>
      <Text style={{color:'white',fontFamily:'Intermedium',alignSelf:'center',padding:12,paddingBottom:24}}>Load more</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  )
};
CategoryDrillScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default CategoryDrillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
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
  button:{
    backgroundColor:'white',
    marginTop:0,
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
    display:'flex',
    flex:2,
  // alignContent:'flex-end',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:0,
   // paddingLeft:16,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:1,
    flexDirection:'row',
  },
});
