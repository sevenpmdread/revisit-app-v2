import React,{useState} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import ShareableImageQuestion from './ShareableImageQuestion';
const RenderCategoryQuestions = ({post,nav}) => {
  const list = [
    { title: 'sfjksdfh', titleStyle:{color:'black'}, containerStyle: {backgroundColor:'black',borderTopRadius:20,marginHorizontal:0,display:"flex",padding:0,marginVertical:0,alignItems:"center"} },
    {
      title: 'Cancel',
      titleStyle:{color:'red'}, containerStyle: {backgroundColor:'black',marginHorizontal:1,height:60,borderColor:"red",borderTopWidth:2},
      onPress: () => setIsVisible(false),
    },
  ];
  const [isVisible, setIsVisible] = useState(false);

  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
  console.log(post)
   return post.item.type !== "more" ?  (
    <View >
            <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:5,backgroundColor:'#222222',borderWidth:1,borderColor:'rgba(255, 255, 255, 0.4)',width:240,minHeight:265,borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
            <View>
            <Text style={styles.questionText}>{post.item.question_text}</Text>
            <View style={styles.questionrow}>
                <TouchableOpacity   onPress= {() => setIsVisible(true)}>
                <Entypo name="share" size={20} color="white" style={{paddingRight:10}}/>
                </TouchableOpacity>
                <TouchableOpacity >
                <Feather name="clock" size={24} color="white" style={{paddingHorizontal:8}}/>
                </TouchableOpacity >
                <Text style={styles.cardfooter}>Answered 2 times</Text>
            </View>
            </View>
            </Card>
            <BottomSheet  modalProps={{}} isVisible={isVisible}>
            {/* <ShareableImage text={post.item.answer_text}/> */}

          {list.map((l, i) => {
            console.log("sfjksdfk",l,i)
          return <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content style={{padding:0,margin:0}}>
              <View style={{margin:0,padding:0}}>
             { l.title != "Cancel" ?
             <View>
             <ShareableImageQuestion  question={post.item.question_text}/>

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
    <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:5,backgroundColor:'black',borderWidth:1,borderColor:'rgba(255, 255, 255, 0.4)',width:240,minHeight:265,borderRadius:16,paddingBottom:5,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
    <View>
    <TouchableOpacity>
    <Text style={styles.readmore}>{post.item.question_text}</Text>
    </TouchableOpacity>
    </View>
    </Card>
</View>
  )
};

export default RenderCategoryQuestions;

const styles = StyleSheet.create({
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
 //  fontFamily:'Intermedium',
    fontStyle: 'normal',

    fontSize: 22,
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
   alignContent:'flex-end',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:15,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:5,
    flexDirection:'row',
  },
});
