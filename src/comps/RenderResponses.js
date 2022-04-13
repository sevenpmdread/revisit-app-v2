import React,{useState,useEffect, useContext} from 'react'
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
import { Context } from '../context/authContext';
import { createContrast,getResponsesbythisuser } from '../context/restapi';
const FlatListItemSeparator = () => <View style={styles.line} />;


const Contrastcomp = ({contrastAnswers,selectedids,answers,setnew}) => {


  const contrastcreate = async() => {
    const contrastdata =  await createContrast(contrastAnswers[1].id,contrastAnswers[0].id)
 //   console.log("CONTRAST RESPONSE I RENDERRESPONSES",contrastdata)
    setnew(contrastdata.answerUpdate)
  }
  const {state} = useContext(Context)

  const diffTime = Math.abs(contrastAnswers[0].data_a - contrastAnswers[1].data_a);
  console.log(diffTime)
  const prevdate = contrastAnswers[0].data_a.toDateString().substr(4,12)
  const newdate = contrastAnswers[1].data_a.toDateString().substr(4,12)
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return (<View >
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:12,backgroundColor:'transparent',borderWidth:1,borderColor:'green',minHeight:285,borderRadius:16,padding:0,display:'flex',flexGrow:2,flexDirection:'column',   justifyContent:"space-between",
elevation:0}}>
    <View style={{flexDirection:'column',   justifyContent:"space-between",minHeight:205}}>
    <Text style={styles.contrasttexttop}>{contrastAnswers[0].a}</Text>
    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between', backgroundColor : "transparent",borderColor:'green',borderWidth:2,borderLeftWidth:0,borderRightWidth:0,textAlign:'center',opacity:0.8}}>
    <View style={{flexDirection:'row'}}>
    <Feather name="chevron-up" size={20} color="grey" style={{    paddingLeft:8,paddingTop:8}} />
    <Text style={{
    color : "grey",
  //  alignSelf : "center",
    paddingVertical :8,
    paddingLeft:2,
    fontFamily:'InterRegular',
    fontSize:12,
    marginVertical : 0
    }}>{prevdate}</Text>
    </View>
    <Text style={{
    color : "white",
    alignSelf : "center",
    paddingVertical :8,
    marginVertical : 0
    }}>{diffDays} days apart</Text>
    <View style={{flexDirection:'row'}}>
    <Text style={{
    color : "grey",
    alignSelf : "center",
    paddingVertical :8,
    marginVertical : 0,
    fontFamily:'InterRegular',
    fontSize:12,
    paddingRight:4
    }}>{newdate}</Text>
        <Feather name="chevron-down" size={20} color="grey" style={{    paddingRight:8,paddingTop:8}} />
    </View>
    </TouchableOpacity>
        <Text style={styles.contrasttextbottom}>{contrastAnswers[1].a}</Text>
    <View style={styles.questionrow}>
        <Text style={styles.cardfootercontrast}>by {state.username}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>contrastcreate()} style={{backgroundColor:'transparent',borderColor:'white',borderWidth:1,borderRadius:12,padding:6,paddingHorizontal:12,marginHorizontal:12,marginTop:6}}>
    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:14}}>Publish Contrast</Text>
    </TouchableOpacity>
    </View>
    </Card>
