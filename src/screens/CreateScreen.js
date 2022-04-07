import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { BottomSheet, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
const CreateScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const  post = navigation.getParam('post')

  const list = [
    { title: 'Share this question', titleStyle:{color:'white'}, containerStyle: {backgroundColor:'black',borderTopRadius:20,marginHorizontal:2} },
    { title: 'Set a reminder',titleStyle:{color:'white'}, containerStyle: {backgroundColor:'black',marginHorizontal:1} },
    {
      title: 'Cancel',
      titleStyle:{color:'white'}, containerStyle: {backgroundColor:'#DF3939',marginHorizontal:1},
      onPress: () => setIsVisible(false),
    },
  ];
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
   const [value, onChangeText] = useState('');
  const [charCount,setCharCount] = useState(value.length)
  var opacity = charCount > 0 ? 1 : 0.4
  return (
    <KeyboardAwareScrollView
    style={{ backgroundColor: '#101010'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
    <View style={styles.container} >
      <View style={styles.header}>
        <TouchableOpacity >
      <EvilIcons name="close" size={36} color="white" style={{padding:8,paddingTop:12}}/>
      </TouchableOpacity>
      <Button
      title='Publish'
      containerStyle={{
        paddingRight:8,
        paddingTop:2,
       // opacity:1,
        opacity:opacity,
        fontFamily:'InterRegular'
      }}
      buttonStyle={{
        backgroundColor:'#5D51D1',
        borderRadius:36,
        paddingHorizontal:20,
        paddingVertical:12,
        fontFamily:'Intermedium'

      }}
      />
      </View>
      <View style={{flexDirection:'row', paddingHorizontal:26,paddingRight:30,paddingTop:18}}>
        <Text style={styles.questionText}>{post.item.question_text}</Text>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Feather name="more-vertical" size={26} color="white" style={{marginTop:12,textAlign:'left',opacity:0.7}}/>
        </TouchableOpacity>
      </View>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
          {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {/* <Button
       title='Post Anonmously'
       titleStyle={{fontFamily:'Intermedium',fontSize:12,color:'white'}}
       buttonStyle={{backgroundColor:'#161611',borderRadius:20,paddingHorizontal:0,marginHorizontal:0,fontFamily:'InterRegular',fontSize:8,opacity:0.8,borderColor:'#F5F5F5',borderWidth:1}}
       containerStyle={{width:220,backgroundColor:'#161611',fontFamily:'InterRegular',fontSize:8,marginHorizontal:12,marginBottom:12}}
       /> */}
      <View style={styles.input}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={400}
        //scrollEnabled={true}
        style={styles.secondinput}
        onChangeText={(text)=>{
        setCharCount(text.length)
        return onChangeText(text)
      }}
        value={value}
        multiline={true}
        placeholder="Start typing here"
        placeholderTextColor={'black'}
        //tvParallaxShiftDistanceX={200}
      />
      <Text style={styles.count} onChangeText={(text) => {
        console.log(text)
        return text === 0 ? 'Char limit reached' : text
      }}>{400 -charCount}</Text>
      </View>
    </View>
    </KeyboardAwareScrollView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  count: {
    fontFamily:'InterRegular',
    fontSize:12,
    opacity:0.4,
    color:'black',
    paddingVertical:6,
    marginTop:12
   // paddingVertical:'',
  },
  secondinput:{
    fontFamily:'InterRegular',
    fontSize:20,
    opacity:0.8,
    color:'black',
   // padding:12

  },
  input:{
    minHeight:200,
    paddingHorizontal:20,
    paddingVertical:12,
    marginHorizontal:20,
    borderColor:'#D8D8D8',
    marginTop:10,
    opacity:0.9,
   //borderWidth:2,
    elevation:5,
    backgroundColor:'#F3F3F3',
    //opacity:0.9,
    borderRadius:16,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 28,
    fontFamily:'InterRegular',
    color:'white',
   // marginRight:0,
  // paddingHorizontal:24,
  //  paddingLeft:16,
  //  paddingTop:20,
    paddingBottom:12,
   // marginRight:34,
   paddingRight:2,
   // alignContent:'center',
   // justifyContent:'center',
    //display:'flex',
    //opacity:0.9

  },
  buttonrow:{
    flexDirection:'row',
    //justifyContent:''
  },
  container: {
    flex: 1,
    backgroundColor: '#101010',
   // paddingHorizontal:16
  },
  header:{
    marginTop:0,
    height:80,
    padding:12,
    backgroundColor: '#222222',
    flexDirection:'row',
    justifyContent:'space-between'
  }

})
