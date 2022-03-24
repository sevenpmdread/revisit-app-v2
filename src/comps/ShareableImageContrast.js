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
import * as Sharing from 'expo-sharing';
const ShareableImageContrast = ({prevanswer,newanswer,questionnew}) => {
  Sharing.isAvailableAsync().then((accepted)=>{console.log(accepted)})
   //var prevanswer = "I am waiting to disappear. I am tryingto devour my mind one project at atime. I understand too much, and feeltoo little, I am trying to rebuild my perspectives.I am trying to rebuild my perspectives. I am trying to build a sculpture out of time"
   //var newanswer = "This is an answer text with a new type, this isThis is an answer text with a new type, this isThis is an answer text with a new type, this isThis is an answer tThis is an answer text with a new type, this isThis is an answer text with this isThis is an answer tThis is an answer text with a new type, this isThis is an answer text with this isThis is an answer tThis is an answer text with a new type"
   //var questionnew = "What does it mean to be in love? Can you be with somebody for life and be happy?"
//   text = text ? text : "I am waiting to disappear. I am tryingto devour my mind one project at atime. I understand too much, and feeltoo little, I am trying to rebuild my perspectives.I am trying to rebuild my perspectives. I am trying to build a sculpture out of time"
 // const [uri,setUri] = useState('')
  let [fontsLoaded] = useFonts({
    // "Intermedium": Inter_500Medium,
    // "InterRegular":Inter_400Regular,
    // "InterSemi":Inter_600SemiBold,
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
  return fontsLoaded ? (
     <View>
    <View  collapsable={false} style={styles.container} ref={viewRef}>
      {/* <Card containerStyle={{
        backgroundColor:"black",
        minHeight:400,
        width:400,
        margin:0,
        textAlignVertical:"center",
        marginBottom:0,
        borderWidth:0,
      //  marginTop:100,
     //   paddingHorizontal:30
      }}>
      <View style={{padding:16,paddingHorizontal:22, borderWidth:2,borderColor:"white"}}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.answerText}>{text}</Text>
       <Text style={styles.byuser}>by anon3302</Text>
      <Text style={styles.bydate}>25/02/22</Text>
      <View style={{flexDirection:'column',justifyContent:'space-between'}}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.tss}>REVISIT BY</Text>
      <Text style={styles.tsssecond}>THESURREALSERVICE</Text>
      </View>
      <Text style={styles.sharedfrom}>[shared from the app]</Text>
      {/* <Image style= {styles.imagelogo} source={require('../../assets/sharetss.png')} resizeMode="center"/> */}
      {/* </View>
      </View>
      </Card>
     */}
     <View style={{padding:0,margin:6,height:400}}>
     <Text style={{marginTop:0,fontSize:12,color:"white",fontFamily:"Notoregular",opacity:1,padding:0,paddingTop:12,paddingLeft:135}}>108 days apart</Text>
    <ImageBackground  imageStyle={{borderRadius:0,borderWidth:0,opacity:1}} resizeMode= 'contain' source={require('../../assets/greenmagcover2.png')} style={{marginVertical:0,marginBottom:16,marginHorizontal:12, paddingHorizontal:0,paddingBottom:0,paddingTop:0}}>
     <View style={{
       backgroundColor:"transparent",
       height:280,
       //width:400,
        marginVertical:12,
        marginHorizontal:6,

       // textAlignVertical:"center",
        marginBottom:0,

        padding:20,
        }}>
        <View style={{flexDirection:"row"}}>
        <View style={{width:135,flexDirection:"column",height:450,justifyContent:"flex-start"}}>
          <Text style={{fontSize:10,color:"black",fontFamily:"Notoregular",textDecorationLine:"underline",width:130,marginTop:4,opacity:0.7}}>{questionnew}</Text>
          <Text style={{fontSize:7.5,color:"black",fontFamily:"Notoregular",width:130,marginTop:0,opacity:0.7}}>{prevanswer}</Text>
          <Text style={{fontSize:6,color:"black",fontFamily:"Notoregular",textAlign:"center",opacity:0.6,marginTop:56}}>16/11/21</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:0,textAlignVertical:"bottom",alignSelf:"stretch",alignItems:"baseline"}}>
            {/* <Text style={{marginTop:0,fontSize:6,color:"black",fontFamily:"Notoregular",opacity:0.7,textAlignVertical:"bottom"}}>Answered</Text>
            <Text style={{marginTop:0,fontSize:6,color:"black",fontFamily:"Notoregular",opacity:0.7}}>23,002 times</Text> */}
            </View>
        </View>
        <View style={{width:135,marginLeft:38,marginTop:10,justifyContent:"space-between",height:240}}>
          <Text style={{fontSize:7.5,color:"white",fontFamily:"Notoregular",width:130,marginTop:0,opacity:0.9,marginBottom:0,paddingBottom:0}}>{newanswer}</Text>
          <Text style={{fontSize:6,color:"white",fontFamily:"Notoregular",width:130,marginTop:0,opacity:0.9,marginBottom:0,textDecorationLine:"underline",padding:0}}>by annon2993</Text>
          <Text style={{fontSize:6,color:"white",fontFamily:"Notoregular",textAlign:"center",opacity:0.8}}>04/03/22</Text>

            {/* <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:0}}>
            <Text style={{marginTop:0,fontSize:4,color:"black",fontFamily:"Notoregular",opacity:0.8}}>REVISIT BY</Text>
            <Text style={{marginTop:0,fontSize:4,color:"black",fontFamily:"Notoregular",opacity:0.8}}>THESURREALSERVICE</Text>
            </View> */}
        </View>

        </View>


     </View>
    </ImageBackground>
    <View style={{flexDirection:"row"}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",width:155,paddingLeft:35,paddingTop:0,paddingBottom:25,marginBottom:0}}>
    <Text style={{marginTop:0,fontSize:6,color:"white",fontFamily:"Notoregular",opacity:0.9,textAlignVertical:"bottom",padding:0}}>Answered</Text>
    <Text style={{marginTop:0,fontSize:6,color:"white",fontFamily:"Notoregular",opacity:0.9}}>23,002 times</Text>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-between",width:205,paddingLeft:65,paddingTop:0,paddingBottom:25,marginBottom:0}}>
    <Text style={{marginTop:0,fontSize:6,color:"white",fontFamily:"Notoregular",opacity:0.9}}>Revisit by</Text>
    <Text style={{marginTop:0,fontSize:6,color:"white",fontFamily:"Notoregular",opacity:0.9}}>TheSurrealService.com</Text>
    </View>
    </View>

    </View>

      </View>
      <TouchableOpacity style={{padding:8,borderWidth:0,borderColor:"grey",width:75,marginLeft:18,marginBottom:8,borderRadius:12}} onPress={shareDummyImage}>
        <Text style={styles.sharebutton}>Share</Text>
      </TouchableOpacity>
      </View>

  ) : <></>
}

export default ShareableImageContrast

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
    alignSelf:'flex-start',
    color:'white',
    fontFamily:'InterRegular',
    paddingLeft:8,
    paddingTop:36,
    fontSize:6
  },
  tss:{
    alignSelf:'flex-start',
    color:'white',
    fontFamily:'InterRegular',
  //  textDecorationLine:'underline',
    paddingLeft:8,
    opacity:0.9,
    paddingTop:36,
    fontSize:8
  },
  tsssecond:{
    alignSelf:'flex-end',
    color:'white',
    fontFamily:'InterRegular',
  //  textDecorationLine:'underline',
    paddingRight:10,
    paddingTop:36,
    fontSize:8,
    opacity:0.9
  },
  bydate:{
    color:'white',
    fontFamily:'InterRegular',
    //textDecorationLine:'underline',
    fontSize:8,
    opacity:0.6,
    textAlign:'right',
    paddingRight:10,
  },
  byuser:{
    color:'white',
    fontFamily:'InterRegular',
    textDecorationLine:'underline',
    fontSize:8,
    opacity:0.8,
    textAlign:'right',
    paddingRight:10,
    paddingTop:42
  },
  byText:{

  //  textAlign:'right'
  },
  answerText:{
    color:'white',
    fontFamily:'InterRegular',
  // textDecorationLine:'underline',
   // opacity:0.9,
    paddingLeft:8,
    paddingTop:50,
    fontSize:9.5,
    lineHeight:13,
   // letterSpacing:0.5,

  },
  questionText:{
    color:'white',
    fontFamily:'InterRegular',
    fontSize:14,
    includeFontPadding:true,
   textDecorationLine:'underline',
    paddingLeft:8,
    paddingTop:20
  },
  container:{
    backgroundColor:"black",
  //  flex:1,
    padding:0,
    borderWidth:1,
   borderColor:"white",
    margin:6,
    borderWidth:0,
    marginTop:200,
   // borderRadius:8,
  //  overflow:"hidden",

    width:400,
     height:400,
   alignSelf:'center',
  //  marginLeft:100
  }
})
