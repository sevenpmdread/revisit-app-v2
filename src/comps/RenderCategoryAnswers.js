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
import { unpinPost,getCount,pinpost,checkpinstatus,sharepost} from '../context/restapi';
import Toast from 'react-native-toast-message';

const RenderCategoryAnswers = ({width,post,question,nav,meta}) => {
  console.log("postpostpost",post)
  let newwidth = width.showfull ? 'auto' : 280
  const [sharecount,setsharecount] = useState()
  const [pincount,setpinscount] = useState()
  const [pinned,setpin] = useState(false)
  const [errormessage,seterrormessage]  = useState('')
  const [isLoading,setLoading] = useState(true)
  useEffect(() => {
  //  console.log("I AM CALLED ID USEEFFECT")

    // declare the data fetching function
    const fetchData = async () => {

      console.log("FOUND FOUND")
      const data =  await getCount(post.item._id)
      const pindata = await checkpinstatus(post.item._id)
      if(pindata)
      {
        console.log("SDJFSJDFBSHFBSDJHSBDFJHSBDFSDBJF")
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
    const data = sharepost(post.item._id)
    setsharecount(sharecount+1)
  }
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }
  const pinPost = async() =>  {
    console.log("in here")
    const data =  await pinpost(post.item._id)
    console.log("I AM CALLED PINPOST",data)
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
    console.log("in unpin here")
    const data =  await unpinPost(post.item._id)
    console.log("I AM CALLED unPINPOST",data)
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
 // console.log("Contrast answersss ", post.item.contrast)
 var username =  post.item.isAnonymous ? 'anonynous' : post.item.username
  return !post.item.contrast ?
   (
    <View >
  <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:8,backgroundColor:'transparent',borderWidth:2,borderColor:'#171717',width:newwidth ,minHeight:180,borderRadius:16,padding:20,flexDirection:'column', justifyContent:"space-between",elevation:0}}>
            <View style={{minHeight:150,flexDirection:'column', justifyContent:"space-between"}}>
            <Text style={styles.questionText}>{post.item.answer_text}</Text>
            <View style={styles.questionrow}>
                <Text style={styles.cardfooter}>by {username}</Text>
                <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white',}}>23 hours ago</Text>
            </View>
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

            </Card>
            <BottomSheet  modalProps={{}} isVisible={isVisible}>
            {/* <ShareableImage text={post.item.answer_text}/> */}

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
             <ShareableImageCard  textcolor = {selectedColor} color = {selectedColor} text={post.item.answer_text} question={question} username={username}/>

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
  :(
    <View >
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:8,backgroundColor:'transparent',borderWidth:3,borderColor:'green',width:280,minHeight:285,borderRadius:16,padding:0,display:'flex',flexGrow:2,flexDirection:'column',   justifyContent:"space-between",
elevation:0}}>
    <View>
    <Text style={styles.contrasttexttop}>{post.item.contrast.prevanswer.answer}</Text>
    <TouchableOpacity>
    <Text style={{ backgroundColor : "#02853E",
    color : "white",
    textAlign : "center",
    paddingVertical :8,
    marginVertical : 0
    }}>SEE FULL CONTRAST</Text>
    </TouchableOpacity>
        <Text style={styles.contrasttextbottom}>{post.item.contrast.newanswer.answer}</Text>
    <View style={styles.questionrow}>
        <Text style={styles.cardfootercontrast}>by anon229</Text>
        <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white', paddingHorizontal:20,paddingBottom:10}}>23 hours ago</Text>
    </View>
    </View>
    </Card>
</View>
  )
};

export default RenderCategoryAnswers;

const styles = StyleSheet.create({
  contrasttexttop:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    height:120,
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
    height:120,
   // paddingVertical:4,
    overflow:'scroll',
    fontSize:13,
    opacity:0.8,
    marginBottom:8,
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
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
   fontFamily:'InterRegular',
  // overflow:'hidden',
    fontStyle: 'normal',
    height:150,
    overflow:'scroll',
    fontSize: 14.5,
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
  // justifyContent:"space-between",
   //SalignContent:'',
  // textAlign:'justify',
   //alignItems:'baseline',
   // textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:8,
    //paddingTop:30,
    paddingBottom:0,
  // marginBottom:8,
    flexDirection:'column',
  },
});
