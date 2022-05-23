import React,{useRef,useState,useContext} from 'react'
import { StyleSheet, Text, View,Image, ViewPropTypes,TouchableOpacity,Button,ImageBackground } from 'react-native'
import { Card } from 'react-native-elements'
import {captureRef} from 'react-native-view-shot'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import * as ImagePicker from 'expo-image-picker';
import {
  NotoSerifJP_200ExtraLight,
  NotoSerifJP_300Light,
  NotoSerifJP_400Regular,
  NotoSerifJP_500Medium,
  NotoSerifJP_600SemiBold,
  NotoSerifJP_700Bold,
  NotoSerifJP_900Black
} from '@expo-google-fonts/noto-serif-jp'
import * as Sharing from 'expo-sharing';
import Avatar from 'react-native-boring-avatars';
import { Context as AuthContext } from '../context/authContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ShareCardQuestion = ({textcolor,color,text,question,count}) => {
  const {state,signout} = useContext(AuthContext)

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
      console.log("IMAGE -> ",image);
    }
  };

  Sharing.isAvailableAsync().then((accepted)=>{console.log(accepted)})
   text = text ? text : "I am waiting to disappear. I am tryingto devour my mind one project at atime. I understand too much, and feeltoo little, I am trying to rebuild my perspectives.I am trying to rebuild my perspectives. I am trying to build a sculpture out of time"
 // const [uri,setUri] = useState('')
  const [resourcePath,setresourcepath] = useState()
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold,
    "notolight":NotoSerifJP_300Light,
    "Notoregular":NotoSerifJP_400Regular,
    "notoextra":NotoSerifJP_200ExtraLight,
    "notolight":NotoSerifJP_300Light,
    "notomedium":NotoSerifJP_500Medium
   });
  const viewRef = useRef()
  const shareDummyImage = async() => {
    try {
      const uri = await captureRef(viewRef,{
        format:"jpeg",
        quality:1,
      //  result:"base64"
      });
      //setUri(uri)

      await Sharing.shareAsync(uri,{UTI:"jpg"})
     // Sharing.shareAsync(uri)
   //   alert(uri)

      // const result = await Share.share({
      //   url: `data:image/png;base64,` + uri,
      //   type: 'image/png',
      //  // message: '',
      //  // title: ''
      //  //   'React Native | A framework for building native apps using React',
      // });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
           // const result = await Share.share({
      //   url:uri
      // });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error)
      }
  }
  return (
    <View>
    <TouchableOpacity style={{backgroundColor:"#121212",borderRadius:8,paddingLeft:8,marginHorizontal:12}} onPress={pickImage}>
    <Text style={{fontFamily:"Intermedium",fontSize:16,padding:12,color:'white'}}>Pick image from gallery</Text>
    </TouchableOpacity>
    <View  collapsable={false} style={styles.container} ref={viewRef}>
      <Card containerStyle={{
        backgroundColor:"black",
       minHeight:500,
      //  width:400,
        margin:0,
        padding:0,
        textAlignVertical:"center",
        marginBottom:0,
        borderWidth:0,
      //  marginTop:100,
     //   paddingHorizontal:30
      }}>
      {image ? <ImageBackground source={{ uri: image }} style={{ margin:15,padding:15,marginBottom:0,minHeight:250,flexDirection:"column",justifyContent:"space-between" }} >
      <Text style={{ color:textcolor,
    fontFamily:'Intermedium',
    fontSize:36,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:16,
    paddingVertical:16}}>{question}</Text>
      <View>
      <Text style={{ alignSelf:'flex-start',
    color:textcolor,
    fontFamily:'InterSemi',
    textDecorationLine:'underline',
    paddingHorizontal:16,
    opacity:0.9,
    paddingVertical:6,
    fontSize:8}}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>
      <Text style={{alignSelf:'flex-start',
    color:textcolor,
    fontFamily:'InterRegular',
    //textDecorationLine:'underline',
    paddingHorizontal:16,
    opacity:0.9,
    paddingVertical:6,
    fontSize:6}}>ANSWERED {count} TIMES</Text>
    </View>

      </ImageBackground> :
      <Card containerStyle={{backgroundColor:color,borderColor:"black",minHeight:300,flexDirection:"column",justifyContent:"space-between" }}>
      <Text style={styles.questionText}>{question}</Text>
      <View>
       <Text style={styles.tss}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>
       <Text style={{alignSelf:'flex-start',
    color:'black',
    fontFamily:'Intermedium',
    //textDecorationLine:'underline',
    paddingHorizontal:16,
    opacity:0.9,
    paddingVertical:6,
    fontSize:7}}>ANSWERED {count} TIMES</Text>
      </View>
      </Card>}
      <Card containerStyle={{backgroundColor:"#f3f3f3",borderColor:"white",borderWidth:0,height:150,marginBottom:0}}>
      <View style={{flexDirection:"row",paddingTop:6}}>
      <View style={{padding:0,paddingTop:15,paddingLeft:24}}>
      <View style={{borderWidth:1,borderColor:'white',borderRadius:200}}>
      <Text><Avatar
  size={80}

  name={state.username}
  variant="bauhaus"
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/></Text>
      </View>
      {/* <Image source={require("../../assets/cardlogo.png")} resizeMode="contain" imageStyle={{height:100,paddingTop:200,marginTop:200}} containerStyle={{height:100,textAlign:"left",paddingTop:200,marginTop:200}}/> */}
      </View>
      <View style={{flexDirection:"column",paddingLeft:80,marginLeft:0,width:230,paddingTop:0}}>
      <Text style={styles.whatis}>What is Revisit?</Text>
      <Text style={styles.answerText}>Revisit is an app that helps you track your thoughts and create a timeline of your views that evolve over time</Text>
      </View>


      </View>
      </Card>
      </Card>
      </View>
      <TouchableOpacity style={{padding:8,borderWidth:0,borderColor:"grey",width:75,marginLeft:18,marginBottom:8,borderRadius:12}} onPress={shareDummyImage}>
        <Text style={styles.sharebutton}>Share</Text>
      </TouchableOpacity>

      </View>
  )
}

