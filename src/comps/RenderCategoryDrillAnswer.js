import React,{useState} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
import ShareableImageCard from './ShareableImageCard';
import { ColorPicker } from "react-native-btr";
import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import ShareableImage from './ShareableImage';
import ShareableImageMag from './ShareableImageMag';
import ShareCardContrast from './ShareCardContrast';
import ShareableImageContrast from './ShareableImageContrast';
const RenderCategoryDrillAnswers = ({post,nav}) => {
  const [selectedColor, setSelectedColor] = useState("#AC2929");
  function setColor(color) {
    setSelectedColor(color);
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
 // console.log("sfusdkjf", post)
   return !post.item.contrast ? post.item.type !== "more" ?  (
    <View style={{margin:0,paddingHorizontal:0}}>
            <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:12,elevation:0,backgroundColor:'transparent',borderWidth:1,borderColor:'rgba(255, 255, 255, 0.4)',borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:1,flexDirection:'column'}}>
            <View>
            <Text style={styles.questionText}>{post.item.answer_text}</Text>
            <View style={{flexDirection:'row'}}>
            <View style={styles.questionrow}>
                <Text style={styles.cardfooter}>by anon229</Text>
                <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white',}}>23 hours ago</Text>
            </View>
            <View style={{flexDirection:'row',padding:12}}>
                  <TouchableOpacity  onPress= {() => setIsVisible(true)}>
                  <Entypo name="share" size={32} color="white" style={{paddingRight:10}}/>
                  </TouchableOpacity>
                  <TouchableOpacity >
                  <Feather name="clock" size={32} color="white" style={{paddingHorizontal:8}}/>
                  </TouchableOpacity >
            </View>
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
             <ShareableImageCard  textcolor = {selectedColor} color = {selectedColor} text={post.item.answer_text} question={post.item.question_text}/>

            </View>
             :
             <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>}
              </View>
            </ListItem.Content>
          </ListItem>
})}
      </BottomSheet>
    </View>
  ) : (
    <View >
    <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:0,backgroundColor:'black',borderWidth:2,borderColor:'rgba(255, 255, 255, 0.4)',minHeight:265,borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
    <View>
    <TouchableOpacity>
    <Text style={styles.readmore}>{post.item.question_text}</Text>
    </TouchableOpacity>
    </View>
    </Card>
</View>
  )
  : (
    <View style={{margin:0,paddingHorizontal:0}}>
    <Card containerStyle={{marginTop:20,marginVertical:0,marginBottom:16,marginHorizontal:12,elevation:0,backgroundColor:'transparent',borderWidth:3,borderColor:'green',borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:1,flexDirection:'column',padding:0}}>
    <View>
    <Text style={styles.questionTextTop}>{post.item.contrast.prevanswer.answer}</Text>
    <TouchableOpacity>
    <View
    style={{
      backgroundColor : "#02853E",
      textAlign : "center",
      paddingVertical :8,
      marginVertical : 0,
      flexDirection:"row",
      justifyContent:"flex-start"
    }}>
      <Feather name="arrow-up" size={16} style={{paddingLeft:6,paddingTop:4}} color="white" />
      <Text style={{
      textAlign:"left",
      paddingLeft:6,
      fontSize:12,
      paddingTop:2,
      fontFamily:"InterRegular",
      color : "white",
    }}>15/01/22</Text>
    <Text style={{
      textAlign:"center",
      paddingLeft:40,
      fontFamily:"Intermedium",
    //  textDecorationLine:"underline",
      color : "white",
    }}>108 days apart</Text>
    <Text style={{
      textAlign:"left",
      paddingLeft:40,
      paddingTop:2,
      fontSize:12,
      fontFamily:"InterRegular",
      color : "white",
    }}>25/01/22</Text>
     <Feather name="arrow-down" size={16} style={{paddingLeft:6,paddingTop:4}} color="white" />

    </View>
    </TouchableOpacity>
    <Text style={styles.questionTextBottom}>{post.item.contrast.newanswer.answer}</Text>
    <View style={{flexDirection:'row'}}>
    <View style={styles.questionrow}>
        <Text style={styles.cardfootercontrast}>by anon229</Text>
        <Text style={{fontSize:10,opacity:0.3,fontFamily:'InterRegular',color:'white',padding:16,paddingTop:0}}>23 hours ago</Text>
    </View>
    <View style={{flexDirection:'row',padding:12}}>
          <TouchableOpacity  onPress= {() => setIsVisible(true)}>
          <Entypo name="share" size={32} color="white" style={{paddingRight:10}}/>
          </TouchableOpacity>
          <TouchableOpacity >
          <Feather name="clock" size={32} color="white" style={{paddingHorizontal:8}}/>
          </TouchableOpacity >
        </View>
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
     <ShareCardContrast textcolor = {selectedColor} color={selectedColor} prevanswer={post.item.contrast.prevanswer.answer} newanswer={post.item.contrast.newanswer.answer} question={post.item.question_text}/>

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

export default RenderCategoryDrillAnswers;

const styles = StyleSheet.create({
  cardfootercontrast: {
    fontSize:12,
    padding:16,
    paddingBottom:0,
    paddingTop:0,
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
  questionTextTop:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height:230,
    overflow:'scroll',
    fontSize: 16,
    opacity:0.9,
    padding:16,
   // paddingBottom:24,
    color:'white',
  },
  questionTextBottom:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height:230,
    overflow:'scroll',
    fontSize: 16,
    opacity:0.9,
    padding:16,
   // paddingBottom:24,
    color:'white',
  },
  questionText:{
   fontFamily:'InterRegular',
    fontStyle: 'normal',
   // height:230,
    overflow:'scroll',
    fontSize: 16,
    opacity:0.9,
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
    display:'flex',
    flex:2,
   //SalignContent:'',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:8,
    //paddingTop:30,
    paddingBottom:0,
   marginBottom:8,
    flexDirection:'column',
  },
});
