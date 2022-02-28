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
import { share } from 'react-native-cq-share'
import * as Sharing from 'expo-sharing';
const ShareableImageMag = ({text,question}) => {
  Sharing.isAvailableAsync().then((accepted)=>{console.log(accepted)})
   text = text ? text : "I am waiting to disappear. I am tryingto devour my mind one project at atime. I understand too much, and feeltoo little, I am trying to rebuild my perspectives.I am trying to rebuild my perspectives. I am trying to build a sculpture out of time"
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
     <View style={{borderWidth:1,borderColor:"white",padding:0,margin:12}}>
    <ImageBackground  imageStyle={{borderRadius:0,borderWidth:0,opacity:1}} resizeMode= 'contain' source={require('../../assets/magcover.png')} style={{marginVertical:0,marginBottom:16,marginHorizontal:12, paddingHorizontal:0,paddingBottom:0,paddingTop:0}}>
     <View style={{
       backgroundColor:"transparent",
        height:350,
      //  width:400,
        margin:0,
        textAlignVertical:"center",
        marginBottom:0,

        padding:20,
        }}>
        <View style={{flexDirection:"row"}}>
        <View style={{width:135,flexDirection:"column",justifyContent:"space-between",height:275}}>
          <Text style={{fontSize:16,color:"black",fontFamily:"Notoregular",textDecorationLine:"underline",width:130,marginTop:40,opacity:0.6}}>{question}</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:0,textAlignVertical:"bottom",alignSelf:"stretch",alignItems:"baseline"}}>
            <Text style={{marginTop:0,fontSize:6,color:"black",fontFamily:"Notoregular",opacity:0.7,textAlignVertical:"bottom"}}>Answered</Text>
            <Text style={{marginTop:0,fontSize:6,color:"black",fontFamily:"Notoregular",opacity:0.7}}>23,002 times</Text>
            </View>
        </View>
        <View style={{width:135,marginLeft:38,marginTop:10,justifyContent:"space-between",height:264}}>
          <Text style={{fontSize:7.5,color:"black",fontFamily:"Notoregular",width:130,marginTop:40,opacity:0.7}}>{text}</Text>
          <Text style={{fontSize:6,color:"black",fontFamily:"Notoregular",width:130,marginTop:0,opacity:0.7,marginBottom:0,textDecorationLine:"underline"}}>by annon2993</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:0}}>
            <Text style={{marginTop:0,fontSize:4,color:"black",fontFamily:"Notoregular",opacity:0.8}}>REVISIT BY</Text>
            <Text style={{marginTop:0,fontSize:4,color:"black",fontFamily:"Notoregular",opacity:0.8}}>THESURREALSERVICE</Text>
            </View>
        </View>
        </View>


     </View>
    </ImageBackground>
    </View>
      </View>
      <TouchableOpacity style={{padding:8,borderWidth:0,borderColor:"grey",width:75,marginLeft:18,marginBottom:8,borderRadius:12}} onPress={shareDummyImage}>
        <Text style={styles.sharebutton}>Share</Text>
      </TouchableOpacity>
      </View>

  ) : <></>
}

export default ShareableImageMag

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