export default ShareCardQuestion

const styles = StyleSheet.create({
  sharebutton:{
    color:"white",
    fontFamily:"InterRegular",
    fontSize:16
  },
  imagelogo:{
    alignSelf:"flex-end",
   // textAlign:"right",
    height:400,
    width:400,
    marginTop:30,
    paddingTop:50,
  },
  sharedfrom:{
    alignSelf:'flex-end',
    color:'black',
    fontFamily:'InterRegular',
    paddingHorizontal:12,
   // paddingTop:8,
    fontSize:8
  },
  tss:{
    alignSelf:'flex-start',
    color:'black',
    fontFamily:'InterSemi',
    textDecorationLine:'underline',
    paddingHorizontal:16,
    opacity:0.9,
    paddingVertical:6,
    fontSize:8
  },
  tsssecond:{
    alignSelf:'flex-end',
    color:'black',
    fontFamily:'InterSemi',
  //  textDecorationLine:'underline',
  paddingHorizontal:20,
  paddingVertical:6,

  //paddingTop:36,
    fontSize:8,
    opacity:0.9
  },
  bydate:{
    color:'black',
    fontFamily:'Intermedium',
   // textDecorationLine:'underline',
    fontSize:10,
    opacity:1,
    textAlign:'left',
    paddingTop:6,
    paddingHorizontal:12
  },
  whatis:{
    color:'black',
    fontFamily:'InterSemi',
   // textDecorationLine:'underline',
    fontSize:12,
    opacity:1,
    paddingTop:0,
    textAlign:'left',
    paddingHorizontal:0
  },
  byuser:{
    color:'black',
    fontFamily:'Intermedium',
    textDecorationLine:'underline',
    fontSize:10,
    opacity:1,
    textAlign:'left',
    paddingHorizontal:12
   // paddingRight:10,
  //  paddingTop:42
  },
  byText:{

  //  textAlign:'right'
  },
  answerText:{
    color:'black',
    fontFamily:'Intermedium',
    fontSize:10,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
  //  paddingHorizontal:12,
    paddingVertical:6
   // letterSpacing:0.5,

  },
  questionText:{
    color:'black',
    fontFamily:'Intermedium',
    fontSize:36,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:12,
    paddingVertical:12
  },
  container:{
    backgroundColor:"transparent",
  //  flex:1,
    padding:0,
   // margin:6,
    borderWidth:0,
   // marginTop:200,
   // borderRadius:8,
  //  overflow:"hidden",

    width:420,
    minHeight:500,
    alignSelf:'center',
  //  marginLeft:100
  }
})
