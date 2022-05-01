import React,{useState,useContext,useEffect} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList,ToastAndroid } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import { ColorPicker } from "react-native-btr";
import ShareableImageCard from './ShareableImageCard';
import { Context as AnswerContext } from '../context/authContext';
import { BottomSheet, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { unpinPost,getCount,pinpost,checkpinstatus,sharepost,answerforid} from '../context/restapi';
import TimeAgo from 'react-native-timeago';

import Toast from 'react-native-toast-message';
import ShareCardContrast from './ShareCardContrast';
const RenderCategoryAnswers = ({contrast,onPress,backgroundColor,textColor,width,post,question,nav,meta}) => {
 // console.log("postpostpost",post)
  let newwidth = width.showfull ? 'auto' : 320
  // TimeAgo.addDefaultLocale(en)

  // const timeAgo = new TimeAgo(en)
  // let date = timeAgo.format(new Date(post.createdAt))
 // console.log("datadtatdtadtatdatadtad",date)
  const [sharecount,setsharecount] = useState()
  const [pincount,setpinscount] = useState()
  const [contrastAnswer,setcontrastAnswer] = useState('')
  const [pinned,setpin] = useState(false)
  const [errormessage,seterrormessage]  = useState('')
  const [diffDays,setdiffDays] = useState(0)
  const [isLoading,setLoading] = useState(true)
  const [prevdate,setprevdate] = useState('')
  const [datenew,setdatenew] = useState('')
  //
  let date =  new Date(!post.item ? post.createdAt: post.item.createdAt)
  var datestring = date.toDateString().substring(4)
  let newdate = ''
  let diffTime = 0
  if(post.contrast || (post.item && post.item.contrast))
  {
    const getAnswer = async() => {
      const resp  = await answerforid(!post.item ? post.contrast :post.item.contrast)
      newdate = new Date(resp.contrastAnswer.createdAt)
      diffTime = Math.abs(date - newdate);
      setdiffDays(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
      let prevstring = date.toDateString().substring(4)
      setprevdate(prevstring)
      setdatenew(newdate.toDateString().substring(4))
      //console.log(prevdate,newdate,diffDays)
      setcontrastAnswer(resp.contrastAnswer.answer_text)
     // console.log("CONTRAST NEW NEW NEW",resp,contrastAnswer)

    }
    getAnswer()

  }
  useEffect(() => {
  //  console.log("I AM CALLED ID USEEFFECT")

    // declare the data fetching function
    const fetchData = async () => {

    //  console.log("FOUND FOUND")
      const data =  await getCount(!post.item ? post._id : post.item._id)
      const pindata = await checkpinstatus(!post.item ? post._id : post.item._id)
      if(pindata)
      {
      ///  console.log("SDJFSJDFBSHFBSDJHSBDFJHSBDFSDBJF")
        setpin(true)
      }
   // console.log("STATE META",data)
    setsharecount(data.postdetails ? data.postdetails.sharecount: 0)
    setpinscount(data.postdetails ? data.postdetails.pincount: 0)
    setLoading(false)


    }

    // call the function
    fetchData()


  }, [pincount,sharecount])
  const [selectedColor, setSelectedColor] = useState("#AC2929");
  function setColor(color) {
    setSelectedColor(color);
  }
  const share = async() => {
    console.log("in share")
    const data = sharepost(post._id)
    setsharecount(sharecount+1)
  }
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }
  const pinPost = async() =>  {
    //console.log("in here")
    const data =  await pinpost(post._id)
    //console.log("I AM CALLED PINPOST",data)
    if(data === "error")
    {
      seterrormessage('Already pinned')
    }
    else
   {
     setpin(true)
     setpinscount(pincount+1)
    showToast('Pinned to your profile')}
  }
  const unpin = async() =>  {
    //console.log("in unpin here")
    const data =  await unpinPost(post._id)
    //console.log("I AM CALLED unPINPOST",data)
    if(data === "error")
    {
      seterrormessage('error')
    }
    else
    {setpin(false)
    setpinscount(pincount-1)
    showToast('Unpinned from profile')}

  }
  const list = [
    { title: 'sfjksdfh', titleStyle:{color:'black'}, containerStyle: {backgroundColor:'black',borderTopRadius:20,marginHorizontal:0,display:"flex",padding:0,marginVertical:0,alignItems:"center"} },
    {
      title: 'Cancel',
      titleStyle:{color:'red'}, containerStyle: {backgroundColor:'black',marginHorizontal:1,height:60,borderColor:"red",borderTopWidth:2},
      onPress: () => setIsVisible(false),
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular
   });
 // console.log("Contrast answersss ", post.contrast)
 var username = !post.item ?  post.isAnonymous ? 'anonynous' : post.username : post.item.isAnonymous ? 'Anonymous' : post.item.username
  return  (!post.contrast && !(post.item && post.item.contrast)) ? (
    <View style={{marginBottom:8}}>
    <TouchableOpacity onPress={ contrast ? onPress : null} style={[backgroundColor,styles.contrasttouch]}>
  <Card containerStyle={{marginVertical:0,borderWidth:1,borderColor:'grey',marginHorizontal:0,backgroundColor:'transparent',width:newwidth ,minHeight:220,borderRadius:16,padding:20,flexDirection:'column', justifyContent:"space-between",elevation:0}}>
            <View style={{minHeight:180,flexDirection:'column', justifyContent:"space-between"}}>
            <Text style={[styles.answertext,textColor]}>{!post.item ? post.answer_text : post.item.answer_text}</Text>
            <View style={styles.questionrow}>
                <View style={{flexDirection:'column'}}>
                <Text style={styles.cardfooter}>by {username}</Text>
                <TimeAgo  style = {{color:'white',opacity:0.6,fontFamily:'InterRegular',fontSize:8}} time={post.createdAt} />
                </View>


            <View style={{flexDirection:'row',padding:0,marginTop:12,opacity:0.8}}>
                  <View style={{flexDirection:'row',padding:8,borderRadius:12}}>
                  <TouchableOpacity  onPress= {() => {
                    setIsVisible(true)
                    share()
                    }}>
                  <Entypo name="share" size={24} color="white" style={{paddingRight:12,paddingTop:3}}/>
                  </TouchableOpacity>
                  {
                    isLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
                    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>{sharecount}</Text>

                  }
                  </View>
                  <View style={{flexDirection:'row',padding:8,borderRadius:12}}>
                  { pinned ?
                  <TouchableOpacity onPress={()=>{
                    unpin()
                    }}>
                  <MaterialCommunityIcons name="pin" size={32} color="white" style={{paddingHorizontal:8}}/>
                  </TouchableOpacity>

                  :
                  <TouchableOpacity onPress={()=>pinPost()}>
                  <MaterialCommunityIcons name="pin-outline" size={32} color="white" style={{paddingHorizontal:8}}/>
                  </TouchableOpacity>
                  }
                  {
                    isLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
                    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>{ pincount}</Text>

                  }
                  </View>

            </View>

               </View>
            </View>

            </Card>
            </TouchableOpacity>
            <BottomSheet  modalProps={{}} isVisible={isVisible}>

          {list.map((l, i) => {
         //   console.log("sfjksdfk",l,i)
          return <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content style={{padding:0,margin:0}}>
              <View style={{margin:0,padding:0}}>
             { l.title != "Cancel" ?
             <View>
            <ColorPicker colors = {["#ffffff","#121212","#654A8A","#2B7644","#A46F31","#B43A6D","#443AB4","#179089"]} selectedColor={selectedColor} onSelect={setColor} />
             <ShareableImageCard  textcolor = {selectedColor} color = {selectedColor} text={!post.item ? post.answer_text : post.item.answer_text} question={question} username={username} date={datestring} />

            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>

    </View>
  )
  : width.showfull  ? (
<View >
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:12,backgroundColor:'transparent',borderWidth:1,borderColor:'#02853E',minHeight:285,width:newwidth,borderRadius:12,padding:0,display:'flex',flexGrow:2,flexDirection:'column',   justifyContent:"space-between",
elevation:0}}>
    <View style={{flexDirection:'column',   justifyContent:"space-between",minHeight:205,paddingTop:20}}>
    <Text  style = {{paddingLeft:20,color:'white',opacity:0.4,fontFamily:'InterRegular',fontSize:9}} >{prevdate}</Text>
    <Text style={styles.contrasttexttop}>{!post.item ? post.answer_text : post.item.answer_text}</Text>

    <TouchableOpacity style={{ backgroundColor : "transparent",borderWidth:0,borderLeftWidth:0,borderRightWidth:0,textAlign:'center',opacity:0.8}}>
    <View
  style={{
    borderBottomColor: '#02853E',
    borderBottomWidth: 1.5,
    borderRadius:12,
    width:140,
    position:'absolute',
    marginTop:20
  }}
/>
    <Text style={{
    color : "white",
    alignSelf : "center",
    paddingVertical :8,
    marginVertical : 0,
    fontFamily:'Intermedium',
    fontSize:14
    }}> {diffDays>0 ? `${diffDays}  Days` : `Same day`}</Text>
   <View
  style={{
    borderBottomColor: '#02853E',
    borderBottomWidth: 1.5,
    borderRadius:12,
    width:140,
    position:'absolute',
    marginTop:20,
    marginLeft:238,
    textAlign:'right'
  }}
/>
    </TouchableOpacity>
    <View>
    <Text  style = {{paddingLeft:20,color:'white',opacity:0.4,fontFamily:'InterRegular',fontSize:9,paddingTop:20}} >{datenew}</Text>
    <Text style={styles.contrasttextbottom}>{contrastAnswer}</Text>
    </View>
    <View style={styles.questionrow}>
        <Text style={styles.cardfootercontrast}>by {username}</Text>
        <View style={{flexDirection:'row',padding:0,marginTop:12,opacity:0.8,paddingLeft:12,marginBottom:6}}>
                  <View style={{flexDirection:'row',padding:8,borderRadius:12}}>
                  <TouchableOpacity  onPress= {() => {
                    setIsVisible(true)
                    share()
                    }}>
                  <Entypo name="share" size={24} color="white" style={{paddingRight:6,paddingTop:4}}/>
                  </TouchableOpacity>
                  {
                    isLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
                    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:14,paddingTop:4,opacity:0.7}}>{sharecount}</Text>

                  }
                  </View>
                  <View style={{flexDirection:'row',padding:6,borderRadius:12}}>
                  { pinned ?
                  <TouchableOpacity onPress={()=>{
                    unpin()
                    }}>
                  <MaterialCommunityIcons name="pin" size={24} color="white" style={{paddingRight:4,paddingTop:7}}/>
                  </TouchableOpacity>

                  :
                  <TouchableOpacity onPress={()=>pinPost()}>
                  <MaterialCommunityIcons name="pin-outline" size={24} color="white" style={{paddingRight:4,paddingTop:7}}/>
                  </TouchableOpacity>
                  }
                  {
                    isLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
                    <Text style={{color:'white',fontFamily:'InterRegular',fontSize:14,paddingTop:7,opacity:0.7}}>{ pincount}</Text>

                  }
                  </View>

            </View>
    </View>
    </View>

    </Card>
    <BottomSheet  modalProps={{}} isVisible={isVisible}>

          {list.map((l, i) => {
         //   console.log("sfjksdfk",l,i)
          return <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content style={{padding:0,margin:0}}>
              <View style={{margin:0,padding:0}}>
             { l.title != "Cancel" ?
             <View>
            <ColorPicker colors = {["#ffffff","#121212","#654A8A","#2B7644","#A46F31","#B43A6D","#443AB4","#179089"]} selectedColor={selectedColor} onSelect={setColor} />
             <ShareCardContrast  textcolor = {selectedColor} color = {selectedColor} prevanswer={!post.item ? post.answer_text : post.item.answer_text}  newanswer={contrastAnswer} question={question} username={username} prevdate={prevdate} newdate={datenew} diffdays={diffDays}/>

            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>
</View>
  ) :
  (
    <View >
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:12,backgroundColor:'transparent',borderWidth:1,borderColor:'#02853E',minHeight:205,width:newwidth,borderRadius:12,padding:0,display:'flex',flexGrow:2,flexDirection:'column',
elevation:0}}>
    <View style={{flexDirection:'column',   justifyContent:"space-between",minHeight:180,paddingTop:20}}>
    <View>
    <Text  style = {{paddingLeft:20,color:'white',opacity:0.4,fontFamily:'InterRegular',fontSize:9}} >{prevdate}</Text>
    <Text style={{
        fontFamily:'InterRegular',
        fontStyle: 'normal',
     //   height: 60,
        overflow:'scroll',
        fontSize:13,
        opacity:0.7,
        paddingTop:8,
        paddingHorizontal:20,
        paddingBottom:8,
        color:'white',
    }}>{post.answer_text}</Text>
    </View>

    <TouchableOpacity style={{ backgroundColor : "transparent",borderLeftWidth:0,borderRightWidth:0,textAlign:'center',opacity:0.8}}>
    <View
  style={{
    borderBottomColor: '#02853E',
    borderBottomWidth: 1.5,
    borderRadius:12,
    width:80,
    position:'absolute',
    marginTop:18
  }}
/>
    <Text style={{
    color : "white",
    fontFamily:'Intermedium',
    alignSelf : "center",
    paddingVertical :8,
    marginVertical : 0,
    fontSize:12,
    opacity:1
    }}> SEE FULL CONTRAST</Text>
    <View
  style={{
    borderBottomColor: '#02853E',
    borderBottomWidth: 1.5,
    borderRadius:12,
    width:80,
    position:'absolute',
    marginTop:18,
    marginLeft:238,
    textAlign:'right'
  }}
/>
    </TouchableOpacity>
    <View style={{flexDirection:'column',justifyContent:'space-between',paddingTop:20}}>
    <Text  style = {{paddingLeft:20,color:'white',opacity:0.4,fontFamily:'InterRegular',fontSize:9}} >{datenew}</Text>

        <Text style={{
             fontFamily:'InterRegular',
             fontStyle: 'normal',
             height: 180,
             overflow:'scroll',
             fontSize:13,
             opacity:0.7,
             paddingTop:8,
             paddingHorizontal:20,
             paddingBottom:4,
             color:'white',
        }}>{contrastAnswer}</Text>
   <View style={styles.questionrow}>
        <View style={{flexDirection:'column',paddingBottom:8}}>
        <Text style={styles.cardfootercontrast}>by {username}</Text>
        <TimeAgo  style = {{paddingLeft:20,color:'white',opacity:0.6,fontFamily:'InterRegular',fontSize:8}} time={!post.item ? post.updatedAt :post.item.updatedAt} />
        </View>
    </View>
    </View>
            </View>

    </Card>
    <BottomSheet  modalProps={{}} isVisible={isVisible}>

          {list.map((l, i) => {
         //   console.log("sfjksdfk",l,i)
          return <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content style={{padding:0,margin:0}}>
              <View style={{margin:0,padding:0}}>
             { l.title != "Cancel" ?
             <View>
            <ColorPicker colors = {["#ffffff","#121212","#654A8A","#2B7644","#A46F31","#B43A6D","#443AB4","#179089"]} selectedColor={selectedColor} onSelect={setColor} />
             <ShareCardContrast  textcolor = {selectedColor} color = {selectedColor} prevanswer={post.answer_text}  newanswer={contrastAnswer} question={question} username={username} prevdate={prevdate} newdate={datenew} diffdays={diffDays}/>

            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>
</View>
  )
};

RenderCategoryAnswers.navigationOptions = () => {
  return {
    headerShown: true,
  };
};
export default RenderCategoryAnswers;

const styles = StyleSheet.create({
  contrasttouch:{
    borderRadius:16,
    borderWidth:1,
    borderColor:'#171717',
    //padding:20,
    marginHorizontal:8,
    marginTop:16
  },
  contrasttexttop:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height: 120,
    overflow:'scroll',
    fontSize:15,
    opacity:0.8,
    paddingVertical:8,
    paddingBottom:12,
    paddingHorizontal:20,
   // paddingBottom:4,
    color:'white',


  },
  contrasttextbottom:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
  //  height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:15,
    opacity:0.8,
    marginBottom:2,
    paddingTop:6,
    paddingHorizontal:20,
   // paddingBottom:24,
    color:'white',
  },

  cardfootercontrast:{
    fontSize:12,
    paddingHorizontal:20,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
   paddingTop:28,
    color:'white',
  fontFamily:'InterRegular'
  },
  cardfooter: {
    fontSize:12,
    paddingTop:20,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  answertext:{
    fontFamily:'InterRegular',
    // overflow:'hidden',
      fontStyle: 'normal',
      //height:200,
      overflow:'scroll',
      fontSize: 15,
      opacity:0.8,
     // paddingBottom:24,
      color:'white',
  },
  questionText:{
   fontFamily:'InterRegular',
  // overflow:'hidden',
    fontStyle: 'normal',
    height:200,
    overflow:'scroll',
    fontSize: 15,
    opacity:0.8,
   // paddingBottom:24,
    color:'white',

  },
  readmore:{
  //  fontFamily:'InterRegular',
    fontStyle: 'normal',
     fontSize: 12,
     paddingTop:110,
     paddingHorizontal:16,
    // textAlignVertical:'center',
     textAlign:'center',
     opacity:0.6,
    // paddingBottom:24,
     color:'white',

   },
  questionrow: {
  //  display:'flex',
   // flex:2,
   justifyContent:"space-between",
   //SalignContent:'',
  // textAlign:'justify',
   //alignItems:'baseline',
   // textAlignVertical:'bottom',
    flexDirection:'row',
    marginTop:2,
    //paddingTop:30,
    paddingBottom:8,
    paddingRight:20,
  // marginBottom:8,
   // flexDirection:'column',
  },
});
