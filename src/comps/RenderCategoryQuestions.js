import React,{useState} from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,Alert } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
//import { ColorPicker } from 'react-native-color-picker'
import { ColorPicker } from "react-native-btr";
import * as ImagePicker from 'expo-image-picker';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import ShareCardQuestion from './ShareCardQuestion';
import ShareableImageQuestion from './ShareableImageQuestion';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";

const RenderCategoryQuestions = ({post,nav}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showmodal,setshowmodal] = useState(false)
  var todayDate = new Date().toISOString().slice(0, 10).replace(/-/g,"/")


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

  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
 // console.log(post)
   var count  = post.item.count ? post.item.count.responsecount : 0
   return post.item.type !== "more" ?  (
    <View >
       <Modal isVisible={showmodal}>
        <View style={{ flex: 1,marginVertical:220 }}>
        <View style={{backgroundColor:'#0C0C0C',padding:12,flexDirection:'row'}}>

        <TouchableOpacity onPress={()=>setshowmodal(false)}>
        <Entypo name="cross" size={24} color="#F4722B" style={{alignSelf:'flex-end'}}/>
        </TouchableOpacity>
        </View>
        <DatePicker
           //   selected={todayDate}
           minimumDate={todayDate}
              mode="datepicker"
     options={{
      backgroundColor: '#0C0C0C',
      textHeaderColor: '#F4722B',
      textDefaultColor: '#F3F3F3',
      selectedTextColor: '#fff',
      mainColor: '#F4722B',
      textSecondaryColor: '#D6C7A1',
      borderColor: 'rgba(122, 146, 165, 0.1)',
    }}
      onSelectedChange={date =>
       {
         console.log(date)
          setSelectedDate(date)
          if(date.substring(11) != '00:00')
          setshowmodal(false)
        }
      }
    />
        </View>
      </Modal>
            <Card containerStyle={{marginVertical:0,marginBottom:16,marginHorizontal:8,elevation:0,backgroundColor:'transparent',borderWidth:1,borderColor:'rgba(255, 255, 255, 0.2)',width:240,minHeight:200,borderRadius:16,paddingBottom:5,flexDirection:'column',justifyContent:'space-between'}}>
            <View style={{flexDirection:'column',justifyContent:'space-between',minHeight:200}}>
            <Text style={styles.questionText}>{post.item.text}</Text>
            <View style={styles.questionrow}>
                <TouchableOpacity   onPress= {() => setIsVisible(true)}>
                <Entypo name="share" size={20} color="white" style={{paddingRight:10}}/>
                </TouchableOpacity>
                {
                  selectedDate ?
                  <View style={{flexDirection:'row',backgroundColor:"transparent",borderRadius:12,padding:8,opacity:0.8,elevation:5,borderColor:'white',borderWidth:0.5}}>
                  <MaterialCommunityIcons name="clock-check" size={24} color="green" style={{opacity:0.6}} />
                  <TouchableOpacity onPress={()=>setSelectedDate('')}>
        <Entypo name="cross" size={20} color="white" style={{alignSelf:'flex-end',paddingVertical:2,paddingLeft:8}}/>
        </TouchableOpacity>
                  </View>
                   :
                   <TouchableOpacity onPress={() => setshowmodal(true)}>
                  <Feather name="clock" size={20} color="white" style={{paddingHorizontal:8}}/>
                  </TouchableOpacity >

                  }
                <Text style={styles.cardfooter}>Answered {count} times</Text>
            </View>
            </View>
            </Card>
             <BottomSheet  modalProps={{}} isVisible={isVisible}>
            {/* <ShareableImage text={post.item.answer_text}/> */}

          {list.map((l, i) => {
          //  console.log("sfjksdfk",l,i)
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
             <ShareCardQuestion textcolor = {selectedColor} sentimage={image} color={selectedColor} question={post.item.text} count={count}/>
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
    paddingTop:0,
   // paddingRight:26,
    paddingLeft:20,
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
   // flex:2,
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
