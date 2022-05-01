import React,{useRef,useState} from 'react'
import { StyleSheet, Text, View,Image, ViewPropTypes,TouchableOpacity,Button,ImageBackground } from 'react-native'
import { Card } from 'react-native-elements'
import {captureRef} from 'react-native-view-shot'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold,Inter_300Light} from '@expo-google-fonts/inter';
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
const ShareCardContrast = ({textcolor,color,prevanswer,newanswer,question,username,prevdate,newdate,diffdays}) => {
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
  Sharing.isAvailableAsync().then((accepted)=>{})
   //text = text ? text : "I am waiting to disappear. I am tryingto devour my mind one project at atime. I understand too much, and feeltoo little, I am trying to rebuild my perspectives.I am trying to rebuild my perspectives. I am trying to build a sculpture out of time"
 // const [uri,setUri] = useState('')
 console.log(color)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold,
    "Interlight":Inter_300Light,
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
        format:"jpg",
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
  return(
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
     {image ? <ImageBackground source={{ uri: image }} imageStyle={{opacity:0.7}} style={{ margin:15,padding:15,marginBottom:0,height:200 }} >
      <Text style={{ color:textcolor,
    fontFamily:'Intermedium',
    fontSize:20,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:16,
    paddingVertical:16}}>{question}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={{ alignSelf:'flex-start',
    color:textcolor,
    fontFamily:'InterSemi',
    textDecorationLine:'underline',
    paddingHorizontal:16,
    opacity:0.9,
    paddingVertical:6,
    fontSize:8}}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>
      </View>
      </ImageBackground> :
      <Card containerStyle={{backgroundColor:color,borderColor:"black",maxHeight:400}}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.tss}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>
      </View>
      </Card>}
      <Card containerStyle={{backgroundColor:"#DDDBDC",borderColor:"black",minHeight:80,paddingBottom:2,marginBottom:0,marginTop:10}}>
      <Text style={styles.prevdate}>On {prevdate}</Text>
      <View style={{flexDirection:'column',justifyContent:'space-between',minHeight:80}}>
      <Text style={styles.answerText}>{prevanswer}</Text>
      </View>
      </Card>
      <Card containerStyle={{backgroundColor:"#DDDBDC",borderColor:"black",minHeight:165,paddingBottom:12,marginTop:10,marginBottom:10}}>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.prevdate}>On {newdate}</Text>
      <Text style={styles.daysafter}>[{diffdays} days after previous response]</Text>
      </View>
      <View style={{flexDirection:'column',justifyContent:'space-between',minHeight:80}}>
      <Text style={styles.answerText}>{newanswer}</Text>
      <Text style={styles.responseby}>contrast by                                                                                           {username}</Text>
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

export default ShareCardContrast

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
  responseby:{
    textAlign:"left",
    color:'black',
    fontFamily:'Intermedium',
    fontSize:7.5,
    opacity:0.6,
    textDecorationLine:'underline',
    paddingHorizontal:12,
    paddingVertical:12,
  },
  tss:{
    alignSelf:'flex-start',
    color:'black',
    fontFamily:'InterSemi',
    textDecorationLine:'underline',
    paddingHorizontal:12,
    opacity:0.9,
    paddingVertical:6,
    fontSize:8
  },
  tsssecond:{
    alignSelf:'flex-end',
    color:'black',
    fontFamily:'InterSemi',
   textDecorationLine:'underline',
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
  byuser:{
    color:'black',
    opacity:0.6,
    fontFamily:'Intermedium',
  //  textDecorationLine:'underline',
    fontSize:8,
    opacity:1,
    textAlign:'right',
    paddingHorizontal:12,
    paddingVertical:6

   // paddingRight:10,
  //  paddingTop:42
  },
  byText:{

  //  textAlign:'right'
  },
  daysafter:{
    opacity:0.3,
    color:'black',
    fontFamily:'Intermedium',
// fontStyle:"italic",
    fontSize:8,
  //  textDecorationLine:"underline",
    paddingLeft:0,
    //paddingTop:6,
    paddingVertical:7
  },
  prevdate:{
    color:'black',
    fontFamily:'Intermedium',
    fontSize:12,
    opacity:0.3,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:12,
    paddingVertical:4
   // letterSpacing:0.5,
  },
  answerText:{
    color:'black',
    fontFamily:'Intermedium',
    fontSize:11,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:12,
    paddingVertical:2,
    paddingBottom:0
   // letterSpacing:0.5,

  },
  questionText:{
    color:'black',
    fontFamily:'InterSemi',
    fontSize:20,
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
    margin:6,
    borderWidth:0,
   // marginTop:200,
   // borderRadius:8,
  //  overflow:"hidden",

    width:400,
    minHeight:500,
    alignSelf:'center',
  //  marginLeft:100
  }
})
