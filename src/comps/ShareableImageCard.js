import React,{useRef,useState} from 'react'
import { StyleSheet, Text, View,Image, ViewPropTypes,TouchableOpacity,Button,ImageBackground } from 'react-native'
import { Card } from 'react-native-elements'
import {captureRef} from 'react-native-view-shot'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import {
  NotoSerifJP_200ExtraLight,
  NotoSerifJP_300Light,
  NotoSerifJP_400Regular,
  NotoSerifJP_500Medium,
  NotoSerifJP_600SemiBold,
  NotoSerifJP_700Bold,
  NotoSerifJP_900Black
} from '@expo-google-fonts/noto-serif-jp'
import * as ImagePicker from 'expo-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import * as Sharing from 'expo-sharing';
const ShareableImageCard = ({textcolor,color,text,question,username,date}) => {
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

 // const [uri,setUri] = useState('')
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
     {image ?
     <ImageBackground source={{ uri: image }} imageStyle={{opacity:0.5}} style={{ margin:15,padding:0,marginBottom:0,height:200}} >
       <View style={{height:200,justifyContent:"space-between",flexDirection:'column'}}>
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
    paddingVertical:12,
    fontSize:8}}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>

      </View>
      </View>

      </ImageBackground> :
      <Card containerStyle={{backgroundColor:color,borderColor:"black",minHeight:100}}>
      <View style={{flexDirection:'column',justifyContent:'space-between',minHeight:100}}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.tss}>REVISIT BY                                                      THESURREALSERVICE.COM</Text>
      </View>
      </Card>
      }
      <Card containerStyle={{backgroundColor:"#f3f3f3",borderColor:"black",marginBottom:10}}>
      <View style={{flexDirection:"column",justifyContent:"space-between",minHeight:150}}>
      <View style={{paddingTop:12}}>
      <Text style={styles.answerText}>{text}</Text>
      </View>
      <View>
      <Text style={styles.byuser}>by {username}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.bydate}>{date}</Text>
      <Text style={styles.sharedfrom}>[shared from the app]</Text>
      </View>

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

export default ShareableImageCard

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    opacity:0.2
  },
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
    paddingHorizontal:12,
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
  byuser:{
    color:'black',
    fontFamily:'Intermedium',
    textDecorationLine:'underline',
    fontSize:10,
    opacity:1,
    textAlign:'left',
    //alignSelf:"flex-end",
    textAlignVertical:"bottom",
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
    fontSize:16,
    //includeFontPadding:true,
  // textDecorationLine:'underline',
  //  paddingLeft:8,
    paddingHorizontal:12,
    paddingVertical:12,
   // marginBottom:56
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
