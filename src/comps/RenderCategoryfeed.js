import React, { useContext,useEffect,useState,useCallback } from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList,TouchableHighlight } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import RenderCategoryAnswers from './RenderCategoryAnswers';
import { Context as ReponseContext } from '../context/authContext';
import LoadingScreen from '../screens/loadingScreen';
import LoadingScreenew from '../screens/Loadingnew'
import { getAnswersforid } from '../context/restapi';
const RenderCategoryfeed = ({post,navigation}) => {
  //const {state,getAnswersforid} = useContext(ReponseContext)
  const [answers,setanswers] = useState([])
  const [isLoading,setLoading] = useState(true)
  useEffect(()=>{
    const fetchData = async () => {
    const data  =   await getAnswersforid(post.item.id,10,0)
    //console.log(data)
    setanswers(data)
    setLoading(false)
   //console.log("answers",answers)
  }
  fetchData()

}, [])
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular
   });
 // console.log(navigation)
   return   (
    <View >
            <Card containerStyle={{marginVertical:8,marginTop:1,marginBottom:2,marginHorizontal:0,backgroundColor:'#171717',elevation:5,borderRadius:12,borderWidth:0,borderColor:'rgba(255, 255, 255, 0.4)',paddingVertical:18,paddingLeft:22,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
            <View>
            <TouchableOpacity onPress={()=>
            {
             try {
                navigation.navigate("CategoryDrill",{
              post:post,
              answers
            })
             }
             catch(err)
             {
             //  console.log(err)
             }
            }
            }>
            <Text style={styles.questionText}>{post.item.text}</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.questionrow}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('CreateAnswer',{post : {_id:post.item.id,question_text:post.item.text}})}
            style={styles.button}

      >
        <Text> {answers.length > 0  ? `Answer` :  `Be the first to answer`}</Text>
      </TouchableOpacity>
            </View>
            </Card>
{ answers.length ?
                <FlatList
              contentContainerStyle={{marginLeft:8}}
               horizontal={true}
               style={styles.feed}
                data = {answers}
               snapToAlignment ="start"
                   decelerationRate={0}
               renderItem={(item)=>
                {
               return <RenderCategoryAnswers post={item.item} question={post.item.text} width={{showfull:false}} />}
               }
               keyExtractor={item => item._id}
               />
               :
               isLoading?
    <LoadingScreenew/>
    :<View style={{paddingVertical:10}}/>

              }


             </View>)

};

export default RenderCategoryfeed;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    marginTop:0,
    //opacity:0.6,
    height:32,
   // width:100,
    padding:4,
    color:"black",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    paddingHorizontal:8,
    alignContent:'center',
    alignItems:'center',
   // marginBottom:32

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
   alignContent:'flex-end',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:0,
    paddingLeft:0,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:1,
    flexDirection:'row',
  },
});
