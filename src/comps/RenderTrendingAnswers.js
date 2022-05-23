import {TouchableOpacity, StyleSheet, Text, View,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import TimeAgo from 'react-native-timeago';
import { BottomSheet, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShareableImageCard from './ShareableImageCard';
import { Entypo } from '@expo/vector-icons';
import { getCount,checkpinstatus,sharepost,unpinPost,pinpost } from '../context/restapi';
import { ColorPicker } from "react-native-btr";
const RenderItem = ({item,index,onpress}) => {
  const [sharecount,setsharecount] = useState()
  const [pincount,setpinscount] = useState()
  const [pinned,setpin] = useState(false)
  const [ispinLoading,setpinLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#AC2929");
  const [isVisible, setIsVisible] = useState(false);

  function setColor(color) {
    setSelectedColor(color);
  }
  const share = async() => {
    console.log("in share")
    const data = sharepost(item.answer._id)
    setsharecount(sharecount+1)
  }
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }
  const pinPost = async() =>  {
    //console.log("in here")
    const data =  await pinpost(item.answer._id)
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
    const data =  await unpinPost(item.answer._id)
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
  useEffect(() => {
    //  console.log("I AM CALLED ID USEEFFECT")

      // declare the data fetching function
      const fetchData = async () => {

      //  console.log("FOUND FOUND")
        const data =  await getCount(item.answer._id)
        const pindata = await checkpinstatus(item.answer._id)
        if(pindata)
        {
        ///  console.log("SDJFSJDFBSHFBSDJHSBDFJHSBDFSDBJF")
          setpin(true)
        }
     // console.log("STATE META",data)
      setsharecount(data.postdetails ? data.postdetails.sharecount: 0)
      setpinscount(data.postdetails ? data.postdetails.pincount: 0)
      setpinLoading(false)


      }

      // call the function
      fetchData()


    }, [pincount,sharecount])
 //  console.log("iteetiemtmetme",item)
  return (
    <View style={{
        backgroundColor:'#0F0F0F',
        borderRadius: 12,
        minHeight: 250,
        padding: 24,
        marginLeft: 12,
        marginRight: 12,
        flexDirection:'column',
        justifyContent:'space-between'
         }}>
      <Text style={{fontSize: 14,color:'white',fontFamily:'InterRegular',opacity:0.6,fontStyle:'italic'}} onPress={()=>onpress(item.question[0])}>{item.question[0].question_text}</Text>
      <Text style={{fontSize: 18,color:'white',fontFamily:'Intermedium',paddingVertical:20}}>{item.answer.answer_text}</Text>
      <View style={styles.questionrow}>
              <View style={{flexDirection:'column'}}>
              <Text style={styles.cardfooter}>by {item.answer.isAnonymous ? `anonymous`  : item.answer.username}</Text>
              <TimeAgo  style = {{color:'white',opacity:0.6,fontFamily:'InterRegular',fontSize:8}} time={item.answer.createdAt} />
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
                  ispinLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
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
                  ispinLoading ?  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>...</Text> :
                  <Text style={{color:'white',fontFamily:'InterRegular',fontSize:16}}>{ pincount}</Text>

                }
                </View>

          </View>

             </View>
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
           <ShareableImageCard  textcolor = {selectedColor} color = {selectedColor} text={item.answer.answer_text} question={item.question[0].question_text} username={item.answer.isAnonymous ? `anonymous`  : item.answer.username} date={item.answer.createdAt} />

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
}

export default RenderItem

const styles = StyleSheet.create({
  cardfooter: {
    fontSize:12,
    paddingTop:20,
   // paddingRight:26,
   // paddingLeft:36,
   opacity:0.6,
    color:'white',
  fontFamily:'InterRegular'
  },
  questionrow: {

     justifyContent:"space-between",
      flexDirection:'row',
      marginTop:2,

      paddingBottom:8,
     // paddingRight:20,

    },
})