</View>)
}
const RenderResponses = ({navigation}) => {
  const [createContrast,setcreateContrast] = useState(false)


  // useEffect(() => {
  //   // //  console.log("I AM CALLED ID USEEFFECT")

  //   //   // declare the data fetching function
  //   //   const fetchData = async () => {

  //   //     console.log("FOUND FOUND")
  //   //     const data =  await getCount(post._id)
  //   //     const pindata = await checkpinstatus(post._id)
  //   //     if(pindata)
  //   //     {
  //   //       console.log("SDJFSJDFBSHFBSDJHSBDFJHSBDFSDBJF")
  //   //       setpin(true)
  //   //     }
  //   //  // console.log("STATE META",data)
  //   //   setsharecount(data.postdetails ? data.postdetails.sharecount: 0)
  //   //   setpinscount(data.postdetails ? data.postdetails.pincount: 0)
  //   //   setLoading(false)


  //   //   }

  //   //   // call the function
  //   //   fetchData()


  //   }, [createContrast])
  const [refresh,setrefresh] = useState(false)
  const [showcontrast,setcontrast] = useState(false)
  const [contrastActive,setcontrastActive] = useState(false)
  const [contrastAnswers,setContrastanswers] = useState([]);
  const [selectedIds, setSelectedId] = useState([]);
  console.log("in here")
  const  question = navigation.getParam('question')
 const answers = navigation.getParam('answers')
 const [allanswers,setallanswers] = useState(answers)
 useEffect(()=>{},[showcontrast])
 const renderItem = ({ item,index }) => {
  const backgroundColor = selectedIds.indexOf(item._id)!=-1 ? "grey" : "transparent";
  const color = selectedIds.indexOf(item._id)!=-1 ? '#121212' : 'white';
  console.log("itemitemitemiemm",item)
  var length = answers.length

  return (
    <RenderCategoryAnswers
     // item={item}
     onPress={() =>{

      var selected = [...selectedIds]
      if(selectedIds.indexOf(item._id)===-1)
      {
        let obj = {}
        obj.id = item._id
        obj.a = item.answer_text
        var date = new Date(item.createdAt)
        obj.data_a = date
        contrastAnswers.push(obj)
       // setContrastanswers([...contrastAnswers,obj])

        console.log("NO MATCH FOUND",contrastAnswers)
        selected.push(item._id)
        setSelectedId(selected)
      }
      else
     {
      console.log("NO lese FOUND",selectedIds)
       selected = selected.filter(_id => _id !== item._id)
       setSelectedId(selected)
      // setrefresh(!refresh)
      }
      if(selected.length ==2)

      {
        setSelectedId(selected)
        setcontrast(true)
        console.log("ARRys",selectedIds,selected)
      }
      }
    }
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
      contrast ={contrastActive}
      post={item}
      question={question}
      width={{showfull:true}}
    />
  );
};


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
            <Card containerStyle={{marginVertical:0,marginBottom:2,marginHorizontal:12,elevation:0,backgroundColor:'transparent',borderWidth:0,borderColor:'rgba(255, 255, 255, 0.6)',borderRadius:16,paddingBottom:12,display:'flex',flexGrow:0,flexDirection:'column',paddingHorizontal:24}}>
            <View>
            <Text style={styles.questionText}>{question}</Text>
            </View>

            <View style={styles.questionrow}>
            <TouchableOpacity
            onPress={()=>{
              setcontrastActive(!contrastActive)
              setrefresh(!refresh)
              //setrefresh(!refresh)}
            }}
            style={styles.contrast}

      >
        <Text style={{color:'white'}}>
        {contrastActive &&  selectedIds.length <2 ?  `Pick ${2 - selectedIds.length} post to contast`  : 'Create Contrast'}
        </Text>
      </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity >
                <Feather name="more-vertical" size={26} color="white" style={{marginTop:0,textAlign:'left',opacity:0.7}}/>
                </TouchableOpacity >
                </View>
            </View>
            </Card>
           {showcontrast ?<Contrastcomp
           contrastAnswers ={contrastAnswers}
           setnew={
             (newanswer) =>
             {
               setcontrast(false)
               setallanswers([...allanswers,newanswer])
               setrefresh(!refresh)
              }
             }/> :<></> }
            <FlatList
     contentContainerStyle={{marginLeft:8}}

    //  horizontal={true}
      style={styles.feed}
       data = {allanswers}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"

          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={renderItem}
      keyExtractor={item => !item.contrast ? item._id + '_C' : item._id}
      extraData={refresh}

      showsVerticalScrollIndicator={true}
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

  cardfootercontrast:{
    fontSize:12,
    paddingHorizontal:20,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  cardfooter: {
    fontSize:12,
    paddingTop:3,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  contrasttexttop:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:13,
    opacity:0.8,
    marginBottom:8,
    paddingTop:20,
    paddingHorizontal:20,
    paddingBottom:4,
    color:'white',
  },
  contrasttextbottom:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:12,
    opacity:0.8,
    marginBottom:8,
    paddingTop:6,
    paddingHorizontal:20,
   // paddingBottom:24,
    color:'white',
  },
  line:{
    backgroundColor:'white',
    height:1
  },
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
    width:200,
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
